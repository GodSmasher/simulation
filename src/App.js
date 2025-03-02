// src/App.js
import React, { useState } from 'react';
import DoublePendulumScene from './DoublePendulumScene';
import ParameterForm from './ParameterForm';
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

  const [parameters, setParameters] = useState(initialParameters);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const togglePause = () => {
    setPaused(prev => !prev);
  };

  const resetSimulation = () => {
    // Setze die Parameter zurück und erzwinge ein Neu-Mounten der Szene.
    setParameters(initialParameters);
    setResetKey(prev => prev + 1);
    setPaused(false);
  };

  return (
    <div className="App">
      <h1>3D Doppelpendel Simulation</h1>
      <div className="simulation-container">
        <DoublePendulumScene key={resetKey} parameters={parameters} paused={paused} />
      </div>
      <div className="form-container">
        <ParameterForm parameters={parameters} onChange={setParameters} />
      </div>
      <div className="controls">
        <button onClick={togglePause}>
          {paused ? 'Resume' : 'Pause'}
        </button>
        <button onClick={resetSimulation}>
          Reset
        </button>
      </div>
      <div className="angle-display">
        <h2>Aktuelle Parameter</h2>
        <p>L1: {parameters.L1}</p>
        <p>L2: {parameters.L2}</p>
        <p>m1: {parameters.m1}</p>
        <p>m2: {parameters.m2}</p>
        <p>Dämpfung: {parameters.damping}</p>
        <p>θ1: {parameters.theta1.toFixed(2)} rad</p>
        <p>θ2: {parameters.theta2.toFixed(2)} rad</p>
        <p>Simulationsgeschwindigkeit: {parameters.simulationSpeed}</p>
      </div>
    </div>
  );
}

export default App;








