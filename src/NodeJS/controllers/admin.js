'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path');

module.exports = function(data) {
	router.get('/', function(req, res) {
 		res.render('admin/home.jade'); 
	})
	return router;
};