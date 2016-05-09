'use strict';

var fs = require('fs');
var data = JSON.parse(fs.readFileSync(__dirname + "/../db/collection.json", 'utf8'));
var jade = require('jade');
var content = {};

module.exports = {
    get_index : function(req, res) {
        var pathName = req.originalUrl.split('/')[0].replace('?layout=false', '');
        content.session = req.session;
        content.layout = req.query.layout;
        if(pathName.length > 0) {
            content.body = data[pathName];
        } else {
            content.body = data["page_1"];
        }
       
        res.render('pages/page-layout-1.jade', content);  
    }
}