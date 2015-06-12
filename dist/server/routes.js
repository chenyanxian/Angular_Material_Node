/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  //app.use('/api/',function(req,res,next){
  //  if(req.session.user){
  //    next();
  //  }
  //  else{
  //    //redirect to login
  //  }
  //})

  // Insert routes below
  //app.use('/api/tests', require('./api/tests'));
  //app.use('/api/resources', require('./api/resource'));
  app.use('/api/apiss', require('./api/apis'));
  app.use('/api/todos', require('./api/todo'));
  app.use('/api/projects', require('./api/project'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/serverdatas', require('./api/serverdata'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
