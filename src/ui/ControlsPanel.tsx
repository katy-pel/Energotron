import { SOURCES } from "../sim/sources";
import { useMemo } from "react";

type Props = {
state: any;
setTarget: (id:string, v:number)=>void;
togglePumpMode: ()=>void;
};

export default function ControlsPanel({ state, setTarget, togglePumpMode }: Props) {
const statics = useMemo(() => SOURCES, []);
return (
<div>
<h3>Dispečink zdrojů</h3>
{statics.map(s => (
<div key={s.id} className="row">
<div style={{width:160}}>
<div>{s.name}</div>
<div className="label">{s.type}</div>
</div>
<input
className="slider"
type="range"
min={s.type==="pumped" ? -Math.abs(s.pMax) : s.pMin}
max={s.pMax}
step={10}
value={state.sources[s.id].targetMW}
onChange={e => setTarget(s.id, Number(e.target.value))}
/>
<div style={{width:120, textAlign:"right"}}>
{state.sources[s.id].actualMW.toFixed(0)} MW
</div>
</div>
))}
<div className="row">
<button onClick={togglePumpMode}>Dlouhé Stráně: čerpání/výroba</button>
<div className="label">
SOC: {Math.round((state.sources["dlouhe-strane"]?.soc ?? 0)*100)}%
</div>
</div>
</div>
);
}
