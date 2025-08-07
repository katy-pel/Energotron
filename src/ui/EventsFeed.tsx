type E = { t:number; text:string; severity:"info"|"warn"|"fail"; };
export default function EventsFeed({ events }: { events: E[] }) {
return (
<div>
<h3>Události</h3>
{events.length === 0 && <div className="label">Žádné události</div>}
<ul>
{events.map((e,i)=>(
<li key={i}>[{(e.t/60).toFixed(1)} min] {e.text}</li>
))}
</ul>
</div>
);
}
