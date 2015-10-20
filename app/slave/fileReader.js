module.exports = function(app) {
    var config = require('config');
    var fs = require('fs');var UserInfo = require('./../userInfo');
    var UserInfo = require('./../userInfo');
    var handler = require('./userInfoHandler');

    var FileReader = {
        read: function(file) {
            console.log('Reading file ' + file);
            fs.readFile(file, function(err, data) {
                if (err) {
                    return console.error('Error ' + err);
                }

                console.log('--------------------FILE DATA-----------------------');
                console.log(data.toString());
                console.log('--------------------END OF FILE DATA-----------');
                handler.handle(UserInfo.instantiate(data.toString()));
            });
        },
    };

    return FileReader;
}