'use strict';

var _ = require('lodash');
var Serverdata = require('./serverdata.model');
var Resourcedetaildata = require('./resourcedetaildata.model');
var Resourcedetail =require('./resourcedetail.model');
var http = require('http');
var flag = false;

// Get list of serverdatas
exports.apis = function(req,res){
  if(!flag){
    importAPIS(res);
  }else{
    Serverdata.find(function (err, ress) {
      if(err) { return handleError(res, err); }
      return res.json(200, ress);
    });
  }
}
exports.resourcedetail = function(req,res){
    Resourcedetaildata.find(function (err, ress) {
      if(err) { return handleError(res, err); }
      return res.json(200, ress);
    });
}
function importAPIS(res){
  http.get('http://www.baidu.com',function(data){
    data = {"Version":"1.0.0","swaggerVersion":"1.2","apis":[{"path":"/agents","description":"BW Agent Operations"},{"path":"/machines","description":"Information about machines in the enterprise"},{"path":"/installations","description":"Information about Installation in the enterprise"},{"path":"/domains/{domain}/appspaces/{appspace}/appnodes","description":"AppNode operations"},{"path":"/domains/{domain}/archives","description":"Archive operations"},{"path":"/domains/{domain}/appspaces/{appspace}/appnodes/{appnode}/engine","description":"BWEngine operations"},{"path":"/browse","description":"Returns a collection of resources"},{"path":"/domains/{domain}/appspaces","description":"AppSpace operations"},{"path":"/icons","description":"Operations to obtain resources like Icons associated with BW Activities"},{"path":"/domains/{domain}/appspaces/{appspace}/applications","description":"Application operations"},{"path":"/domains","description":"Domain Operations."}],"info":{"title":"","description":"BW REST API Documentation","termsOfServiceUrl":"http://www.tibco.com","contact":"support@tibco.com","license":"See license agreement.","licenseUrl":"http://www.tibco.com"}};
    var dataModel = {};
    var updateTime = new Date();
    var nowTime = updateTime.toLocaleString();

    createDetailData(res,data);
    flag = true;
    dataModel.apis_name = data.info.title || 'Tibco BusnessWork';
    dataModel.resources_length = data.apis.length;
    dataModel.tests = 0;
    dataModel.uploaded = nowTime;
    dataModel.last_modified = nowTime;
    dataModel.resouces = data.apis;
    Serverdata.create(dataModel, function(err, serverdata) {
      if(err) { return handleError(res, err); }
      return res.json(201, serverdata);
    });

  })
}
function createDetailData(res,data){
  var resourceList = [];
  for(var k= 0,len = data.apis.length;k<1;k++){
    //http.get('http://localhost:5555/api/'+data.apis[k].path,function(res){
    http.get('http://www.baidu.com',function(resData){
      resData = {"Version":"1.0.0","swaggerVersion":"1.2","basePath":"http://localhost:5555/api","resourcePath":"/agents","produces":["application/json"],"apis":[{"path":"/agents/registerteaagent","operations":[{"method":"PUT","summary":"Register a BW Agent as TEA Agent with a TEA server.","notes":"","type":"void","nickname":"registerteaagent","authorizations":{},"parameters":[{"name":"name","description":"Name of the BW agent","required":true,"type":"string","paramType":"query"},{"name":"teaURL","description":"Encoded TEA Server URL","required":true,"type":"string","paramType":"query"}],"responseMessages":[{"code":404,"message":"No agent with the given name found"},{"code":400,"message":"Bad Request. One or multiple of the arguments in the query are invalid"},{"code":500,"message":"Internal Server Error"}]}]},{"path":"/agents/info","operations":[{"method":"GET","summary":"Get information about the BusinessWorks Agent","notes":"Provide information about the bwagent that is receiving the request.","type":"array","items":{"$ref":"Agent"},"nickname":"getInfo","authorizations":{},"parameters":[],"responseMessages":[{"code":500,"message":"Internal Server Error"}]}]},{"path":"/agents/{name}","operations":[{"method":"DELETE","summary":"Remove all references to a specific BW agent.","notes":"This removes the agent from the agent network. This operation cannot be used to remove the agent it is connected to and requires the agent to be stopped.","type":"void","nickname":"delete","authorizations":{},"parameters":[{"name":"name","description":"Name of the BW agent","required":true,"type":"string","paramType":"path"},{"name":"force","description":"If true, the agent is removed even if it has domain entities","defaultValue":"false","required":false,"type":"boolean","paramType":"query"}],"responseMessages":[{"code":404,"message":"No agent with the given name found"},{"code":400,"message":"The request cannot be executed with the given parameters, e.g. the agent has domain entities or is currently running."},{"code":500,"message":"Internal Server Error"}]}]},{"path":"/agents/processinfo","operations":[{"method":"GET","summary":"Get information about the system process of BusinessWorks Agent ","notes":"Provide information about the system process of bwagent that is receiving the request.","type":"SystemProcessInfo","nickname":"getProcessInfo","authorizations":{},"parameters":[],"responseMessages":[{"code":500,"message":"Internal Server Error"}]}]}],"models":{"SystemProcessInfo":{"id":"SystemProcessInfo","properties":{"systemProcessId":{"type":"integer","format":"int64"},"activeThreadCount":{"type":"integer","format":"int64"},"totalMemoryInBytes":{"type":"integer","format":"int64"},"freeMemoryInBytes":{"type":"integer","format":"int64"},"usedMemoryInBytes":{"type":"integer","format":"int64"},"percentMemoryUsed":{"type":"number","format":"double"},"percentCpuUsed":{"type":"number","format":"double"},"upSince":{"type":"integer","format":"int64"}}},"Agent":{"id":"Agent","properties":{"name":{"type":"string"},"description":{"type":"string"},"httpHost":{"type":"string"},"httpPort":{"type":"integer","format":"int32"},"internalPort":{"type":"integer","format":"int32"},"pid":{"type":"string"},"adminMode":{"type":"string"},"machineName":{"type":"string"},"tibcoHome":{"type":"string"},"version":{"type":"string"},"configState":{"$ref":"AgentConfigStates","enum":["InSync","OutOfSync"]},"uptime":{"type":"integer","format":"int64"},"state":{"$ref":"AgentStates","enum":["Unreachable","Running"]},"installationName":{"type":"string"},"configMap":{"$ref":"Map[string,Object]"}}}}}
      var dataModel = {};
      dataModel.resourcedetaildata = cloneResourceDetail(resData.apis);
      dataModel.resourcename = resData.resourcePath;
      Resourcedetaildata.create(dataModel, function(err, datas) {
        if(err) { return handleError(res, err); }
      });
    })
  }

}
function cloneResourceDetail(obj) {
  var clone = [];

  for(var i in obj) {
      if(typeof(obj[i])=="object" && obj[i] != null)
        clone[i] = cloneResourceDetail(obj[i]);
      else{
        if(i === 'type'){
          clone['valueType'] = obj[i];
        }else{
          clone[i] = obj[i];
        }
      }
  }
  return clone;
}

var modelsMock = {a:1}
var parametersMock = {};
var finalReturnMock = {};


var APISUtils = {
  convertData:function(data){
    var apis = data.apis;
    console.log(apis.length);
    for(var i =0;i<apis.length;i++){

      var operations = apis[i].operations;
      console.log(operations.length);
      for(var k = 0;k< operations.length;k++){
        operations[k].request = {
          parameters:operations[k].parameters,
          models:null
        };

        delete operations[k].parameters;

        if(operations[k].type == "void"){
          operations[k].response = null;
        }
        else if(operations[k].type == "array" && operations[k].items != null){
          var moduleName = operations[k].items["$ref"];
          operations[k].response = data.models[moduleName]?data.models[moduleName]:null;
        }else{
          var moduleName =operations[k].type;
          operations[k].response = data.models[moduleName]?data.models[moduleName]:null;
        }
      }
    }
    return data;
  }
}

function handleError(res, err) {
  return res.send(500, err);
}


