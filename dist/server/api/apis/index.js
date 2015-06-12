'use strict';

var express = require('express');
var controller = require('./apis.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.post('/import',controller.import);
router.post('/batchDelete',controller.batchDelete);

module.exports = router;