var express = require('express');
var path = require("path");
var app = express();
var port = process.env.PORT || 3000;

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, './views/index.html'))
})

var midPort = app.listen(port, function () {
    console.log('Server listening on port ' + port);
})