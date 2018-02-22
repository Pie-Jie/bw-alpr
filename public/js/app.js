$(document).ready(function () {
    $('.title').addClass('disconnected');
    
    var socket = io();
    
    socket.on('title', function (msg) {
        $('.title').text(msg);
        $('.title').addClass('connected');
    });

    var pusher = new Pusher('0c1a5db0129a44a05c13', {
        cluster: 'eu'
    });

    var testChannel = pusher.subscribe('test-channel');
    console.log(testChannel);
    
    socket.emit('client', 'hello');
    
    
    


});
