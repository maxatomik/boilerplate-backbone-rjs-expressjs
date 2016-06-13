var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    _json: { type: Object }
}, { strict: true } );

module.exports = mongoose.model('FB_Oauth_User', model);