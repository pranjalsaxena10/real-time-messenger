'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 8080;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);
io.on('connection', function(socket){
    
    console.log('New User has connected');
    
    socket.on('join', (data) => {
        socket.join(data.room);
        console.log(data.user + ' connected in room ' + data.room);
        socket.broadcast.to(data.room).emit('New User connected', {user: data.user, message: 'has joined this room.'});
    }); 

    socket.on('message', (data) => {
        // console.log('new message' + JSON.stringify({user: data.user, message: data.message}));
        io.in(data.room).emit('new message', {user: data.user, message: data.message});
    });
    
    socket.on('leave', (data) => {
        console.log(data.user + ' left room ' + data.room);
        socket.broadcast.to(data.room).emit('left room', {user: data.user, message: 'has left this room.'});
        socket.leave(data.room);
    });

});
