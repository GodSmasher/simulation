// src/App.js
import React, { useState } from 'react';
import DoublePendulumScene from './DoublePendulumScene';
import ParameterForm from './ParameterForm'; // Falls vorhanden
import './App.css';

function App() {
  const [parameters, setParameters] = useState({
    L1: 2,
    L2: 2,
    theta1: Math.PI / 4,
    theta2: Math.PI / 3,
  });

  return (
    <div className="App">
      <h1>3D Doppelpendel Simulation</h1>
      <div className="simulation-container">
        <DoublePendulumScene parameters={parameters} />
      </div>
      <div className="form-container">
        <ParameterForm parameters={parameters} onChange={setParameters} />
      </div>
    </div>
  );
}

export default App;





