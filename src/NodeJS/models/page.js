// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
var schema = new Schema({
    name: { type: String }
});

module.exports = mongoose.model('Page', schema);