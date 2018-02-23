const express = require('express');
var http = require('http');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var OpenalprApi = require('openalpr_api');
var app = express();
const PORT = process.env.PORT || 3000;
var server = http.createServer(app).listen(PORT);
const io = require('socket.io')(server);
var Redis = require('ioredis');
var imageUrl = "https://assets.gocar.be/picserver1/userdata/1/21203/VigQxhimI/o-nummerplaat-porsche%281%29.jpg";
var settings = "";
var state = {};
var Pusher = require('pusher');
const nest = require('node-nest-cams');

let nestConfig = {
    productId: 'be09c768-63e1-4e2c-bed0-ec05a8620224',
    productSecret: 'fQzycsVgphavDqe9LqhGnhJ02'
}

var NestApi = require('nest-api');
var nestApi = new NestApi('sem@brandworks.be', 'Brandworks!');

nestApi.login(function (data) {
    nestApi.get(function (data) {

        //console.dir(data.shared);
    });
});


var pusher = new Pusher({
    appId: '480133',
    key: '0c1a5db0129a44a05c13',
    secret: '21d77fb4e576c54cdc96',
    cluster: 'eu',
    encrypted: true
});




app.use(express.static('./public'));
app.use(bodyParser.json());


io.on('message', function (socket) {
    socket.on('message', function (msg) {
        console.log('MSG :: ' + msg);
        socket.broadcast.emit('received', 'Received data!');
    });

});

io.on('connection', function (socket) {


    socket.emit('title', '> Client connected to server');


    fs.readdir('./uploads', function (err, files) {

        var api = new OpenalprApi.DefaultApi()
        var secretKey = "sk_DEMODEMODEMODEMODEMODEMO";
        var country = "eu";
        var opts = {
            'recognizeVehicle': 0,
            'state': "",
            'returnImage': 0,
            'topn': 1,
            'prewarp': ""
        };
        //files.forEach(function (fileName) {

        //var file = path.join(__dirname, '/uploads', fileName);
        //var stats = fs.statSync(file);
        // if (stats.isFile() && fileName !== ".DS_Store") {
        //console.log(typeof stats);
        //fs.readFile(file, 'UTF-8', function (err, contents) {

        //imageUrl = new Buffer(file).toString('base64');
        //console.log(imageUrl);
        var callback = function (error, data, response) {
            if (error) {
                console.error(error);
            } else {
                //console.dir(data);
            }
        };
        api.recognizeUrl(imageUrl, secretKey, country, opts, callback);

        //});
        //}
        //});

    });

});


console.log(`Listening on port ${PORT}`);
