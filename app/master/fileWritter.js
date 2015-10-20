var config = require('config');
var fs = require('fs');
var UserInfo = require('./../userInfo');

exports.write = function(userinfo, data, file) {
    var currentInfo = sortLines(updateUserInfo(data, userinfo));
    console.log('FILE IS GONNA BE');
    var dataResult = UserInfo.getDataFrom(currentInfo);
    console.log(dataResult);
    fs.writeFile(file, dataResult, function(err) {
        if (err) return console.log(err);
        console.log('FILE SAVED');
    });
};

function updateUserInfo(data, userinfo) {
    if (data) {
        var currentInfo = UserInfo.instantiate(data.toString());
        if (!currentInfo) {
            currentInfo = userinfo;
        } else {
        	 currentInfo = currentInfo[0];
        	 console.log('------------CURRENT INFO--------------');
        	 console.log('BEFORE');
        	 console.log(currentInfo);
        	 userinfo.lines.forEach(function(l){
			currentInfo.lines.push(l);
        	 });
            console.log('AFTER');
            console.log(currentInfo);
            console.log('------------CURRENT INFO--------------');
        }
        return currentInfo;
    }
    return userinfo
}

function sortLines(currentInfo) {
    console.log('Sorting lines');
    console.log(currentInfo);
    currentInfo.lines.sort(function(a, b) {
        return Date.parse(a.datetime) - Date.parse(b.datetime);
    });
    console.log(currentInfo);
    return currentInfo;
}