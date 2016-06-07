'use strict';

var express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    FacebookStrategy = require('passport-facebook').Strategy;

var User = require('./models/user');

module.exports = function(options) {

  router.use(passport.initialize());
  router.use(passport.session());

  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.DOMAIN+"/auth/facebook/callback/",
      enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
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
  router.get('/auth/facebook/',
    passport.authenticate('facebook'));

  router.get('/auth/facebook/callback/',
    passport.authenticate('facebook', { failureRedirect: '/login/' }),
    function(req, res) {
      res.redirect('/');
  });

  return router;
};

