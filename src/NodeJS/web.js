var path = require('path'),
    BACKBONE_PATH = path.join(__dirname, '/../../', process.env.BACKBONE),
    express = require('express'),
    fs = require('fs'),
    cors = require('cors'),
    auth = require('http-auth'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose'),
    express_port = process.env.PORT == undefined ? 5000 : process.env.PORT;
    app = express(),
    router = express.Router();

app.use(express.static(BACKBONE_PATH));
app.set('view engine', 'jade');
app.set('views', path.join(BACKBONE_PATH, "/templates"));
app.set('view options', {
    layout: true
});
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(cors({
    origin : '*'
}));
app.use('/ressources', express.static(path.join(__dirname, '/public')));
app.use(require('./controllers'))

Server = require('http').createServer(app);
Server.listen(express_port, function(){ 
    console.log("Web App on port : " + express_port);
});