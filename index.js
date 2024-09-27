// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the public folder
app.use(express.static('public'));

// Handle socket connections
io.on('connection', (socket) => {
    console.log('New connection:', socket.id);

    // Handle signaling data: offer, answer, and ICE candidates
    socket.on('offer', (data) => {
        console.log('Offer received');
        socket.broadcast.emit('offer', data);
    });

    socket.on('answer', (data) => {
        console.log('Answer received');
        socket.broadcast.emit('answer', data);
    });

    socket.on('ice-candidate', (data) => {
        console.log('ICE Candidate received');
        socket.broadcast.emit('ice-candidate', data);
    });

    socket.on('end-share', () => {
        console.log('Screen sharing ended');
        socket.broadcast.emit('end-share');
    });
});

// Start the server
server.listen(3010, () => {
    console.log('Server running on http://localhost:3010');
});
