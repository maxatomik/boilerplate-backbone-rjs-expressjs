'use strict';

var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../db/collection.json"), 'utf8')),
    body = {};

router.use('/page', require('./page'))
router.use('/sitemap.xml', require('./sitemap'))

router.get('/', function(req, res) {
  res.render('pages/page-layout-1.jade', data[req.path]); 
})

router.get('/home', function(req, res) {
 res.redirect('/'); 
})

module.exports = router;