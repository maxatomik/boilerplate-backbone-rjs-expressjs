var STREAM = require('socket.io-client')(process.env.STREAMER);
var Twit = require('twit');

var Post =require('../models/post');
var User =require('../models/user');

var T = new Twit({
    "consumer_key": process.env.TWITTER_CONSUMER_KEY,
    "consumer_secret": process.env.TWITTER_CONSUMER_SECRET,
    "access_token": process.env.TWITTER_ACCESS_TOKEN,
    "access_token_secret": process.env.TWITTER_ACCESS_TOKEN_SECRET
});
STREAM.on('tweet', function(tweet){
    console.log(tweet);
    var oPost = new Post(tweet);
        oPost.save();

    var oUser = new User(tweet.user);
        oUser.save();
});