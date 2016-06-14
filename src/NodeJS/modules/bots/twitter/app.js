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
			    		request({
		        url: 'https://graph.facebook.com/v2.6/me/messages',
		        qs: {access_token: 'CAACycZCDKLwMBAKIxWVi57ZADD1CP24aPjthDZBTNQfuM5IR93Fa9tsnN9xsETTOX9MY00yZCKGZA5hPfCH1ZCGt5FO7QZBTNIzQbL920iiYS15Sr6VYedfNpdFP2zosDciXZAsYl0Kg5HfHMDO8QqvGphsXRVRWrg5D1UoRiQVKAsdYLrWNh0kgvGTubWjwLiI4Yjpca8JZCrgZDZD'},
		        method: 'POST',
		        json: {
		            recipient: { id: '1017598468328644' },
		            message : {
		            	text:JSON.stringify(tweet.text)
		            }
		        }
		    }, function (error, response) {

		        if (error) {
		            console.log('Error sending message: ', error);
		        } else if (response.body.error) {
		            console.log('Error: ', response.body.error);
		        } else {
		            console.log('message sent',response.body)
		        }

		    });

			    	console.log('post saved.');
			    });
			var oUser = new User({ _json : tweet.user });
			        oUser.save(function(err, u){
			    	console.log('user saved.');
			    });
		});
		/*Specific modules admin routes*/
		router.get('/admin/bots/twitter/users', function(req, res) {
			User.find({}, function(err, users) {
	 			res.render('admin/bots/twitter/users.jade', {body: users}); 
	 		});
		});

		router.get('/twitter/post/new', function(req, res) {
			console.log('new real');
		});

		router.get('/admin/bots/twitter/posts', function(req, res) {
			Post.find({}, function(err, posts) {
	 			res.render('admin/bots/twitter/posts.jade', {body: posts}); 
	 		});
		});

		router.get('/twitter/posts', function(req, res) {
			Post.find({}, function(err, posts) {
	 			res.json(posts[0]._json); 
	 		});
		});
	} else {
		console.log('twitter bot : twitter credentials missing');
	}
  return router;
};

