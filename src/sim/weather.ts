export function nextWeather(t: number, prev: {irradiance:number; wind:number}) {
  const day = (t/3600) % 24;
  const sunBase = Math.max(0, Math.sin(((day-6)/12)*Math.PI)); // vrchol odpoledne
  const irr = clamp(lerp(prev.irradiance, sunBase, 0.05) + randn(0,0.02), 0, 1);
  const wind = clamp(lerp(prev.wind, 0.5 + Math.sin(t/1800)*0.2 + randn(0,0.05), 0.05), 0, 1);
  return { irradiance: irr, wind };
}
function lerp(a:number,b:number,t:number){ return a+(b-a)*t; }
function clamp(x:number,min:number,max:number){ return Math.max(min, Math.min(max, x)); }
function randn(mu=0,sigma=1){
  const u = Math.random(); const v = Math.random();
  return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)*sigma + mu;
}
