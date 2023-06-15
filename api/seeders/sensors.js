const { Humidity, Luminosity, Temperature } = require('../models/sensor');
var mongoose = require('mongoose');

async function sensorsSeeder() {
    for (let i = 0; i<50; i++){
        await Luminosity.create({value: Math.random() * (100000 - 0 +1) + 0})
        await Humidity.create({value: Math.floor(Math.random() * (85 - 10 +1)) + 10})
        let random_temperature = Math.floor(Math.random() * (45 - -10 +1)) + -10
        await Temperature.create({valueC: random_temperature, valueF: random_temperature*9/5+32})
    }
}

exports.sensorsSeeder = sensorsSeeder()