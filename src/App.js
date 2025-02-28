// src/App.js
import React, { useState } from 'react';
import DoublePendulumScene from './DoublePendulumScene';
import ParameterForm from './ParameterForm'; 

function App() {
  const [parameters, setParameters] = useState({
    L1: 2,
    L2: 2,
    theta1: 0,
    theta2: 0,
  });

  return (
    <div className="App">
      <h1>3D Doppelpendel Simulation</h1>
      <ParameterForm parameters={parameters} onChange={setParameters} />
      <DoublePendulumScene parameters={parameters} />
    </div>
  );
}

export default App;



