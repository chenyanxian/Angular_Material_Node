'use strict';

var _ = require('lodash');
var Apis = require('./apis.model');
var Resource = require('../resource/resource.model');
var Tests = require('../tests/tests.model');

var Q = require('Q');

// Get list of apiss
exports.index = function(req, res) {
  Apis.find(function (err, apiss) {
    if(err) { return handleError(res, err); }
    return res.json(200, apiss);
  });
};

// Get a single apis
exports.show = function(req, res) {
  Apis.findById(req.params.id, function (err, apis) {
    if(err) { return handleError(res, err); }
    if(!apis) { return res.send(404); }
    return res.json(apis);
  });
};

// Creates a new apis in the DB.
exports.create = function(req, res) {
  Apis.create(req.body, function(err, apis) {
    if(err) { return handleError(res, err); }
    return res.json(201, apis);
  });
};

// Updates an existing apis in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Apis.findById(req.params.id, function (err, apis) {
    if (err) { return handleError(res, err); }
    if(!apis) { return res.send(404); }
    var updated = _.merge(apis, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, apis);
    });
  });
};

// Deletes a apis from the DB.
exports.destroy = function(req, res) {
  Apis.findById(req.params.id, function (err, apis) {
    if(err) { return handleError(res, err); }
    if(!apis) { return res.send(404); }
    apis.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.import = function(req,res){

  //var deferred = Q.defer();

  var params = req.body;
  var d = new dataFactory(params);

  var apis = d.getAPIS();
  var ress = d.getResources();
  var tests = d.getTests();

  var resPromises = createRes(res,ress);
  var testPromises = createTest(res,tests);

  Q.all([resPromises,testPromises]).then(function(d){
    var resIds = [];
    var testIds = [];
    var dr = d[0];
    var dt = d[1];
    for(var i=0;i<dr.length;i++){
      resIds.push(dr[i]._id);
    }
    for(var i=0;i<dt.length;i++){
      testIds.push(dt[i]._id);
    }

    var result = convertAPISData(apis,resIds,testIds);

    Apis.collection.insert(result,function(err,apis){
      //deferred.resolve(resource);
    })
  })

  return res.json(200);
}

exports.batchDelete = function(req,res){
  console.log(req.body);
  var ids = req.body.ids;
  if(ids == ""){
    return res.json(200,{msg:"Please choose one item!"});
  }
  //one item need to delete
  if(ids.indexOf(',') == -1){
    Apis.find({ _id:ids }).remove(function(){
      return res.json(200,{isSuccess:true,msg:"Delete item is OK!"});
    } );
  }
  else{
    var idArr = ids.split(',');
    for(var i =0;i<idArr.length;i++){
      var query = Apis.remove({ _id: idArr[i] });
      query.exec(function(){
        return res.json(200,{isSuccess:true,msg:"Delete items is OK!"});
      });
    }
  }
}

function convertAPISData(apis,ress,tests){
  var result = [];
  for(var i = 0;i<apis.length;i++){
    var _d = {apiName:apis[i].apiName,upload:apis[i].upload,lastModify:apis[i].lastModify,resource:ress[i],tests:tests[i]};
    result.push(_d);
  }
  return result;
}

function createRes(res,ress){
  var deferred = Q.defer();

  Resource.collection.insert(ress,function(err,resource){
    deferred.resolve(resource);
  })
  return deferred.promise;
}

function createTest(res,tests){
  var deferred = Q.defer();

  Tests.collection.insert(tests,function(err,tests){
    deferred.resolve(tests);
  })
  return deferred.promise;
}


/*
  we found a better way to insert array(the same type model)
  don't need deal the promises
*/
//function insertResource(res,ress){
//  var promises = [];
//  for(var i=0;i<ress.length;i++){
//    promises.push(createRes(res,ress[i]));
//  }
//  return promises;
//}
//
//function insertTest(res,tests){
//  var promises = [];
//  for(var i=0;i<tests.length;i++){
//    promises.push(createTest(res,tests[i]));
//  }
//  return promises;
//}

function dataFactory(json){
  this.getAPIS = function(){
    var apis = [
      {apiName:"api1",upload:"upload1",lastModify:"last1"},
      {apiName:"api2",upload:"upload1",lastModify:"last1"},
      {apiName:"api3",upload:"upload1",lastModify:"last1"},
      {apiName:"api4",upload:"upload1",lastModify:"last1"},
      {apiName:"api5",upload:"upload1",lastModify:"last1"}
    ];
    return apis;
  }

  this.getResources = function(){
    var res = [
        //[{"path":"/aaaa","description":"BW Agent Operations"},{"path":"/aaaa","description":"BW Agent Operations"}],
        {"path":"/aaaa","description":"Information about machines in the enterprise"},
        {"path":"/aaaa","description":"Information about Installation in the enterprise"},
        {"path":"/aaaa","description":"AppNode operations"},
        {"path":"/aaaa","description":"AppNode operations"},
        {"path":"/aaaa","description":"Archive operations"}];
    return res;
  }

  this.getTests = function(){
    var res = [
      {"path":"/bbbb","description":"BW Agent Operations"},
      {"path":"/bbbb","description":"Information about machines in the enterprise"},
      {"path":"/bbbb","description":"Information about Installation in the enterprise"},
      {"path":"/bbbb","description":"AppNode operations"},
      {"path":"/bbbb","description":"Archive operations"}];
    return res;
  }
}

function handleError(res, err) {
  return res.send(500, err);
}