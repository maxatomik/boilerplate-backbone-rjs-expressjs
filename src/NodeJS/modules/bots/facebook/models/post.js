var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({}, { strict: false } );
module.exports = mongoose.model('FB_Bot_Post', model);