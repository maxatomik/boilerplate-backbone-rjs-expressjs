// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var schema = new Schema({ strict: false });

module.exports = mongoose.model('User', schema);