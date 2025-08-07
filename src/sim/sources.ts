import type { SourceStatic } from "./types";

export const SOURCES: SourceStatic[] = [
// Jádro (agregace Temelín + Dukovany do dvou jednotek)
{ id:"temelin", name:"Temelín", type:"nuclear", pMin:700, pMax:2000, ramp:0.02, co2:0, fuelCost:6 },
{ id:"dukovany", name:"Dukovany", type:"nuclear", pMin:600, pMax:1500, ramp:0.02, co2:0, fuelCost:6 },

// Uhlí (agregovaně)
{ id:"uhli-sever", name:"Uhlí Sever", type:"coal", pMin:300, pMax:1200, ramp:0.05, co2:0.9, fuelCost:40 },
{ id:"uhli-morava", name:"Uhlí Morava", type:"coal", pMin:200, pMax:900, ramp:0.05, co2:0.9, fuelCost:40 },

// Plyn (např. CCGT)
{ id:"plyn-ccgt", name:"Plyn CCGT", type:"gas", pMin:0, pMax:700, ramp:0.2, co2:0.4, fuelCost:70 },

// Voda (akumulačky/průtočné)
{ id:"voda", name:"Voda", type:"hydro", pMin:0, pMax:600, ramp:1.0, co2:0, fuelCost:2 },

// Přečerpávací elektrárna Dlouhé Stráně
{ id:"dlouhe-strane", name:"Dlouhé Stráně", type:"pumped", pMin:-650, pMax:650, ramp:1.0, co2:0, fuelCost:2, efficiency:0.8 },

// OZE agregovaně
{ id:"fve", name:"Fotovoltaika", type:"solar", pMin:0, pMax:2500, ramp:1.0, co2:0, fuelCost:0 },
{ id:"vte", name:"Větrné elektrárny", type:"wind", pMin:0, pMax:1500, ramp:1.0, co2:0, fuelCost:0 }
];

