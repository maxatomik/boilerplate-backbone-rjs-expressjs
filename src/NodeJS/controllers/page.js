'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    content = {};


module.exports = function(data) {
 	router.get('/:page', function(req, res) {
      content = JSON.parse(fs.readFileSync(path.join(__dirname, "/../db/collection.json"), 'utf8'));
      if(content['/page'+req.path] !== undefined) {
	       res.render('pages/page-layout-1.jade', content['/page'+req.path]); 
      } else {
        res.send('json not found, add /page'+req.path+' node into your collection.json');
      }
	});
	return router;
};