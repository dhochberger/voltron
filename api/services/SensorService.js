const { Humidity, Luminosity, Temperature } = require('../models/sensor');
const moment = require('moment');

class SensorService {

    static async getAllSensors() {
        try {
            const humidity = await Humidity.find().select(['-_id','-__v','-updatedAt']);
            let sortedHumidity = humidity.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())

            const luminosity = await Luminosity.find().select(['-_id','-__v','-updatedAt']);
            let sortedLuminosity = luminosity.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())

            const temperature = await Temperature.find().select(['-_id','-__v','-updatedAt']);
            let sortedtemperature = temperature.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())

            return {humidity: sortedHumidity, luminosity: sortedLuminosity, temperature: sortedtemperature}
        } catch (error) {
            throw error;
        }
    }

    static async getAllSensorsByDate(start, end) {
        try {
            const humidity = await Humidity.find({ createdAt: { $gte: start, $lte:  end} }).select(['-_id','-__v','-updatedAt'])
            let sortedHumidity = humidity.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())

            const luminosity = await Luminosity.find({ createdAt: { $gte: start, $lte:  end} }).select(['-_id','-__v','-updatedAt'])
            let sortedLuminosity = luminosity.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())

            const temperature = await Temperature.find({ createdAt: { $gte: start, $lte:  end} }).select(['-_id','-__v','-updatedAt'])
            let sortedtemperature = temperature.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())

            return {humidity: sortedHumidity, luminosity: sortedLuminosity, temperature: sortedtemperature}
        } catch (error) {
            throw error;
        }
    }

    static async getAllHumidity() {
        try {
            const humidity = await Humidity.find().select(['-_id','-__v','-updatedAt']);
            let sortedHumidity = humidity.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
            return sortedHumidity
        } catch (error) {
            throw error;
        }
    }

    static async getHumidityByDate(start, end) {
        try {
            const humidity = await Humidity.find({ createdAt: { $gte: start, $lte:  end} }).select(['-_id','-__v','-updatedAt'])
            let sortedHumidity = humidity.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
            return sortedHumidity
        } catch (error) {
            throw error;
        }
    }

    static async addHumidity(humidity) {
        try {
            return await Humidity.create(humidity);
        } catch (error) {
            throw error;
        }
    }

    static async deleteHumidityByDate(start, end) {
        
        try {
            return await Humidity.deleteMany({ createdAt: { $gte: start, $lte:  end} });
        } catch (error) {
            throw error;
        }
    }

    static async getAllLuminosity() {
        try {
            const luminosity = await Luminosity.find().select(['-_id','-__v','-updatedAt']);
            let sortedluminosity = luminosity.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
            return sortedluminosity
        } catch (error) {
            throw error;
        }
    }

    static async getLuminosityByDate(start, end) {
        try {
            const luminosity = await Luminosity.find({ createdAt: { $gte: start, $lte:  end} }).select(['-_id','-__v','-updatedAt'])
            let sortedluminosity = luminosity.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
            return sortedluminosity
        } catch (error) {
            throw error;
        }
    }

    static async addLuminosity(luminosity) {
        try {
            return await Luminosity.create(luminosity);
        } catch (error) {
            throw error;
        }
    }

    static async deleteLuminosityByDate(start, end) {
        try {
            return await Luminosity.deleteMany({ createdAt: { $gte: start, $lte:  end} });
        } catch (error) {
            throw error;
        }
    }

    static async getAllTemperature() {
        try {
            const temperature = await Temperature.find().select(['-_id','-__v','-updatedAt']);
            let sortedtemperature = temperature.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
            return sortedtemperature
        } catch (error) {
            throw error;
        }
    }

    static async getTemperatureByDate(start, end) {
        try {
            const temperature = await Temperature.find({ createdAt: { $gte: start, $lte:  end} }).select(['-_id','-__v','-updatedAt'])
            let sortedtemperature = temperature.sort((a, b) => a.createdAt.valueOf() - b.createdAt.valueOf())
            return sortedtemperature
        } catch (error) {
            throw error;
        }
    }

    static async addTemperature(temperature) {
        try {
            return await Temperature.create(temperature);
        } catch (error) {
            throw error;
        }
    }

    static async deleteTemperatureByDate(start, end) {
        try {
            return await Temperature.deleteMany({ createdAt: { $gte: start, $lte:  end} });
        } catch (error) {
            throw error;
        }
    }

    static async generateRandomDatas() {
        try {
            var startdate = moment();
            for (let i = 0; i<365; i++){
                startdate = moment();
                startdate = startdate.subtract(1, "year")
                startdate.add(i, "day")
                let h = -4
                for (let j = 0; j < 6; j++){
                    startdate.add(j*2, "hours")
                    await Luminosity.create({value: Math.random() * (1023 - 0 +1) + 0, createdAt: startdate})
                    await Humidity.create({value: Math.floor(Math.random() * (85 - 10 +1)) + 10, createdAt: startdate})
                    let random_temperature = Math.floor(Math.random() * (45 - -10 +1)) + -10
                    await Temperature.create({valueC: random_temperature, valueF: random_temperature*9/5+32, createdAt: startdate})
                }
            }
            return 'ok'
        } catch (error) {
            throw error;
        }
    }
}

module.exports = SensorService;
