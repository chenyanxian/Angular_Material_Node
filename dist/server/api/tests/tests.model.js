'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TestsSchema = new Schema({
    path: String,
    description: String
});

module.exports = mongoose.model('Tests', TestsSchema);