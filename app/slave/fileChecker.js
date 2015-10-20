module.exports = function(app) {
    var config = require('config');
    var fs = require('fs');
    var fileReader = require('./fileReader')();

    var FileChecker = {
        files: {},

        readUnfilteredDir: function() {
            console.log('Reading unfiltered dir ' + config.get('slave.dir'));
            fs.readdir(config.get('slave.dir'), function(err, filesFromDir) {
                if (err) {
                    throw new Error('Error while trying to read the unfiltered dir ' + config.get('slave.unfiltereddir') + '. Error message: ' + err);
                }

                files = filesFromDir;
                console.log('files to process ' + files);
                files.forEach(function(f){
                    fileReader.read(config.get('slave.dir') + '/' + f);
                });
            });
        },
    };

    return FileChecker;
}