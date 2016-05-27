'use strict';

var express = require('express'),
	path = require('path'),
    router = express.Router(),
    jsonfile = require('jsonfile');
 

module.exports = function(models) {
	router.post('/edit', function(req, res) {
    var file = path.join(__dirname, '/../../db/collection.json');
	    jsonfile.readFile(file, function(err, obj) {
	        obj[req.body.path][req.body.id] = req.body.value
	        jsonfile.writeFile(file, obj, { spaces:2 },function(){
	            res.send('ok');
	        })
	    })
	});
  return router;
};

