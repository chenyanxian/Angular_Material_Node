'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResourceSchema = new Schema({
    path: String,
    description: String
});

module.exports = mongoose.model('Resource', ResourceSchema);