var User   = require('../models/user'); //User Model
var pageContent = { layout : true };

module.exports = {
    get_index : function(req, res) {
        pageContent.session = req.session;
        pageContent.layout = req.query.layout;
        pageContent.title = "Page 2";
        pageContent.content = "Content of the page 2";
        res.render('page-02', pageContent);
    },
    get_create : function(req, res) {
        /*
        var newUser = new User({ 
            name: 'Nick Cerminara', 
            password: 'password',
            admin: true 
        });
        newUser.save(function(err) {
            if (err) throw err;
            console.log('User saved successfully');
        });
        */
        res.send("User saved successfully");
    },
    get_id : function(req, res, id) {
        console.log(id);
        pageContent.session = req.session;
        pageContent.layout = req.query.layout;
        pageContent.title = "Page "+id; 
        pageContent.content = "Content of the page "+id;
        res.render('page', pageContent);
    },
}