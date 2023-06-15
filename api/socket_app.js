require('dotenv').config();
const express = require('express');
const socket_app = express();

const server = require("http").createServer(socket_app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
});
  
const sockets_loader = require("./routes/sockets");
sockets_loader.socket_manager(io);

server.listen(parseInt(process.env.PORT)+1, () => console.log(`Socket listening on port ${parseInt(process.env.PORT)+1}`));


const SensorService = require('./services/SensorService');

var SockJS = require('sockjs-client');
var StompPkg = require("@stomp/stompjs");

const { Stomp } = StompPkg;
const sock = new SockJS(process.env.IOT_SOCKET);
const stompClient = Stomp.over(sock);

stompClient.connect('Voltron19.BigData', 'guest', function(frame) {
    console.log(`Socket.Client connected to ${process.env.IOT_SOCKET}`)

    stompClient.subscribe('/data/ht', async function(message) {
        const body = JSON.parse(message.body)
        await SensorService.addHumidity({value: body.humidity})
        await SensorService.addTemperature({valueC: body.tempC, valueF: body.tempF})
        console.log(`Added Humidity ${body.humidity}`)
        console.log(`Added Temperature ${body.tempC} : ${body.tempF}`)
    });
    stompClient.subscribe('/data/luminosity', async function(message) {
        const body = JSON.parse(message.body)
        await SensorService.addLuminosity({value: body.luminosity})
        console.log(`Added Luminosity ${body.luminosity}`)
    });
});

module.exports = socket_app