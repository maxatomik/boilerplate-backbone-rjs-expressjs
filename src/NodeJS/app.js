var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors({
    origin : '*'
}));
mongo_express = require('mongo-express/middleware');

mongo_express_config = require(__dirname+'/db/config.js')

app.use('/app/admin', mongo_express(mongo_express_config))

app.use('/api/v1', require('express-mongo-rest')('mongodb://'+process.env.ME_CONFIG_MONGODB_SERVER+':'+process.env.ME_CONFIG_MONGODB_PORT+'/'+process.env.ME_CONFIG_MONGODB_DATABASE))

var monk = require('monk');
var db = require('monk')('mongodb://'+process.env.ME_CONFIG_MONGODB_SERVER+':'+process.env.ME_CONFIG_MONGODB_PORT+'/mybdd');


/*Custom Models*/
var Posts = db.get('s_posts');
var Users = db.get('s_users');
var Errors = db.get('s_errors');


Server = require('http').createServer(app);
Server.listen(process.env.PORT, function(){ 
    console.log("Application & services on port : " + process.env.PORT);
});

	


