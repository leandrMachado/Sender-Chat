var express = require("express");
var app = express();
var path = require("path");
var port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get("/chat", function(req, res){
    res.sendFile(path.join(__dirname, './public/chat.html'))
});

app.use(express.static(__dirname + '/components'));
app.use('/images', express.static('images'));
app.use('/styles', express.static('styles'));

var midPort = app.listen(port, function () {
    console.log('Server listening on port ' + port);
})

// set up socket connection
var io = require('socket.io').listen(midPort);

io.sockets.on('connection', (socket)=>{
    socket.emit('message', { message: 'Welcome to the Real Time Web Chat' });
    
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    })
    socket.on("disconnect", () => {
    
    })
})