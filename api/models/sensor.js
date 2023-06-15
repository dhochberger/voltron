const mongoose = require('../database');

const HumiditySchema = mongoose.Schema({
    value: {type: Number, required: true}
}, {timestamps: true});

HumiditySchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Humidity = mongoose.model("Humidity", HumiditySchema);

const LuminositySchema = mongoose.Schema({
  value: {type: Number, required: true}
}, {timestamps: true});

LuminositySchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Luminosity = mongoose.model("Luminosity", LuminositySchema);

const TemperatureSchema = mongoose.Schema({
    valueC: {type: Number, required: true},
    valueF: {type: Number, required: true}
}, {timestamps: true});

TemperatureSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

const Temperature = mongoose.model("Temperature", TemperatureSchema);

module.exports = { Humidity, Luminosity, Temperature}