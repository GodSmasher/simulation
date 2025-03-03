// src/SimulationRunsList.jsx
import React, { useState, useEffect } from 'react';
import SimulationChart from './SimulationChart';

export default function SimulationRunsList() {
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRun, setSelectedRun] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/simulations')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch simulation runs');
        return res.json();
      })
      .then((data) => {
        setRuns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading simulation runs...</p>;
  if (!runs || runs.length === 0)
    return <p>No simulation runs found. Run a simulation and save it.</p>;

  const handleSelectRun = (run) => {
    setSelectedRun(run);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h2>Previous Simulation Runs</h2>
      <ul>
        {runs.map((run) => (
          <li
            key={run._id}
            style={{ cursor: 'pointer', marginBottom: '5px' }}
            onClick={() => handleSelectRun(run)}
          >
            {new Date(run.createdAt).toLocaleString()} - θ1: {run.parameters.theta1.toFixed(2)} rad, θ2: {run.parameters.theta2.toFixed(2)} rad
          </li>
        ))}
      </ul>
      {selectedRun && selectedRun.resultData && selectedRun.resultData.time && selectedRun.resultData.time.length > 0 ? (
        <div>
          <h3>Details for Simulation from {new Date(selectedRun.createdAt).toLocaleString()}</h3>
          <SimulationChart
            data={{
              labels: selectedRun.resultData.time.map((t) => t.toFixed(1)),
              datasets: [
                {
                  label: 'θ1',
                  data: selectedRun.resultData.theta1,
                  borderColor: 'rgba(75,192,192,1)',
                  backgroundColor: 'rgba(75,192,192,0.2)',
                  tension: 0.4,
                },
                {
                  label: 'θ2',
                  data: selectedRun.resultData.theta2,
                  borderColor: 'rgba(255,99,132,1)',
                  backgroundColor: 'rgba(255,99,132,0.2)',
                  tension: 0.4,
                },
              ],
            }}
          />
        </div>
      ) : (
        selectedRun && <p>No detailed result data available for this simulation.</p>
      )}
    </div>
  );
}
