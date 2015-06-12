'use strict';

angular.module('cycloneApp')
  .controller('ApisCtrl', function ($rootScope,$scope,apis,$http,$timeout) {
    $scope.gridHeader = apis.gridHeaderArray;
    $scope.bwGridSelectAll = false;

    $http.get('/api/apiss/').success(function(apis) {
      $scope.gridRow = apis;
      $scope.gridRow.forEach(function(row){
        row.gridRowSelectedProperty=false;
      })
    });
  })
  .controller('ApisLevel2Ctrl', function($scope,$http,$stateParams) {
    $http.get('/api/apiss/').success(function(apis) {
      var id = $stateParams.instanceId;
      apis.forEach(function(item,i){
        if(item._id === id){
          $scope.itemName = item.apiName;
        }
      })
    });

  })
  .controller('ApiDetailCtrl', function($scope,$http,ApiDataConfig) {
    //todo
    $scope.apiParamHeader = ApiDataConfig.apiParamHeader;
    $scope.apiResponseHeader = ApiDataConfig.apiResponseHeader;

    var getData = function(){

      $http.get('/api/serverdatas').success(function(listData) {
        $scope.resourceList = listData[0];
        $http.get('/api/serverdatas/resourcedetail').success(function(data) {
          $scope.ApiDetailData = data[0].resourcedetaildata;
          console.log($scope.ApiDetailData);
        });
      });
    }
    getData();
    $scope.expand_method = function(){

    }
  })
  .controller('ApiYmalDetailCtrl', function($scope,$http,ApiDataConfig) {
    $scope.aceLoaded = function(_editor) {
      // Options
      _editor.setReadOnly(true);
    };

    $scope.aceChanged = function(e) {
      //
    };
  })

  .factory('ApiDataConfig', function(){
    var  apiParamHeader = [
      {header: 'DESCRIPTION', property:"description"},
      {header: "NAME", property: "name"},
      {header: "PARAMETER TYPE", property: "paramtype"},
      {header: "REQUIRED", property: "required"},
      {header: "TYPE", property: "type"}
    ];
    var  apiResponseHeader = [
      {header: 'CODE', property:"code"},
      {header: "MESSAGE", property: "message"}
    ];
    var toReturn = {
      apiParamHeader: apiParamHeader,
      apiResponseHeader: apiResponseHeader


    }
    return toReturn;
  })
