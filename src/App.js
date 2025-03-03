// src/App.js
import React, { useState, useEffect } from 'react';
import DoublePendulumScene from './DoublePendulumScene';
import ParameterForm from './ParameterForm';
import SimulationChart from './SimulationChart';
import './App.css';

function App() {
  const initialParameters = {
    L1: 2,
    L2: 2,
    m1: 1,
    m2: 1,
    damping: 0.1,
    theta1: Math.PI / 4,
    theta2: Math.PI / 3,
    simulationSpeed: 1,
  };

  // Aktuelle Parameter und Simulationszustände
  const [parameters, setParameters] = useState(initialParameters);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  // Zustand für den laufenden Simulationsverlauf
  const [simulationData, setSimulationData] = useState({
    time: [],
    theta1: [],
    theta2: [],
    energy: [],
  });
  const [time, setTime] = useState(0);

  // Zustand für zuvor gespeicherte Simulationen (Liste)
  const [simulationRuns, setSimulationRuns] = useState([]);

  useEffect(() => {
    console.log("Aktuelle simulationData:", simulationData);
  }, [simulationData]);
  const handleUpdateData = ({ theta1, theta2, omega1, omega2 }) => {
    const dt = 0.2; 
    const newTime = time + dt;
    setTime(newTime);
    // Berechne Gesamtenergie (vereinfachte Formel)
    const computeEnergy = ({ L1, L2, m1, m2, g = 9.81, theta1, theta2, omega1, omega2 }) => {
      const T1 = 0.5 * m1 * Math.pow(L1 * omega1, 2);
      const T2 = 0.5 * m2 * ( Math.pow(L1 * omega1, 2) + Math.pow(L2 * omega2, 2) + 2 * L1 * L2 * omega1 * omega2 * Math.cos(theta1 - theta2) );
      const V = - (m1 + m2) * g * L1 * Math.cos(theta1) - m2 * g * L2 * Math.cos(theta2);
      return T1 + T2 + V;
    };
    const energy = computeEnergy({
      L1: parameters.L1,
      L2: parameters.L2,
      m1: parameters.m1,
      m2: parameters.m2,
      theta1,
      theta2,
      omega1,
      omega2,
    });

    setSimulationData(prevData => ({
      time: [...prevData.time, newTime],
      theta1: [...prevData.theta1, theta1],
      theta2: [...prevData.theta2, theta2],
      energy: [...prevData.energy, energy],
    }));
  };

  const togglePause = () => {
    setPaused(prev => !prev);
  };

  const resetSimulation = () => {
    setSimulationRuns(prevRuns => [...prevRuns, simulationData]);
    setSimulationData({ time: [], theta1: [], theta2: [], energy: [] });
    setTime(0);
    setResetKey(prev => prev + 1);
    setPaused(false);
  };

  // Diagrammdaten für die aktuellen Winkel
  const chartDataAngles = {
    labels: simulationData.time.map(t => t.toFixed(1)),
    datasets: [
      {
        label: 'Winkel θ1 (aktuell)',
        data: simulationData.theta1,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4,
      },
      {
        label: 'Winkel θ2 (aktuell)',
        data: simulationData.theta2,
        borderColor: 'rgba(255,99,132,1)',
        backgroundColor: 'rgba(255,99,132,0.2)',
        tension: 0.4,
      },
    ],
  };

  // Diagrammdaten für die aktuelle Energie
  const chartDataEnergy = {
    labels: simulationData.time.map(t => t.toFixed(1)),
    datasets: [
      {
        label: 'Gesamtenergie (aktuell)',
        data: simulationData.energy,
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="App">
      <h1>3D Doppelpendel Simulation</h1>
      <div className="simulation-container">
        <DoublePendulumScene 
          key={resetKey} 
          parameters={parameters} 
          paused={paused} 
          onUpdateData={handleUpdateData} 
        />
      </div>
      <div className="form-container">
        <ParameterForm parameters={parameters} onChange={setParameters} />
      </div>
      <div className="controls">
        <button onClick={togglePause}>
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={resetSimulation}>Reset & Save Run</button>
      </div>
      <div className="chart-container">
        <h2>Aktueller Winkelverlauf</h2>
        <SimulationChart data={chartDataAngles} />
      </div>
      <div className="chart-container">
        <h2>Aktueller Energieverlauf</h2>
        <SimulationChart data={chartDataEnergy} />
      </div>
      <div className="runs-container">
        <h2>Vorherige Simulationen</h2>
        {simulationRuns.length === 0 ? (
          <p>Keine vorherigen Simulationen vorhanden.</p>
        ) : (
          simulationRuns.map((run, index) => (
            <div key={index} className="run">
              <p><strong>Simulation {index + 1}</strong> - {run.time.length} Datenpunkte</p>
              <p>
                Letzter Wert: θ1: {run.theta1[run.theta1.length - 1]?.toFixed(2)} rad, 
                θ2: {run.theta2[run.theta2.length - 1]?.toFixed(2)} rad, 
                Energie: {run.energy[run.energy.length - 1]?.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
















