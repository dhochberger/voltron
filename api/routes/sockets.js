const SensorService = require('../services/SensorService');
const Util = require('../utils/Utils');
const util = new Util();

const socket_manager = (io) => {

    io.on('connection', async (socket) => {

        console.log('Socket connected ', socket.id)

        socket.on('disconnect', () => {
            console.log('Client disconnected ' + socket.id)
      
          });

        socket.on('askSensors', async () => {
            const sensors = await SensorService.getAllSensors()
            socket.emit('getSensors', {message: 'Sensors', data: sensors, method:'SOCKET'})
        })

        socket.on('askSensorsByDate', async (message) => {
            const sensors = await SensorService.getAllSensorsByDate(message.start, message.end)
            socket.emit('getSensors', {message: 'Sensors', data: sensors, method:'SOCKET'})
        })

        socket.on('askHumidity', async () => {
            const humidity = await SensorService.getAllHumidity()
            socket.emit('getHumidity', {message: 'Humidity', data: humidity, method:'SOCKET'})
        })

        socket.on('askHumidityByDate', async (message) => {
            const humidity = await SensorService.getHumidityByDate(message.start, message.end)
            socket.emit('getHumidity', {message: 'Humidity', data: humidity, method:'SOCKET'})
        })

        socket.on('askLuminosity', async () => {
            const luminosity = await SensorService.getAllLuminosity()
            socket.emit('getLuminosity', {message: 'Luminosity', data: luminosity, method:'SOCKET'})
        })

        socket.on('askLuminosityByDate', async (message) => {
            const luminosity = await SensorService.getLuminosityByDate(message.start, message.end)
            socket.emit('getLuminosity', {message: 'Luminosity', data: luminosity, method:'SOCKET'})
        })

        socket.on('askTemperature', async () => {
            const temperature = await SensorService.getAllTemperature()
            socket.emit('getTemperature', {message: 'Temperature', data: temperature, method:'SOCKET'})
        })

        socket.on('askTemperatureByDate', async (message) => {
            const temperature = await SensorService.getTemperatureByDate()
            socket.emit('getTemperature', {message: 'Temperature', data: temperature, method:'SOCKET'})
        })
    })
}

module.exports = {socket_manager}