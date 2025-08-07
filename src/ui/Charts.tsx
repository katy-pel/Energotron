import { LineChart, Line, YAxis, XAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Point = { t:number; demand:number; gen:number; delta:number;
nuclear:number; coal:number; gas:number; hydro:number; pumped:number; solar:number; wind:number; };

export default function Charts({ history }: { history: Point[] }) {
const data = history.map(h => ({
time: h.t,
Spotreba: Math.round(h.demand),
Vyroba: Math.round(h.gen),
Delta: Math.round(h.delta),
Jadro: Math.round(h.nuclear),
Uhli: Math.round(h.coal),
Plyn: Math.round(h.gas),
Voda: Math.round(h.hydro),
Precerp: Math.round(h.pumped),
FVE: Math.round(h.solar),
Vitr: Math.round(h.wind),
}));
return (
<div>
<h3>Vývoj v čase</h3>
<ResponsiveContainer width="100%" height={400}>
<LineChart data={data}>
<XAxis dataKey="time" tickFormatter={(t)=> (t/60).toFixed(0)+" min"} />
<YAxis />
<Tooltip />
<Legend />
<Line type="monotone" dataKey="Spotreba" stroke="#f59e0b" dot={false} />
<Line type="monotone" dataKey="Vyroba" stroke="#22c55e" dot={false} />
<Line type="monotone" dataKey="Delta" stroke="#ef4444" dot={false} />
<Line type="monotone" dataKey="Jadro" stroke="#a78bfa" dot={false} />
<Line type="monotone" dataKey="Uhli" stroke="#f97316" dot={false} />
<Line type="monotone" dataKey="Plyn" stroke="#38bdf8" dot={false} />
<Line type="monotone" dataKey="Voda" stroke="#22d3ee" dot={false} />
<Line type="monotone" dataKey="Precerp" stroke="#14b8a6" dot={false} />
<Line type="monotone" dataKey="FVE" stroke="#fde047" dot={false} />
<Line type="monotone" dataKey="Vitr" stroke="#60a5fa" dot={false} />
</LineChart>
</ResponsiveContainer>
</div>
);
}
