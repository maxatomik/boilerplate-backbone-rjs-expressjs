'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    content = {};


module.exports = function(data) {
	router.use('/admin', require('./admin')(data))
 	router.use('/page', require('./page')(data))
	router.use('/sitemap.xml', require('./sitemap')(data))
	router.use('/logout', function(req, res) {
       req.session.destroy();
       req.logout();
       res.redirect('/');
    });
	router.get('/', function(req, res) {
	  content = JSON.parse(fs.readFileSync(path.join(__dirname, "/../db/collection.json"), 'utf8'));
	  res.render('pages/page-layout-1.jade', content[req.path]); 
	});
	router.get('/home', function(req, res) {
	 res.redirect('/'); 
	});
	
	return router;
};

