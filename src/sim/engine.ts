import { DT_SECONDS } from "./constants";
import { SOURCES } from "./sources";
import { nextWeather } from "./weather";
import { demandAt } from "./demand";
import { pumpedStep } from "./storage";
import type { GridState, SourceDyn, SourceStatic } from "./types";
import { maybeEvent } from "./events";

type Runtime = {
statics: Record<string, SourceStatic>;
outages: Record<string, number>; // id -> čas, do kdy výpadek trvá
};

export function createInitial(): { state: GridState; runtime: Runtime } {
const statics: Record<string, SourceStatic> = {};
SOURCES.forEach(s => statics[s.id] = s);

const sources: Record<string, SourceDyn> = {};
SOURCES.forEach(s => {
const base = s.type==="nuclear" ? Math.max(s.pMin, 0.9*s.pMax) : 0;
sources[s.id] = {
targetMW: base,
actualMW: base,
online: true,
soc: s.type==="pumped" ? 0.6 : undefined,
pumping: s.type==="pumped" ? false : undefined,
};
});

const state: GridState = {
t: 0,
demandMW: demandAt(0),
weather: { irradiance: 0.2, wind: 0.4 },
sources,
totalGenMW: 0,
score: { stability: 0, cost: 0, emissions: 0 },
events: [],
history: [],
};

const runtime: Runtime = { statics, outages: {} };
return { state: postCompute(state, statics), runtime };
}

export function step(prev: GridState, rt: Runtime): GridState {
let state = { ...prev };
state.t += DT_SECONDS;

// Události
const ev = maybeEvent(state.t);
if (ev) {
state.events = [ev, ...state.events].slice(0, 20);
if (ev.id && ev.until) rt.outages[ev.id] = ev.until;
}
// Uklidit vypršené výpadky
for (const id in rt.outages) {
if (rt.outages[id] <= state.t) delete rt.outages[id];
}

// Počasí + poptávka
state.weather = nextWeather(state.t, state.weather);
state.demandMW = demandAt(state.t);

// Dostupnost podle počasí a výpadků
const avail: Record<string, number> = {};
for (const s of Object.values(rt.statics)) {
if (s.type === "solar") avail[s.id] = s.pMax * state.weather.irradiance;
else if (s.type === "wind") avail[s.id] = s.pMax * state.weather.wind;
else avail[s.id] = s.pMax;
if (rt.outages[s.id]) avail[s.id] = 0; // při výpadku
}

const dtMin = DT_SECONDS / 60;

for (const s of Object.values(rt.statics)) {
const dyn = state.sources[s.id];
let target = dyn.targetMW;

let pMin = s.pMin;
let pMax = avail[s.id];

if (s.type === "solar" || s.type === "wind") pMin = 0;

if (s.type === "pumped") {
  // povolit i záporný výkon (čerpání)
  pMin = -Math.abs(s.pMin);
  pMax = Math.abs(s.pMax);
  if (rt.outages[s.id]) target = Math.max(0, target); // při poruše nečerpat
}

target = Math.min(pMax, Math.max(pMin, target));

if (s.type === "pumped") {
  const res = pumpedStep(target, dyn.actualMW, dyn.soc ?? 0);
  dyn.actualMW = res.actual;
  dyn.soc = res.soc;
} else if (s.type === "solar" || s.type === "wind") {
  // OZE: okamžitě na target v rámci dostupnosti
  dyn.actualMW = target;
} else {
  // klasické zdroje: ramp-rate
  const maxDelta = s.ramp * s.pMax * dtMin;
  const desired = clamp(target, pMin, pMax);
  const delta = clamp(desired - dyn.actualMW, -maxDelta, maxDelta);
  dyn.actualMW += delta;
}
}

// Součty + náklady + emise
let total = 0, cost = 0, co2 = 0;
for (const s of Object.values(rt.statics)) {
const dyn = state.sources[s.id];
const mw = Math.max(0, dyn.actualMW); // jen kladná výroba
total += mw;
const mwh = mw * (DT_SECONDS/3600);
cost += mwh * s.fuelCost;
co2 += mwh * s.co2;
}
state.totalGenMW = total;

const delta = state.totalGenMW - state.demandMW;
const penalty = Math.abs(delta) * (DT_SECONDS/60); // jednoduchý proxy ukazatel nestability
state.score = {
stability: state.score.stability + penalty,
cost: state.score.cost + cost,
emissions: state.score.emissions + co2,
};

// Historie pro graf
state.history = [
...state.history.slice(-600), // ~posledních 10 minut
{
t: state.t,
demand: state.demandMW,
gen: state.totalGenMW,
delta,
nuclear: sumTypes(state, rt, ["nuclear"]),
coal: sumTypes(state, rt, ["coal"]),
gas: sumTypes(state, rt, ["gas"]),
hydro: sumTypes(state, rt, ["hydro"]),
pumped: get(state, "dlouhe-strane"),
solar: get(state, "fve"),
wind: get(state, "vte"),
}
];

return state;
}

function postCompute(state: GridState, statics: Record<string, any>): GridState {
let total = 0;
for (const s of Object.values(statics)) {
const mw = Math.max(0, state.sources[s.id].actualMW);
total += mw;
}
return { ...state, totalGenMW: total };
}

function sumTypes(state: GridState, rt: any, types: string[]) {
let sum = 0;
for (const s of Object.values(rt.statics)) {
if (types.includes(s.type)) sum += Math.max(0, state.sources[s.id].actualMW);
}
return sum;
}

function get(state: GridState, id: string) {
return Math.max(0, state.sources[id]?.actualMW ?? 0);
}

function clamp(x:number,min:number,max:number){ return Math.max(min, Math.min(max, x)); }

