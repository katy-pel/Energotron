type Props = {
state: any;
setTarget: (id:string, v:number)=>void;
togglePumpMode: ()=>void;
tip: string;
};

export default function ChildMode({ state, setTarget, togglePumpMode, tip }: Props) {
const set = (id:string, v:number) => setTarget(id, v);

const soc = Math.round((state.sources["dlouhe-strane"]?.soc ?? 0) * 100);

return (
<div>
<h3>Jednoduché ovládání</h3>

  <div className="card">
    <div className="pill">Jádro</div>
    <p className="label">Temelín a Dukovany tvoří základ výroby. Drží stabilní výkon.</p>
    <div className="row">
      <span>Temelín</span>
      <input className="slider" type="range" min={700} max={2000} step={50}
        value={state.sources.temelin.targetMW}
        onChange={e=>set("temelin", Number(e.target.value))}/>
      <b>{state.sources.temelin.actualMW.toFixed(0)} MW</b>
    </div>
    <div className="row">
      <span>Dukovany</span>
      <input className="slider" type="range" min={600} max={1500} step={50}
        value={state.sources.dukovany.targetMW}
        onChange={e=>set("dukovany", Number(e.target.value))}/>
      <b>{state.sources.dukovany.actualMW.toFixed(0)} MW</b>
    </div>
  </div>

  <div className="card">
    <div className="pill">Vodní a přečerpávací</div>
    <p className="label">Voda reaguje rychle. Dlouhé Stráně mohou vyrábět nebo čerpat.</p>
    <div className="row">
      <span>Voda</span>
      <input className="slider" type="range" min={0} max={600} step={20}
        value={state.sources.voda.targetMW}
        onChange={e=>set("voda", Number(e.target.value))}/>
      <b>{state.sources.voda.actualMW.toFixed(0)} MW</b>
    </div>
    <div className="row">
      <button className="big-btn" onClick={togglePumpMode}>Dlouhé Stráně: čerpání/výroba</button>
      <span className="label">SOC: {soc}%</span>
      <b>{state.sources["dlouhe-strane"].actualMW.toFixed(0)} MW</b>
    </div>
  </div>

  <div className="card">
    <div className="pill">Fosilní</div>
    <p className="label">Uhlí a plyn vykrývají nedostatek, ale mají emise.</p>
    <div className="row">
      <span>Uhlí Sever</span>
      <input className="slider" type="range" min={300} max={1200} step={20}
        value={state.sources["uhli-sever"].targetMW}
        onChange={e=>set("uhli-sever", Number(e.target.value))}/>
      <b>{state.sources["uhli-sever"].actualMW.toFixed(0)} MW</b>
    </div>
    <div className="row">
      <span>Uhlí Morava</span>
      <input className="slider" type="range" min={200} max={900} step={20}
        value={state.sources["uhli-morava"].targetMW}
        onChange={e=>set("uhli-morava", Number(e.target.value))}/>
      <b>{state.sources["uhli-morava"].actualMW.toFixed(0)} MW</b>
    </div>
    <div className="row">
      <span>Plyn CCGT</span>
      <input className="slider" type="range" min={0} max={700} step={20}
        value={state.sources["plyn-ccgt"].targetMW}
        onChange={e=>set("plyn-ccgt", Number(e.target.value))}/>
      <b>{state.sources["plyn-ccgt"].actualMW.toFixed(0)} MW</b>
    </div>
  </div>

  <div className="card">
    <div className="pill">Slunce a vítr</div>
    <p className="label">Výkon závisí na počasí. Bez paliva a bez emisí.</p>
    <div className="row"><span>FVE</span><b>{state.sources.fve.actualMW.toFixed(0)} MW</b></div>
    <div className="row"><span>VTE</span><b>{state.sources.vte.actualMW.toFixed(0)} MW</b></div>
  </div>

  <div className="helper">{tip}</div>
</div>
);
}

