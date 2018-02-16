var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app).listen(3000);
var io = require('socket.io')(server);

app.use(express.static('./public'));

io.on('connection', function(socket) {
    //console.log("connected");
    socket.emit('message', 'Welcome to ALPR');
});

console.log('Starting socket app - http://localhost:3000');