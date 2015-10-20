var config = require('config');
var express = require('express');
var app = express();
var http = require('http').Server(app);

http.listen(config.get('slave.port'), function(){
  console.log('listening on *:' + config.get('slave.port'));
  var fileChecker = require('./app/slave/fileChecker')();
  fileChecker.readUnfilteredDir();
});