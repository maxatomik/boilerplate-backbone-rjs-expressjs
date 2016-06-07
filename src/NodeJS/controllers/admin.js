'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path');

module.exports = function(data) {
	router.get('/tools/', function(req, res) {
 		res.render('admin/tools.jade'); 
	})
    router.get('/', function(req, res) {
        res.render('admin/tools.jade'); 
    })
	return router;
};