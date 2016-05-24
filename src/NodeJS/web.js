'use strict';

var express = require('express');
var fs = require('fs');
var cors = require('cors');
var auth = require('http-auth');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var expressControllers = require('express-controller');
var mongoose = require('mongoose');
var router = express.Router();

var BACKBONE_PATH = __dirname + '/../../' + process.env.BACKBONE;
var app = express();
var basic = auth.basic({
	realm: "Orange",
	file: __dirname + "/../../users.htpasswd" 
});  

// Static files
app.use(express.static(BACKBONE_PATH));

// Render engine
app.set('view engine', 'jade');
app.set('views', BACKBONE_PATH + '/templates');
app.set('view options', {
    layout: true
});

// Middle ware + CORS
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cors({
    origin : '*'
}));

// HTACCESS
app.get('*',auth.connect(basic), function(req, res, next) {
    next();
});

app.use('/ressources', express.static(__dirname + '/public'));

app.locals.env = process.env.ENV;

// Router + controllers
app.use(router);
expressControllers
    .setDirectory( __dirname + '/controllers')
    .bind(router);

// Express Server
var Server = require('http').createServer(app);

Server.listen(process.env.PORT || 5000, function(){ 
    console.log("Web App on port : " + process.env.PORT);
});