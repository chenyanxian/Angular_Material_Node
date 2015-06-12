'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ResourcedetaildataSchema = new Schema({
  resourcename: String,
  resourcedetaildata: [
    {
      path:String,
      operations:[
        {
          method:String,
          summary:String,
          parameters:[{
              name: String,
              description: String,
              required: Boolean,
              valueType:String,
              paramType: String
          }],
          responseMessages:[
            {
              code: Number,
              message: String
            }
          ]
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Resourcedetaildata', ResourcedetaildataSchema);
