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
      profileFields: ['id', 'displayName', 'photos', 'email','permissions'],
      enableProof: true
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile._json.permissions);
      var oUser = new User({_json:profile._json});
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
  router.use(function(req, res, next) {
    res.locals.user = req.user;
    console.log(res.locals.user);
    next();
  });

  router.get('/auth/facebook/',
    passport.authenticate('facebook',{ scope: ['user_friends', 'manage_pages','user_managed_groups'] }));

  router.get('/auth/facebook/callback/',
    passport.authenticate('facebook', { failureRedirect: '/login/' }),
    function(req, res) {
      res.redirect('/');
  });

  /*Specific modules admin routes*/
    router.get('/admin/oauth/facebook/users/', function(req, res) {
      User.find({}, function(err, users) {
        console.log(users)
        res.render('admin/oauth/facebook/users.jade', {body: users}); 
      });
    });

  return router;
};

