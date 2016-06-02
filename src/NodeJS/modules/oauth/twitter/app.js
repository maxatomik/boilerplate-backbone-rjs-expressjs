'use strict';

var express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    TwitterStrategy = require('passport-twitter').Strategy;

var User = require('./models/user');

module.exports = function(options) {
  if(process.env.TWITTER_CONSUMER_KEY !== undefined && process.env.TWITTER_CONSUMER_SECRET !== undefined) {
    router.use(passport.initialize());
    router.use(passport.session());

    passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.DOMAIN + "/auth/twitter/callback"
      },
      function(token, tokenSecret, profile, done) {
        var oUser = new User(profile._json);
            oUser.save(function(err, resp) {
              if (err) throw err;
              return done(err, resp);
            });
        }
    ));
    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(user, done) {
      done(null, user);
    });
  
    router.get('/auth/twitter',
      passport.authenticate('twitter'));

    router.get('/auth/twitter/callback', 
      passport.authenticate('twitter', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/');
      });

    /*Specific modules admin routes*/
    router.get('/admin/oauth/twitter/users', function(req, res) {
      User.find({}, function(err, users) {
        res.render('admin/oauth/twitter/users.jade', {body: users}); 
      });
    });

  } else {
    console.log('twitter oauth : twitter credentials missing');
  }
  return router;
};