export function demandAt(t: number) {
const hour = (t/3600 + 8) % 24;
const base = 9000 + 3500*Math.sin((hour-7)/12 * Math.PI);
const evening = 1800 * Math.max(0, Math.sin((hour-17)/3 * Math.PI));
const noise = (Math.random()-0.5)*400;
return Math.max(6000, base + evening + noise);
}
