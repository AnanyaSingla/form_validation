var express    = require('express');
//var bodyParser = require('body-parser');

var app = express();
//app.use(bodyParser());

app.get('/',function(req, res, next){
    res.send('Hellooooo');
    //...
}
var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
