BACKBONE_PATH = __dirname + '/../../' + process.env.BACKBONE;
BACKBONE_CONFIG_PATH = BACKBONE_PATH + '/../config';
MONGODB_SESSIONS_PATH = 'mongodb://'+process.env.ME_CONFIG_MONGODB_SERVER+':'+process.env.ME_CONFIG_MONGODB_PORT+'/'+process.env.MONGODB_SESSION_STORE;
var express = require('express');
var fs = require('fs');
var cors = require('cors');
var exec = require('child_process').exec;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

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


mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.ME_CONFIG_MONGODB_SERVER+':'+process.env.ME_CONFIG_MONGODB_PORT+'/'+process.env.ME_CONFIG_MONGODB_DATABASE)

/* SESSIONS STORE */
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true, 
    saveUninitialized: true,
    secret:'marcel'
}));


/*Express Routes*/
var pageContent = { layout : true };
app.locals.env = process.env.ENV;
app.get('*', function (req, res, next) {
    pageContent.session = req.session;
    pageContent.layout = req.query.layout;
    next();
});
require('./router/routes')(app, pageContent);

/*Express Server*/
Server = require('http').createServer(app);
Server.listen(process.env.PORT, function(){ 
    console.log("Web App on port : " + process.env.PORT);
});