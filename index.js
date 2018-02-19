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
var imageUrl = "https://assets.gocar.be/picserver1/userdata/1/21203/VigQxhimI/o-nummerplaat-porsche%281%29.jpg";
var settings = "";
var state = {};

app.use(express.static('./public'));
app.use(bodyParser.json());

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        //console.log('a user disconnected');
    });

    socket.emit('title', 'Hello_friend');

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
                            console.dir(data);
                        }
                    };
                    api.recognizeUrl(imageUrl, secretKey, country, opts, callback);

                //});
            //}
        //});

    });

});


console.log(`Listening on port ${PORT}`);
