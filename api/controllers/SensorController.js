const SensorService = require('../services/SensorService');
const Util = require('../utils/Utils');

const util = new Util();

class SensorController {

    static async getAllSensors(req, res) {
        try {
            const sensors = await SensorService.getAllSensors()

            if (sensors.humidity.length>0 || sensors.luminosity.length>0 || sensors.temperature.length>0) {
                    util.setSuccess(200, 'Sensors values retrieved', sensors);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getAllSensorsByDate(req, res) {

        const {start, end} = req.query

        try {
            const sensors = await SensorService.getAllSensorsByDate(start, end)

            if (sensors.humidity.length>0 || sensors.luminosity.length>0 || sensors.temperature.length>0) {
                    util.setSuccess(200, 'Sensors values retrieved', sensors);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getAllHumidity(req, res) {
        
        try {
            const humidity = await SensorService.getAllHumidity()

            if (humidity.length>0) {
                    util.setSuccess(200, 'Humidity values retrieved', humidity);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getHumidityByDate(req, res) {

        const {start, end} = req.query
        
        try {
            const humidity = await SensorService.getHumidityByDate(start, end);

            if (humidity.length>0) {
                    
                    util.setSuccess(200, 'Humidity values retrieved', humidity);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async addHumidity(req, res) {

        const humidity = req.body

        try {
            const humidity_res = await SensorService.addHumidity(humidity);

            if (humidity_res) {
                    util.setSuccess(200, 'Humidity values added', humidity_res);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async deleteHumidityByDate(req, res) {
        const {start, end} = req.query

        try {
            const humidity = await SensorService.deleteHumidityByDate(start, end);

            if (humidity.n>0) {
                    util.setSuccess(200, `${humidity.n} Humidity values deleted`, humidity.n);
                } else {
                    util.setError(404, 'No value deleted');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getAllLuminosity(req, res) {
        try {
            const luminosity = await SensorService.getAllLuminosity();

            if (luminosity.length>0) {
                    
                    util.setSuccess(200, 'Luminosity values retrieved', luminosity);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getLuminosityByDate(req, res) {
        const {start, end} = req.query

        try {
            const luminosity = await SensorService.getLuminosityByDate(start, end);

            if (luminosity.length>0) {
                    
                    util.setSuccess(200, 'Luminosity values retrieved', luminosity);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async addLuminosity(req, res) {
        const luminosity = req.body
        
        try {
            const luminosity_res = await SensorService.addLuminosity(luminosity);

            if (luminosity_res) {
                    
                    util.setSuccess(200, 'Luminosity values added', luminosity_res);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async deleteLuminosityByDate(req, res) {
        const {start, end} = req.query

        try {
            const luminosity = await SensorService.deleteLuminosityByDate(start, end);

            if (luminosity.n>0) {
                util.setSuccess(200, `${luminosity.n} Luminosity values deleted`);
                } else {
                    util.setError(404, 'No value deleted');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getAllTemperature(req, res) {
        
        try {
            const temperature = await SensorService.getAllTemperature();

            if (temperature.length>0) {
                    util.setSuccess(200, 'Temperature values retrieved', temperature);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async getTemperatureByDate(req, res) {
        const {start, end} = req.query

        try {
            const temperature = await SensorService.getTemperatureByDate(start, end);

            if (temperature.length>0) {
                    
                    util.setSuccess(200, 'Temperature values retrieved', temperature);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async addTemperature(req, res) {
        const temperature = req.body
        
        try {
            const temperature_res = await SensorService.addTemperature(temperature);

            if (temperature_res) {
                    
                    util.setSuccess(200, 'Temperature values added', temperature_res);
                } else {
                    util.setError(404, 'No value found');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async deleteTemperatureByDate(req, res) {
        const {start, end} = req.query

        try {
            const temperature = await SensorService.deleteTemperatureByDate(start, end);

            if (temperature.n>0) {
                util.setSuccess(200, `${temperature.n} Temperature values deleted`);
                } else {
                    util.setError(404, 'No value deleted');
                }
                return util.send(res);
            } catch (error) {
                util.setError(500, 'Internal error');
                return util.send(res);
            }
    }

    static async generateRandomDatas(req, res) {

        try {
            const random = await SensorService.generateRandomDatas();
            util.setSuccess(200, `${random} random values added`);
            return util.send(res);
        } catch (error) {
            util.setError(500, 'Internal error');
            return util.send(res);
        }
    }
}

module.exports = SensorController;
