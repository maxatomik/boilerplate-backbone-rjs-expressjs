'use strict';

var fs = require('fs');
var data = JSON.parse(fs.readFileSync(__dirname + "/../db/collection.json", 'utf8'));
var jade = require('jade');
var content = {};

module.exports = {
    get_index : function(req, res) {
        res.send('index page')
    },
    get_slug : function(req, res, slug) {
        var pathName = req.originalUrl.split('/')[1].replace('?layout=false', '');
        content.session = req.session;
        content.layout = req.query.layout;
        if(pathName.length > 0) {
            content.body = data[slug];
            res.render('pages/'+data[slug].tmp+'.jade', content); 
        } else {
            res.render('404.jade', content); 
        }
    }
}