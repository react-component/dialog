var request = require('request');
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var escapeHtml = require('escape-html');
var Promise = require('modulex-promise');

var changeLogData = [];
var config = {};

var getChangeLogDataDefer = null,
    getChangeLogDataPromise = null;


function getChangeLog(cfg){
    if(!cfg.user || !cfg.repo){
        console.log('You must provide user and repo argument...');
        return;
    }
    config = cfg;
    console.log('Task is running, please wait for a moment...');
    getMileStones({
        user : cfg.user,
        repo : cfg.repo,
        loginUserName : cfg.loginUserName,
        loginPassword : cfg.loginPassword,
        state : 'all'
    },getIssuesFromAllMileStones);
}

function getChangeLogData(cfg, callback){
    getChangeLogDataDefer = new Promise.Defer();
    getChangeLogDataPromise = getChangeLogDataDefer.promise;

    getChangeLog(cfg);
    getChangeLogDataPromise.then(
        function(value){
            callback(value);
        },
        function(err){
            console.log(err);
        }
    )
}

function getMileStones(opts,callback){
    if(opts.loginUserName && opts.loginPassword){
        var basic = new Buffer(opts.loginUserName + ':' + opts.loginPassword, 'ascii').toString('base64');
        opts.headers = {
            accept: "application/vnd.github.beta+json",
            authorization: "Basic " + basic,
            host: "api.github.com",
            'user-agent': "NodeJS HTTP Client"
        };
    }else{
        console.log('you didn\'t provide your username and password on github, once you get a "rate limit" error, you must provide them.');
        opts.headers = {
            'User-Agent' : 'weekeight'
        }
    }
    opts.state = opts.state || 'all';
    opts.url = 'https://api.github.com/repos/' + opts.user + '/' + opts.repo + '/milestones?state=' + opts.state + '&username=weekeight&password=huhua0418';
   request.get(opts, function(err, res, body){
        if(!err && res.statusCode === 200){
            callback(opts, JSON.parse(body));
        }else{
            console.log(body);
        }
    });
}

function getIssuesFromAllMileStones(opts, allMileStones){
    if(!allMileStones.length){
        console.log('This repotory has no milestone...');
        return;
    }
    for(var i = 0; i < allMileStones.length; i++){
        var milestone = allMileStones[i],
            number = milestone.number;

        var milestoneData = { milestone : milestone };
        opts.url = 'https://api.github.com/repos/' + opts.user + '/' + opts.repo + '/issues?state=' + opts.state + '&milestone=' + number;
        (function(milestoneData, i, totalLenght){
            request(opts,function(err, res, body){
                if(!err && res.statusCode == 200){
                    var issueData = JSON.parse(body);
                    milestoneData.issues = issueData;
                    changeLogData.push(milestoneData);
                    if(changeLogData.length === totalLenght){
                        afterGetEachMileStone();
                    } 
                }else{
                    console.log(body);
                }
                
            });
        })(milestoneData, i, allMileStones.length);
        
    }
}

function afterGetEachMileStone(i, totalLenght){
   var data = changeLogData.sort(function(milestoneData_1, milestoneData_2){
        var version_1 = milestoneData_1.milestone.title,
            version_2 = milestoneData_2.milestone.title;
        if(parseFloat(version_1) > parseFloat(version_2)){
            return 1;
        }else if(parseFloat(version_1) < parseFloat(version_2)){
            return -1;
        }else{
            version_1 = version_1.split('.');
            version_2 = version_2.split('.');
            if((version_1[2] && !version_2[2]) || parseInt(version_1[2]) > parseInt(version_2[2])){
                return 1;
            }
        }
        return -1;
    });

    getChangeLogDataDefer && getChangeLogDataDefer.resolve(changeLogData);
    config.mdFilePath && createMDFile();
}

function createMDFile(){
    var mdFilePath = path.resolve(config.mdFilePath);
    var mdContent = '';
    for(var i = changeLogData.length - 1; i >= 0 ; i--){
        mdContent += getEachChangeLogContent(changeLogData[i]);
    }
    mkdirp(path.dirname(mdFilePath));
    fs.writeFileSync(mdFilePath, mdContent);
    console.log(mdFilePath + ' was created..');
}

function getEachChangeLogContent(changeLogItem){
    var milestone = changeLogItem.milestone,
        issues = changeLogItem.issues,
        itemContent = '';
    itemContent += '#v' + escapeHtml(milestone.title) + ' (' + milestone.created_at.substring(0,10) + ')\n\n';
    for(var i = 0; i < issues.length; i++){
        var issueItem = issues[i];
        itemContent += '- ' + '[\#' + issueItem.number + '](' + issueItem.html_url + ') ' + escapeHtml(issueItem.title) + '   ([@' + issueItem.user.login + '](' + issueItem.user.html_url + '))\n';  
    }
    return itemContent + '\n';
}
module.exports = {
    getChangeLog : getChangeLog,
    getChangeLogData : getChangeLogData
}