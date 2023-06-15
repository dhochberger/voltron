const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();
require('./auth/passport');
const mongoose = require('./database')

const app = express();

// const port = process.env.PORT || '5000';

// console.log(`Server listening on port ${port}`);
if (process.env.NODE_ENV !== 'test') {
    app.use(logger('combined'));
}
else app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cookieParser());
app.use(cors());

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const users = require('./routes/users');
app.use('/users', users);

const sensors = require('./routes/sensors')
app.use('/sensors', sensors);

const usersSeeder = require('./seeders/users')
usersSeeder

/*
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: "*",
    },
});
  
const sockets_loader = require("./routes/sockets");
sockets_loader.socket_manager(io);

server.listen(parseInt(process.env.PORT)+1, () => console.log(`Socket listening on port ${parseInt(process.env.PORT)+1}`));


// Client test
//client.js
var io_client = require('socket.io-client');
var socket = io_client.connect(process.env.IOT_SOCKET, {reconnect: true});

// Add a connect listener
socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('askSensors');

socket.on('getSensors', function(socket) {
    console.log('socket', socket)
})
// fin client test
*/

module.exports = app;
