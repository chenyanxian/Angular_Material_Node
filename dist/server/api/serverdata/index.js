'use strict';

var express = require('express');
var controller = require('./serverdata.controller');

var router = express.Router();
router.get('/', controller.apis);
router.get('/resourcedetail', controller.resourcedetail);

module.exports = router;
