'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ApisSchema = new Schema({
  apiName:String,
  resource:String,
  tests:String,
  upload:String,
  lastModify:String
});

module.exports = mongoose.model('Apis', ApisSchema);