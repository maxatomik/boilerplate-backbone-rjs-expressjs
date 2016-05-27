var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    username: { type: String }
}, { strict: false } );

module.exports = mongoose.model('FB_Bot_User', model);