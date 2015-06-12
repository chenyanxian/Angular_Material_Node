'use strict';

var express = require('express');
var controller = require('./todo.controller');

var router = express.Router();

var middle = require('./middle')

router.use('/',  middle.create.validate);

router.get('/', controller.index);
router.get('/detail', controller.show);
//router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.param('id', controller.load);

module.exports = router;
