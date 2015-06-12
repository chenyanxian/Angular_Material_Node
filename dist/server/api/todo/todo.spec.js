'use strict';

var should = require('should');
var app = require('../../app');
var request = require('supertest');

var todoInst = {}

var getTodoInst = function(){
  return todoInst;
};

describe('GET /api/todos', function() {
  this.timeout(10000);


  it('should respond with JSON array', function(done) {
    request(app)
      .get('/api/todos')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
});


describe('CREATE /api/todos', function() {
  this.timeout(10000);


  it('should create a todo and return the created document, Paul', function(done) {
    request(app)
        .post('/api/todos')
        .send({'desc':'a new todo item'})
        .expect(201)
        .expect(/_id/)
        .end(function(err, res) {
          if (err) return done(err);

          todoInst = res.body;
          done()

        });
  });
});

describe('UPDATE /api/todos', function() {
  this.timeout(10000);


  it('should update the newly added todos, Paul', function(done) {
    request(app)
        .put('/api/todos/' + todoInst._id)
        .send({'desc':'another new todo item', _id:todoInst._id })
        .expect(200)
        .expect(new RegExp(todoInst._id))
        .end(function(err, res) {
          if (err) return done(err);
          done()

        });
  });
});