'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    body = {};

var User = require(path.join(__dirname, '/../models/user'));

module.exports = function(data) {
	router.get('/', function(req, res) {
 		res.render('admin/home.jade'); 
	})
 	router.get('/users', function(req, res) {
 		User.find({}, function(err, users) {
 			res.render('admin/users.jade', {body:users}); 
 		});
	})
	return router;
};