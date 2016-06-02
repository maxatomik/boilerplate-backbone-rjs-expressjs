'use strict';

var express = require('express'),
    router = express.Router(),
    path = require('path'),
    jade = require('jade');

module.exports = function(data) {
    var sitemap_urls = new Array();
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
    return router;
};