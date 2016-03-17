var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({
    origin : '*'
}));

mongo_express = require('mongo-express/middleware');

mongo_express_config = require(__dirname+'/db/config.js')
rest_config = require(__dirname+'/db/rest.js')

app.use('/app/admin', mongo_express(mongo_express_config))

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongodbRest = require('mongodb-rest/server.js');

mongoose = require('mongoose');
mongoose.connect('mongodb://'+process.env.ME_CONFIG_MONGODB_SERVER+':'+process.env.ME_CONFIG_MONGODB_PORT+'/'+process.env.ME_CONFIG_MONGODB_DATABASE)

/* SESSIONS STORE */
app.use(session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true, 
    saveUninitialized: true,
    secret:'marcel'
}));

/* REST API */
mongodbRest.startServer(rest_config.withAuth);


/*Express Server*/
Server = require('http').createServer(app);
Server.listen(process.env.PORT, function(){ 
    console.log("Application & services on port : " + process.env.PORT);
});

    


