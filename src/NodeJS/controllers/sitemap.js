'use strict';

var express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    MetaInspector = require('node-metainspector'),
    jade = require('jade'),
    body = {},
    sitemap_urls = new Array(),
    data = JSON.parse(fs.readFileSync(path.join(__dirname, "/../db/collection.json"), 'utf8'));

for ( var url in data ) sitemap_urls.push({ url : url }); 

router.get('/', function(req, res) {
    var sitemap = require('sitemap').createSitemap ({
        hostname: req.protocol + '://' + req.get('host'),
        cacheTime: 600000,
        urls: sitemap_urls
    });
    sitemap.toXML( function (err, xml) {
        if (err) {
            return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send( xml );
    });
})

module.exports = router;