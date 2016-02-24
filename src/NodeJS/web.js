BACKBONE_PATH = __dirname + '/../../' + process.env.BACKBONE;
BACKBONE_CONFIG_PATH = BACKBONE_PATH + '/../config';
MONGODB_SESSIONS_PATH = 'mongodb://'+process.env.ME_CONFIG_MONGODB_SERVER+':'+process.env.ME_CONFIG_MONGODB_PORT+'/'+process.env.MONGODB_SESSION_STORE;
var express = require('express');
var fs = require('fs');
var cors = require('cors');
var exec = require('child_process').exec;
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
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var pageContent = { layout : true };

/* SESSIONS STORE */
app.use(session({
    store: new MongoStore({
      url: MONGODB_SESSIONS_PATH,
      ttl: 14 * 24 * 60 * 60
    }),
    resave: true, 
    saveUninitialized: true,
	secret:'marcel'
}));

app.locals.env = process.env.ENV;

app.get('*', function (req, res, next) {
    pageContent.session = req.session;
    pageContent.layout = req.query.layout;
    next();
});

require('./router')(app, pageContent);

Server = require('http').createServer(app);
Server.listen(process.env.PORT, function(){ 
    console.log("Web App on port : " + process.env.PORT);
});