'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  desc: String,
  isDone: Boolean,
  createdDate: Date
});

module.exports = mongoose.model('Todo', TodoSchema);