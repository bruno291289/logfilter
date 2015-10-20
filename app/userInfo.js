var config = require('config');

exports.LineInfo = function(datetime, line) {
    this.datetime = datetime;
    this.line = line;
};

exports.UserInfo = function() {
    this.userid = "";
    this.lines = [];
};

exports.getDataFrom = function(info) {
    var data = "";

    info.lines.forEach(function(l) {
        data += l.line + '\n';
    });

    return data;
}

exports.instantiate = function(data) {
    if (!data) {
        return;
    }

    var users = getUserIds(data);
    var userinfos = [];

    users.forEach(function(u) {
        var line = getLine(data, getReLine(u));

        if (line) {
            var ui = new exports.UserInfo();
            ui.userid = u;

            while (line) {
                var datetime = new Date(getDateTime(line));
                ui.lines.push(new exports.LineInfo(datetime, line));
                data = removeUserLine(data, u);
                line = getLine(data, getReLine(u));
            }

            userinfos.push(ui);
        }
    });

    return userinfos;
};

getUserIds = function(data) {
    var users = identifyUsers(data);
    return filterDistinctUsers(users);
};

filterDistinctUsers = function(users) {
    return users.filter(function(u, i) {
        return users.indexOf(u) == i;
    });
}

identifyUsers = function(data) {
    var reuser = new RegExp(config.get('slave.match.startuserid') + '(.*?)' + config.get('slave.match.enduserid'), 'g');
    var users = data.toString().match(reuser);
    return removePrefixFromUserIds(users);
}

removePrefixFromUserIds = function(users) {
    for (var i = users.length - 1; i >= 0; i--) {
        users[i] = users[i].replace(new RegExp(config.get('slave.match.startuserid')), '').replace(new RegExp(config.get('slave.match.enduserid')), '');
    };

    return users;
}

getDateTime = function(line) {
    var d = line.match(getReDatetime());

    if (d)
        return d[1];
}

getReDatetime = function() {
    return new RegExp(config.get('slave.match.startdatetime') + '(.*?)' + config.get('slave.match.enddatetime'));
}

getReLine = function(user) {
    return new RegExp("^.*\\b" + user + "\\b.*$", "m");
}

getLine = function(data, reline) {
    var line = data.toString().match(reline);

    if (line)
        return line[0];
}

removeUserLine = function(data, user) {
    return data = data.replace(getReLine(user), '');
}