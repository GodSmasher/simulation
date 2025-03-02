// src/ParameterForm.jsx
import React from 'react';

export default function ParameterForm({ parameters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...parameters, [name]: parseFloat(value) });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Simulationsparameter</h2>
      <div>
        <label>
          Länge Stab 1 (L1):
          <input type="number" step="0.1" name="L1" value={parameters.L1} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Länge Stab 2 (L2):
          <input type="number" step="0.1" name="L2" value={parameters.L2} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Masse 1 (m1):
          <input type="number" step="0.1" name="m1" value={parameters.m1} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Masse 2 (m2):
          <input type="number" step="0.1" name="m2" value={parameters.m2} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Dämpfung:
          <input type="number" step="0.01" name="damping" value={parameters.damping} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Startwinkel 1 (θ1 in rad):
          <input type="number" step="0.1" name="theta1" value={parameters.theta1} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Startwinkel 2 (θ2 in rad):
          <input type="number" step="0.1" name="theta2" value={parameters.theta2} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Simulationsgeschwindigkeit:
          <input type="number" step="0.1" name="simulationSpeed" value={parameters.simulationSpeed} onChange={handleChange} />
        </label>
      </div>
    </div>
  );
}

