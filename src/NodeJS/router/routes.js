module.exports = function(app, pageContent){
	app.get('/', function (req, res) {
	    console.log('page 1');
	    pageContent.title = "Page 1";
	    pageContent.content = "Content of the page 1"
	    res.render('page-01', pageContent);
	});

	app.get('/page-02', function (req, res) {
	    console.log('page 2');
	    pageContent.title = "Page 2";
	    pageContent.content = "Content of the page 2"
	    res.render('page-02', pageContent);
	});

	app.get('/page-03/:id', function (req, res) {
	    console.log('page 3');
	    pageContent.title = "Page 3";
	    pageContent.content = "Content of the page 3"
	    res.render('page-03', pageContent);
	});

	app.get('/page-04', function (req, res) {
	    console.log('page 4');
	    pageContent.title = "Page 4";
	    pageContent.content = "Content of the page 4"
	    res.render('page-04', pageContent);
	});
	
}