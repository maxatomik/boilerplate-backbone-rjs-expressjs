var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    screen_name: { type: String }
}, { strict: false } );

module.exports = mongoose.model('FB_Oauth_User', model);