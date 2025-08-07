export type SimEvent = { t:number; text:string; severity:"info"|"warn"|"fail"; id?:string; until?:number; };

export function maybeEvent(t:number) : SimEvent | null {
// nižší pravděpodobnost náhodné události
if (Math.random() < 0.0007) {
const r = Math.random();
if (r < 0.33) return { t, text:"Výpadek: Uhlí Sever mimo provoz 10 min", severity:"warn", id:"uhli-sever", until: t+600 };
if (r < 0.66) return { t, text:"Rychlá změna větru: propad výkonu VTE", severity:"info", id:"vte", until: t+300 };
return { t, text:"Porucha čerpadla: Dlouhé Stráně nemohou čerpat 5 min", severity:"warn", id:"dlouhe-strane", until: t+300 };
}
return null;
}
