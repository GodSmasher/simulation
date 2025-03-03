// db.js
require('dotenv').config();
const mongoose = require('mongoose');
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://vogels671:SingleLife1!@simulation.fljvs.mongodb.net/simulationDB?retryWrites=true&w=majority';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB verbunden'))
.catch(err => console.error('MongoDB Verbindung fehlgeschlagen:', err));

module.exports = mongoose;
