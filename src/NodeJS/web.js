'use strict';

var path = require('path'),
    express = require('express'),
    fs = require('fs'),
    cors = require('cors'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    mongoose = require('mongoose'),
    app = express(),
    jsonfile = require('jsonfile');


var BACKBONE_PATH = path.join(__dirname, '/../../', process.env.BACKBONE),
    EXPRESS_PORT = process.env.PORT == undefined ? 5000 : process.env.PORT,
    DATA = JSON.parse(fs.readFileSync(path.join(__dirname, "db/collection.json"), 'utf8'));

mongoose.connect(process.env.MONGOLAB_URI);
app.use(session({
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: true, 
  saveUninitialized: true,
  secret:'marcel'
}));

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
app.use(require('./controllers')(DATA))


app.use(require('./modules/oauth/twitter/app')(require('./models')));
app.use(require('./modules/bots/twitter/app')(require('./models')));
//app.use(require('./modules/oauth/facebook')(require('./models')));

app.post('/edit', function(req, res) {
    var file = path.join(__dirname, 'db/collection.json');
    jsonfile.readFile(file, function(err, obj) {
        obj['/page/contact'][req.body.id] = req.body.value
        jsonfile.writeFile(file, obj, { spaces:2 },function(){
            res.send('ok');
        })
    })
});

var Server = require('http').createServer(app);
Server.listen(EXPRESS_PORT, function(){ 
    console.log("Web App on port : " + EXPRESS_PORT);
});