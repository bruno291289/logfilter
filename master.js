var config = require('config');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var filteredLogHandler = require('./app/master/filteredLogHandler');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.post('/checkUserInfos', function (req, res) {
	filteredLogHandler.handle(req.body);
	res.send('Recieved');
});

http.listen(config.get('master.port'), function(){
  console.log('listening on *:3000');
});