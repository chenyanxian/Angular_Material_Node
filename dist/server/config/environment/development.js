'use strict';

var url = require("url");

// Development specific configuration
// ==================================
module.exports = {
    // MongoDB connection options
    mongo: {
        uri: 'mongodb://' + (!!process.env.MONGODB_PORT ? url.parse(process.env.MONGODB_PORT).host : 'localhost') + '/cyclone-dev'
    },

    seedDB: true
};
