'use strict';

var express = require('express'),
    router = express.Router(),
    request = require('request'),
    Twit = require('twit');
 


var User = require('./models/user');
var Post = require('./models/post');

module.exports = function(options) {
	if( process.env.TWITTER_CONSUMER_KEY !== undefined ) {
		var STREAM = require('socket.io-client')(process.env.STREAMER);
		var T = new Twit({
	    "consumer_key": process.env.TWITTER_CONSUMER_KEY,
	    "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
	    "access_token": process.env.TWITTER_ACCESS_TOKEN,
	    "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET
		});
	   	
		console.log('Streaming Twitter on #test')
		STREAM.on('tweet', function(tweet){
			console.log('found tweet :'+ tweet.id_str);
			var oPost = new Post({ _json : tweet });
			    oPost.save(function(err, p){
			    	console.log('post saved.');
			    });
			var oUser = new User({ _json : tweet.user });
			        oUser.save(function(err, u){
			    	console.log('user saved.');
			    });
		});

		router.get('/users', function(req, res) {
			User.find({}, function(err, users) {
	 			res.render('admin/bots/twitter/users.jade', {body: users}); 
	 		});
		});

		router.get('/posts', function(req, res) {
			Post.find({}, function(err, posts) {
	 			res.render('admin/bots/twitter/posts.jade', {body: posts}); 
	 		});
		});
	} else {
		console.log('twitter bot : twitter credentials missing');
	}
  return router;
};

