BACKBONE_PATH = __dirname + '/../../' + process.env.BACKBONE;
var express = require('express');
var fs = require('fs');
var cors = require('cors');
var auth = require('http-auth');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

var expressControllers = require('express-controller');
app = express();
app.use(express.static(BACKBONE_PATH));
app.set('view engine', 'jade');
app.set('views', BACKBONE_PATH + '/templates');
app.set('view options', {
    layout: true
});
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cors({
    origin : '*'
}));

var basic = auth.basic({
	realm: "Orange",
	file: __dirname + "/../../users.htpasswd" 
});  

app.get('*',auth.connect(basic), function(req, res, next) {
    next();
});

mongoose = require('mongoose');

app.use('/ressources', express.static(__dirname + '/public'));

app.locals.env = process.env.ENV;

/*Express Routes*/
var router = express.Router();
app.use(router);
expressControllers
            .setDirectory( __dirname + '/controllers')
            .bind(router);


/*Express Server*/
Server = require('http').createServer(app);
Server.listen(process.env.PORT || 5000, function(){ 
    console.log("Web App on port : " + process.env.PORT);
});