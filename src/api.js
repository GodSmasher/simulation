// src/api.js
export async function saveSimulation(simulationData) {
    try {
      const response = await fetch('http://localhost:5000/api/simulations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulationData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fehler beim Speichern der Simulation:', error);
      throw error;
    }
  }
  