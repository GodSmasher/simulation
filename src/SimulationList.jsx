// src/SimulationList.jsx
import React, { useEffect, useState } from 'react';

export default function SimulationList() {
  const [simulations, setSimulations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/simulations')
      .then(res => {
        if (!res.ok) throw new Error('Fehler beim Abrufen der Daten');
        return res.json();
      })
      .then(data => {
        setSimulations(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Lade Simulationen...</p>;
  if (error) return <p>Fehler: {error}</p>;

  return (
    <div>
      <h2>Gespeicherte Simulationen</h2>
      <ul>
        {simulations.map(sim => (
          <li key={sim._id}>
            <strong>Erstellt am:</strong> {new Date(sim.createdAt).toLocaleString()}
            <br />
            <strong>Parameter:</strong> L1: {sim.parameters.L1}, L2: {sim.parameters.L2}, θ1: {sim.parameters.theta1.toFixed(2)}, θ2: {sim.parameters.theta2.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
