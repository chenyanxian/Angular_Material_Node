'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ServerdataSchema = new Schema({
  apis_name: String,
  resources: Number,
  tests: Number,
  uploaded: String,
  last_modified: String,
  resources_length:String,
  resouces:[
    {
      path:String,
      description:String
    }
  ]
});

module.exports = mongoose.model('Serverdata', ServerdataSchema);
