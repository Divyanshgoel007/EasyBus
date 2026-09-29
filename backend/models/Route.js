const mongoose = require('mongoose');

const stopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true }
});

const routeSchema = new mongoose.Schema({
  routeId: { type: String, required: true, unique: true },
  routeNumber: { type: String, required: true },
  routeName: { type: String, required: true },
  startingPoint: { type: String, required: true },
  endingPoint: { type: String, required: true },
  totalStops: { type: Number, required: true },
  stops: [stopSchema]
});

module.exports = mongoose.model('Route', routeSchema);
