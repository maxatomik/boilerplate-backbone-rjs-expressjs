var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    _json: { type: Object }
}, { strict: true } );

module.exports = mongoose.model('TW_Bot_User', model);