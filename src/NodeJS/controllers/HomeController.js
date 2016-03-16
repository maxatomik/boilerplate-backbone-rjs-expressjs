var pageContent = { layout : true };
module.exports = {
    get_index : function(req, res) {
        pageContent.session = req.session;
        pageContent.layout = req.query.layout;
        pageContent.title = "Home Page";
        res.render('home', pageContent);
    }
}