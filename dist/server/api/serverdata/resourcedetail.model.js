'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ResourcedetailSchema = new Schema({
  resourceName: String,
  resourcedetail: [
    {
      path:String,
      operations:[
        {
          method:String,
          summary:String,
          request:
            {
              parameters:[{
                name: String,
                description: String,
                required: Boolean,
                valueType:String,
                paramType: String
              }],
              models:String
            } ,
          response:String,
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

module.exports = mongoose.model('Resourcedetail', ResourcedetailSchema);
