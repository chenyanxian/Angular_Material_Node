'use strict';

var _ = require('lodash');
var Tests = require('./tests.model');

// Get list of testss
exports.index = function(req, res) {
  Tests.find(function (err, testss) {
    if(err) { return handleError(res, err); }
    return res.json(200, testss);
  });
};

// Get a single tests
exports.show = function(req, res) {
  Tests.findById(req.params.id, function (err, tests) {
    if(err) { return handleError(res, err); }
    if(!tests) { return res.send(404); }
    return res.json(tests);
  });
};

// Creates a new tests in the DB.
exports.create = function(req, res) {
  Tests.create(req.body, function(err, tests) {
    if(err) { return handleError(res, err); }
    return res.json(201, tests);
  });
};

// Updates an existing tests in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Tests.findById(req.params.id, function (err, tests) {
    if (err) { return handleError(res, err); }
    if(!tests) { return res.send(404); }
    var updated = _.merge(tests, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, tests);
    });
  });
};

// Deletes a tests from the DB.
exports.destroy = function(req, res) {
  Tests.findById(req.params.id, function (err, tests) {
    if(err) { return handleError(res, err); }
    if(!tests) { return res.send(404); }
    tests.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}