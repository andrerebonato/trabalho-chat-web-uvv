var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    content: { type: String, required: true },
    user: { type: String },
    date: { type: String },
    userName: { type: String }
});

module.exports = mongoose.model('Message', schema);