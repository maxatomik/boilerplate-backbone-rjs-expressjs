var data = { layout : true };
var Post = require('../models/post');
module.exports = {
    get_index : function(req, res) {
        data.session = req.session;
        data.layout = req.query.layout;
        Post.find({}, function(err, docs) {
        	data.posts = docs;
	        data.title = "Page d'admininistration";
	        res.render('admin/home', data);
	    });
    }
}