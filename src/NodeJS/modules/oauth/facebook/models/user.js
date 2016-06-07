var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    name: { type: String }
}, { strict: false } );

module.exports = mongoose.model('FB_Oauth_User', model);