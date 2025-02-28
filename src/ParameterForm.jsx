// src/ParameterForm.jsx
import React from 'react';

export default function ParameterForm({ parameters, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...parameters, [name]: parseFloat(value) });
  };

  return (
    <div style={{ padding: '1rem', background: '#f0f0f0' }}>
      <h2>Simulationsparameter</h2>
      <div>
        <label>
          Länge Stab 1 (L1):
          <input
            type="number"
            step="0.1"
            name="L1"
            value={parameters.L1}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Länge Stab 2 (L2):
          <input
            type="number"
            step="0.1"
            name="L2"
            value={parameters.L2}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Startwinkel 1 (θ1):
          <input
            type="number"
            step="0.1"
            name="theta1"
            value={parameters.theta1}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Startwinkel 2 (θ2):
          <input
            type="number"
            step="0.1"
            name="theta2"
            value={parameters.theta2}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
}
