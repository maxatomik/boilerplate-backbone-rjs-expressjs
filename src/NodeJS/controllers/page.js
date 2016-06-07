'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    content = {},
    availableTpl = [],
    tpl = "page-layout-1.jade";

fs.readdir("./web/www/templates/pages", function (err, files) { 
  if (!err) {
      for(var i = 0; i < files.length; i++ ){
        availableTpl[files[i]] = 'ok';
      }
  } else {
      throw err; 
  }
});
    
module.exports = function(data) {
 	router.get('/:page/', function(req, res) {
      content = JSON.parse(fs.readFileSync(path.join(__dirname, "/../db/collection.json"), 'utf8'));
      if(content['/page'+req.path] !== undefined) {
         if(content['/page'+req.path].tpl !== undefined ) tpl = content['/page'+req.path].tpl;
         content['/page'+req.path].domainUrl = req.get('host');
         if(availableTpl[tpl] !== undefined) {
            res.render('pages/'+tpl, content['/page'+req.path]);
         } else {
            res.render('pages/page-layout-1.jade', content['/page'+req.path]);
         }
      } else {
        res.send('json not found, add /page'+req.path+' node into your collection.json');
      }
	});
	return router;
};