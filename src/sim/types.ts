export type SourceType = "nuclear"|"coal"|"gas"|"hydro"|"pumped"|"solar"|"wind";

export type SourceStatic = {
id: string; name: string; type: SourceType;
pMin: number; pMax: number; ramp: number; // frakce pMax za minutu
co2: number; fuelCost: number; // náklady a emise na MWh
efficiency?: number; // pro přečerpávačku
};

export type SourceDyn = {
targetMW: number; actualMW: number; online: boolean;
soc?: number; // stav nabití u přečerpávačky (0..1)
pumping?: boolean;
};

export type GridState = {
t: number;
demandMW: number;
weather: { irradiance: number; wind: number; };
sources: Record<string, SourceDyn>;
totalGenMW: number;
score: { stability: number; cost: number; emissions: number; };
events: { t: number; text: string; severity: "info"|"warn"|"fail"; }[];
history: {
t: number; demand: number; gen: number; delta: number;
nuclear: number; coal: number; gas: number; hydro: number;
pumped: number; solar: number; wind: number;
}[];
};

