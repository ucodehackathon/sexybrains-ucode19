// Create WebSocket connection.
const socket = io('http://localhost:8080');

// Connection opened
socket.on('connect', function () {
    console.log('Connected socket.io');
});

// Listen for messages
socket.on('isFace', function (isFace) {
    console.log('isFace: ', isFace);
    if (isFace) {
        faceEnter();
    } else {
        faceLeave();
    }
});