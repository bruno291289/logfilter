module.exports = function(app) {
    var config = require('config');
    var fs = require('fs');

    var FileReader = {
        readThen: function(userinfo, next) {
            console.log('Reading file ' + config.get('master.filtereddir') + '/' + userinfo.userid);
            var file = config.get('master.filtereddir') + '/' + userinfo.userid;

            fs.readFile(file, function(err, data) {
                if (err) {
                    if(err.code == 'ENOENT'){
                        console.log('Creating file ' + file)
                        fs.closeSync(fs.openSync(file, 'w'));
                    } else{
                        console.error('Erro ao tentar ler o arquivo ' + err);
                        return;
                    }
                }

                if(next){
                    next(userinfo, data, file);
                }
            });
        },
    };

    return FileReader;
}