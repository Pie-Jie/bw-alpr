$(document).ready(function () {
    $('.title').addClass('disconnected');
    
    var socket = io();
    
    socket.on('title', function (msg) {
        $('.title').text(msg);
        $('.title').addClass('connected');
    });
    
    socket.on('received', function(msg) {
       $('.title').append(msg); 
    });

    
     var pusher = new Pusher('0c1a5db0129a44a05c13', {
        cluster: 'eu'
    });
    var channel = pusher.subscribe('test-channel');
        console.log(channel);

    channel.bind('App\\Events\\eventTrigger', function(data) {
        console.log('An event was triggered with message: ' + data.message);
        socket.emit('message', data.message);
    });
    
    
    


});
