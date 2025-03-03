// server.js
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');

require('./db');
const SimulationResult = require('./models/SimulationResult');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.post('/api/simulations', async (req, res) => {
  try {
    const simulation = new SimulationResult(req.body);
    await simulation.save();
    res.status(201).json(simulation);
  } catch (error) {
    console.error('Fehler beim Speichern:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/simulations', async (req, res) => {
  try {
    const simulations = await SimulationResult.find().sort({ createdAt: -1 });
    res.json(simulations);
  } catch (error) {
    console.error('Fehler beim Abrufen der Simulationen:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
