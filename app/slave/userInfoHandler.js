var config = require('config');
var fs = require('fs');

exports.handle = function(userinfos) {
    console.log('--------------------HANDLING INFOS-----------------------');
    console.log(userinfos);
    console.log('--------------------------------------------------------------------');
    sendTo(userinfos);
};

function sendTo(userinfos) {
    console.log('----------SENDING TO THE MASTER----------------');
    console.log('master.address ' + config.get('master.address'));
    console.log('master.port ' + config.get('master.port'));
    console.log('----------SENDING TO THE MASTER----------------');

    var http = require('http');
    var message = {
        usersinfo: userinfos
    };
    var messageObj = JSON.stringify(message);
    var postheaders = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(messageObj, 'utf8')
    };
    var optionspost = {
        host: config.get('master.address'),
        port: config.get('master.port'),
        path: '/checkUserInfos',
        method: 'POST',
        headers: postheaders
    };
    var reqPost = http.request(optionspost, function(res) {
        console.log("Received response: " + res.statusCode);
    });
    reqPost.write(messageObj);
    reqPost.on('error', function(e) {
        console.log('Error while trying to send data do the master ' + e);
    });
    reqPost.on('uncaughtException', function(err) {
        console.log(err);
    });
    reqPost.end();
};