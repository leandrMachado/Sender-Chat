var express = require('express');
var path = require("path");
var app = express();
var port = process.env.PORT || 3000;

app.use('/styles', express.static('styles'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/styles'));

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, './views/index.html'))
})

var midPort = app.listen(port, function () {
    console.log('Server listening on port ' + port);
})

var io = require('socket.io').listen(midPort);
// set up socket connection
io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

