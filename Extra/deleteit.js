var express = require('express');
var validation=require('validator');
var app = express();

//app.use(express.static('public'));

app.get('/index.html', function(req, res) {

    res.sendFile('public/index.html');
});

app.listen(3000);
