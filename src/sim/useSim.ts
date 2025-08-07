import { create } from "zustand";
import { createInitial, step } from "./engine";
import type { GridState } from "./types";

type SimStore = {
state: GridState;
runtime: any;
setTarget: (id: string, v: number) => void;
togglePumpMode: () => void;
reset: () => void;
applyRecommendation: () => void;
};

const init = createInitial();

const useSim = create<SimStore>((set, get) => ({
state: init.state,
runtime: init.runtime,

setTarget: (id, v) => set(s => {
const st = { ...s.state, sources: { ...s.state.sources, [id]: { ...s.state.sources[id], targetMW: v } } };
return { state: st };
}),

togglePumpMode: () => set(s => {
const dyn = s.state.sources["dlouhe-strane"];
if (!dyn) return {};
const newTarget = dyn.targetMW >= 0 ? -400 : 400;
const st = { ...s.state, sources: { ...s.state.sources, ["dlouhe-strane"]: { ...dyn, targetMW: newTarget } } };
return { state: st };
}),

reset: () => {
const { state, runtime } = createInitial();
set({ state, runtime });
},

applyRecommendation: () => set(s => {
const st = { ...s.state, sources: { ...s.state.sources } };
const delta = st.totalGenMW - st.demandMW;

const change = (id:string, d:number)=>{ st.sources[id].targetMW += d; };

if (Math.abs(delta) < 150) return { state: st };

if (delta < 0) {
  // chybí výkon
  if (st.sources.voda) change("voda", Math.min(300, -delta));
  if (st.sources["plyn-ccgt"]) change("plyn-ccgt", Math.min(400, -delta));
  if (st.sources["uhli-sever"]) change("uhli-sever", Math.min(400, -delta));
  if (st.sources["dlouhe-strane"]?.targetMW < 0) st.sources["dlouhe-strane"].targetMW = 0;
} else {
  // přebytky
  if ((st.sources["dlouhe-strane"].soc ?? 0) < 0.98) {
    st.sources["dlouhe-strane"].targetMW = -Math.min(500, delta);
  } else {
    if (st.sources["uhli-sever"]) change("uhli-sever", -Math.min(400, delta));
    if (st.sources["uhli-morava"]) change("uhli-morava", -Math.min(300, delta));
    if (st.sources["plyn-ccgt"]) change("plyn-ccgt", -Math.min(400, delta));
  }
}
return { state: st };
})
}));

// hlavní smyčka
if (typeof window !== "undefined") {
setInterval(() => {
useSim.setState(s => ({ state: step(s.state, s.runtime) }));
}, 1000);
}

export default useSim;
