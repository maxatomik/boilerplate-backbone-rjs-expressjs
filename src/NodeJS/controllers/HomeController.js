'use strict';

var fs = require('fs');
var data = JSON.parse(fs.readFileSync(__dirname + "/../db/collection.json", 'utf8'));
var jade = require('jade');
var content = {};

module.exports = {
    get_index : function(req, res) {
        content.session = req.session;
        content.layout = req.query.layout;
        content.body = data["home"];
        res.render('pages/home.jade', content);  
    }
}