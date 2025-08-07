type Score = { stability:number; cost:number; emissions:number; };
export default function Score({ score }: { score: Score }) {
return (
<div>
<h3>Skóre</h3>
<div className="row"><span className="label">Stabilita (nižší lepší):</span> <b>{score.stability.toFixed(0)}</b></div>
<div className="row"><span className="label">Náklady [€]:</span> <b>{score.cost.toFixed(0)}</b></div>
<div className="row"><span className="label">Emise [t CO₂]:</span> <b>{score.emissions.toFixed(2)}</b></div>
</div>
);
}
