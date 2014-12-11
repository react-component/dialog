gh-changelog
============

generate github changelog into markdown file

##Install

	npm install gh-changelog -g

##Command Line

common usage

	changelog-md -u kissyteam -r kissy -f changelog.md

use in basic authentication because of github api [rate limit](https://developer.github.com/v3/#rate-limiting)

	changelog-md -u kissyteam -r kissy -f changelog.md -n yourGithubUserName -p yourGithubPassword

##Use Api

	var ghChangeLog = require('gh-changelog');
	ghChangeLog.getChangeLog({
		user : 'kissyteam',
		repo : 'kissy',
		mdFilePath : './changelog.md',
		loginUserName : 'exampleName',  //optional,unless you get rate limit error
		loginPassword : 'examplePassword'  //optional,unless you get rate limit error
	});
	
	//or you can get the changelog data and output changelog whatever format you prefer
	ghChangeLog.getChangeLogData({
		user : 'kissyteam',
		repo : 'kissy',
		loginUserName : 'exampleName',  //optional,unless you get rate limit error
		loginPassword : 'examplePassword'  //optional,unless you get rate limit error
	},function(changeLogData){
		//do something with changeLogData...
	})