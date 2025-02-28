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
  
  const [currentTheta1, setCurrentTheta1] = useState(0);
  const handleAngleUpdate = (newTheta1) => {
    setCurrentTheta1(newTheta1);
    setParameters(prev => ({ ...prev, theta1: newTheta1 }));
  };

  return (
    <div className="App">
      <h1>3D Doppelpendel Simulation</h1>
      <ParameterForm parameters={parameters} onChange={setParameters} />
      <DoublePendulumScene parameters={parameters} onAngleUpdate={handleAngleUpdate} />
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        padding: '10px',
        background: 'rgba(0,0,0,0.5)',
        color: 'white',
        borderRadius: '5px'
      }}>
        <h2>Aktuelle Winkel</h2>
        <p>θ1: {currentTheta1.toFixed(2)} rad</p>
        <p>θ2: {parameters.theta2.toFixed(2)} rad</p>
      </div>
    </div>
  );
}

export default App;




