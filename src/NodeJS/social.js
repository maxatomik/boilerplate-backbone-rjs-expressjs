var express = require('express');
var passport = require('passport');

var TwitterStrategy = require('passport-twitter').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

app = express();
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
var cors = require('cors');

app.use(cors({
    origin : '*'
}));

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

mongoose = require('mongoose');
/* SESSIONS STORE */
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true, 
    saveUninitialized: true,
    secret:'marcel'
}));

var Post =require('./models/post');
var User =require('./models/user');

app.use(passport.initialize());
app.use(passport.session());

app.get('/profile', function(req, res){
  res.send('<!DOCTYPE html><html><body><script> window.close(); </script></body></html>');
  res.end();
});

/* Twitter oAUTH */
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.DOMAIN + ":" + process.env.PORT + "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {

    var oUser = new User(profile);
        oUser.save();
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/twitter',
  passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });


/* Facebook oAUTH */
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.DOMAIN+":"+process.env.PORT+"/auth/facebook/callback",
    enableProof: false
  },
  function(accessToken, refreshToken, profile, done) {
    var oUser = new User(profile);
        oUser.save();
  }
));
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/profile');
  });

Server = require('http').createServer(app);
Server.listen(process.env.PORT, function(){ 
    console.log("Social oAuth on port : " + process.env.PORT);
});

