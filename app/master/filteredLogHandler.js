var fileReader = require('./fileReader')();
var fileWritter = require('./fileWritter');
var UserInfo = require('./../userInfo');

exports.handle = function(userinfos) {
    console.log('HANDLING INFOS');
    console.log(userinfos);
    userinfos.usersinfo.forEach(function(u) {
        console.log(u);
        fileReader.readThen(u, fileWritter.write);
    });
};