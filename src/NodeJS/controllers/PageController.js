var User   = require('../models/user');
var pageContent = { layout : true };

module.exports = {
    get_index : function(req, res) {
        res.send("landing template page");
    },
    get_id : function(req, res, id) {
        pageContent.session = req.session;
        pageContent.layout = req.query.layout;
        pageContent.title = "Page "+id; 
        pageContent.content = "Content of the page "+id;
        res.render('page', pageContent);
    },
}