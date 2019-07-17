var express = require('express');
var http = require('http');
var port = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var fs = require("fs");
var tls = require('tls');
var https = require('https');

// Express Server Code
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  next();
});
app.set('port', port);

// Http Server creation code


////////////// NEW CODE SNIPPET ////////////////////////

// var privateKey = fs.readFileSync('privatekey.pem').toString();
// var certificate = fs.readFileSync('certificate.pem').toString();

// var credentials = {
//     key: privateKey,
//     cert: certificate,
//     rejectUnauthorized:false
//   };

// var httpsServer = https.createServer(credentials, app);

// httpsServer.listen(port, function() {
// console.log('HTTPS server listening on port ' + port);
// });


/////////////////////////////////////////////////////

var server = http.Server(app);
server.listen(port, () => {
    console.log("connected on port:" + port);
});

//Socket.io Code

var io = require('socket.io').listen(server);
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
