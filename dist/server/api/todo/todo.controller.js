'use strict';

var _ = require('lodash');
var Todo = require('./todo.model');

// Get list of todos
exports.index = function (req, res) {
  var data = {"apis":[{"path":"/agents","description":"BW Agent Operations"},{"path":"/machines","description":"Information about machines in the enterprise"},{"path":"/installations","description":"Information about Installation in the enterprise"},{"path":"/domains/{domain}/appspaces/{appspace}/appnodes","description":"AppNode operations"},{"path":"/domains/{domain}/archives","description":"Archive operations"},{"path":"/domains/{domain}/appspaces/{appspace}/appnodes/{appnode}/engine","description":"BWEngine operations"},{"path":"/browse","description":"Returns a collection of resources"},{"path":"/domains/{domain}/appspaces","description":"AppSpace operations"},{"path":"/icons","description":"Operations to obtain resources like Icons associated with BW Activities"},{"path":"/domains/{domain}/appspaces/{appspace}/applications","description":"Application operations"},{"path":"/domains","description":"Domain Operations."}]};

  return res.json(200,data);
    //Todo.find(function (err, todos) {
    //    if (err) {
    //        return handleError(res, err);
    //    }
    //    return res.json(200, todos);
    //});
};

// Get a single todo
exports.show = function (req, res) {
  var data = {"apisDetails":[{"path":"/agents/registerteaagent","operations":[{"method":"PUT","summary":"Register a BW Agent as TEA Agent with a TEA server.","parameters":[{"name":"name","description":"Name of the BW agent","required":true,"type":"string","paramType":"query"},{"name":"teaURL","description":"Encoded TEA Server URL","required":true,"type":"string","paramType":"query"}],"responseMessages":[{"code":404,"message":"No agent with the given name found"},{"code":400,"message":"Bad Request. One or multiple of the arguments in the query are invalid"},{"code":500,"message":"Internal Server Error"}]}]},{"path":"/agents/info","operations":[{"method":"GET","summary":"Get information about the BusinessWorks Agent","parameters":[],"responseMessages":[{"code":500,"message":"Internal Server Error"}]}]},{"path":"/agents/{name}","operations":[{"method":"DELETE","summary":"Remove all references to a specific BW agent.","parameters":[{"name":"name","description":"Name of the BW agent","required":true,"type":"string","paramType":"path"},{"name":"force","description":"If true, the agent is removed even if it has domain entities","defaultValue":"false","required":false,"type":"boolean","paramType":"query"}],"responseMessages":[{"code":404,"message":"No agent with the given name found"},{"code":400,"message":"The request cannot be executed with the given parameters, e.g. the agent has domain entities or is currently running."},{"code":500,"message":"Internal Server Error"}]}]},{"path":"/agents/processinfo","operations":[{"method":"GET","summary":"Get information about the system process of BusinessWorks Agent ","parameters":[],"responseMessages":[{"code":500,"message":"Internal Server Error"}]}]}]}

  return res.json(200,data);
    //return res.json(req.todo);
};

// Creates a new todo in the DB.
exports.create = function (req, res) {
    Todo.create(req.body, function (err, todo) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, todo);
    });
};

// Updates an existing todo in the DB.
exports.update = function (req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    var updated = _.merge(req.todo, req.body);
    updated.save(function (err, newTodo) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(200, newTodo);
    });
};

// Deletes a todo from the DB.
exports.destroy = function (req, res) {
    req.todo.remove(function (err) {
        if (err) {
            return handleError(res, err);
        }
        return res.send(204);
    });
};

/**
 * Find todo by id
 */
exports.load = function(req, res, next, id) {
    Todo.findById(id, function(err, todo) {
        if (err) return next(err);
        if (!todo) return next(new Error('Failed to load todo by id ' + id));
        req.todo = todo;
        next();
    });
};



function handleError(res, err) {
    return res.send(500, err);
}
