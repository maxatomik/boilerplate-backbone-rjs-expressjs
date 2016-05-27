var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    id_str: { type: String },
    text: { type: String }
}, { strict: false } );
module.exports = mongoose.model('TW_Bot_Post', model);