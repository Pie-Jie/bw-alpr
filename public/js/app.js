
$(document).ready(function () {
    var socket = io();
    socket.on('title', function (msg) {
        $('.title').text(msg);
    });
    
});
