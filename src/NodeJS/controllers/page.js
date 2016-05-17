'use strict';

var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../db/collection.json"), 'utf8')),
    body = {};

router.get('/contact', function(req, res) {
  res.render('pages/page-layout-1.jade', data[req.path]); 
})

module.exports = router;