'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    body = {};

module.exports = function(data) {
 	router.get('/contact', function(req, res) {
	  res.render('pages/page-layout-1.jade', data['/page'+req.path]); 
	})
    router.get('/equipe', function(req, res) {
      res.render('pages/page-layout-1.jade', data['/page'+req.path]); 
    })
	return router;
};