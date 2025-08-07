import { PUMPED_CAP_MWH, PUMP_ROUNDTRIP } from "./constants";

export function pumpedStep(targetMW: number, actualMW: number, soc: number) {
let newActual = targetMW;
let newSoc = soc;
const dtH = 1/3600;

if (targetMW >= 0) {
// výdej (výroba)
const energy = targetMW * dtH;
const cap = soc * PUMPED_CAP_MWH;
const used = Math.min(energy, cap);
newActual = used / dtH;
newSoc = Math.max(0, soc - used / PUMPED_CAP_MWH);
} else {
// čerpání (záporný příkon), uložení se ztrátou účinnosti
const energyIn = -targetMW * dtH;
const storable = (1 - soc) * PUMPED_CAP_MWH;
const stored = Math.min(energyIn * PUMP_ROUNDTRIP, storable);
newActual = -(stored / PUMP_ROUNDTRIP) / dtH;
newSoc = Math.min(1, soc + stored / PUMPED_CAP_MWH);
}
return { actual: newActual, soc: newSoc };
}
