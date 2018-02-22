$(document).ready(function () {
            $('.title').addClass('disconnected');
            var socket = io();
            socket.on('title', function (msg) {
                $('.title').text(msg);
                $('.title').addClass('connected');
            });
            
            socket.on('test-channel:App\\Events\\UserSignedUp', function (data) {
                console.log(data);
                $('.results').append('<li>' + msg + '</li>');
            });
            

});

