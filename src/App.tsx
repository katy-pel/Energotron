import ControlsPanel from "./ui/ControlsPanel";
import Charts from "./ui/Charts";
import Score from "./ui/Score";
import EventsFeed from "./ui/EventsFeed";
import useSim from "./sim/useSim";
import ChildMode from "./ui/ChildMode";
import { useState, useMemo } from "react";

export default function App() {
  const { state, setTarget, togglePumpMode, reset, applyRecommendation } = useSim();
  const [childMode, setChildMode] = useState(true);
  const delta = state.totalGenMW - state.demandMW;
  const freqOk = Math.abs(delta) < 100;

  const tip = useMemo(() => {
    if (state.weather.irradiance < 0.2 && state.weather.wind < 0.2) return "Málo slunce i větru – přidej vodu/plyn.";
    if (state.weather.irradiance > 0.7) return "Hodně slunce – uber fosilní zdroje, dobíjej přečerpávačku.";
    if (state.weather.wind > 0.7) return "Hodně větru – uber fosilní zdroje, zvaž čerpání.";
    if (Math.abs(delta) > 500) return delta < 0 ? "Chybí výkon – přidej plyn/vodu nebo uber čerpání." : "Přebytky – sniž fosilní zdroje nebo čerpej.";
    return "Držíš dobrou rovnováhu – sleduj Δ a zásobu přečerpávačky.";
  }, [state.weather, delta]);

  return (
    <div className={"app" + (childMode ? " child" : "")}>
      <div className="header">
        <div className="panel" style={{flex:1}}>
          <h2>Energomanager ČR</h2>
          <div className="kpi">
            <div className="item">Spotřeba: {state.demandMW.toFixed(0)} MW</div>
            <div className="item">Výroba: {state.totalGenMW.toFixed(0)} MW</div>
            <div className="item">Δ: <span className={freqOk ? "ok" : "warn"}>{delta.toFixed(0)} MW</span></div>
            <div className="item">Počasí: slunce {(state.weather.irradiance*100).toFixed(0)}% | vítr {(state.weather.wind*100).toFixed(0)}%</div>
            <div className="item"><label><input type="checkbox" checked={childMode} onChange={e=>setChildMode(e.target.checked)} /> Dětský režim</label></div>
          </div>
        </div>
        <div className="panel">
          <button onClick={reset}>Restart</button>
          <div style={{ marginTop: 8 }}>
            <button onClick={applyRecommendation} className="big-btn">Asistent: vyrovnat Δ</button>
          </div>
        </div>
      </div>

      <div className="panel">
        {childMode
          ? <ChildMode state={state} setTarget={setTarget} togglePumpMode={togglePumpMode} tip={tip} />
          : <ControlsPanel state={state} setTarget={setTarget} togglePumpMode={togglePumpMode} />
        }
      </div>

      <div className="panel">
        <Charts history={state.history}/>
      </div>

      <div className="panel">
        <Score score={state.score} />
        <EventsFeed events={state.events}/>
      </div>
    </div>
  );
}
