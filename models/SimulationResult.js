// models/SimulationResult.js
const mongoose = require('mongoose');

const SimulationResultSchema = new mongoose.Schema({
  parameters: {
    L1: Number,
    L2: Number,
    m1: Number,
    m2: Number,
    damping: Number,
    theta1: Number,
    theta2: Number,
    simulationSpeed: Number,
  },
  resultData: {
    type: Array, 
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SimulationResult', SimulationResultSchema);
