'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path');


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
	  res.render('pages/page-layout-1.jade', data[req.path]); 
	});
	router.get('/home', function(req, res) {
	 res.redirect('/'); 
	});
	
	return router;
};

