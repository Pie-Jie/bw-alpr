var socket = io('http://localhost:3000');
socket.on('disconnect', function() {
    setTitle('Disconnected');
});

socket.on('connected', function() {
    setTitle('Connected to ALPR');
});

socket.on('message', function(message) {
   setTitle(message); 
});

function setTitle(title) {
    document.querySelector("h2").innerHTML = title;
}

