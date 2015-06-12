'use strict';

angular.module('cycloneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('apis', {
        url: '/apis',
        templateUrl: 'app/apis/apis.html',
        controller: 'ApisCtrl'
      })
      .state('apis.level2', {
        url: '/:instanceId',
        views:{
          "@":{
            templateUrl: 'app/apis/apis.level2.html',
            controller: 'ApisLevel2Ctrl'
          }
        }
      })
      .state('apis.level2.document', {
        url: '/document',
        templateUrl: 'app/apis/document.html',
        controller: 'ApiDetailCtrl'
      })
      .state('apis.level2.test', {
        url: '/test',
        templateUrl: 'app/apis/test.html',
        controller: 'ApisCtrl'
      })
      .state('apis.level2.document.detail', {
        url: '/:id',
        templateUrl: 'app/apis/document.detail.html',
        controller: 'ApiDetailCtrl'
      })
      .state('apis.level2.ymal', {
        url: '/ymal',
        templateUrl: 'app/apis/ymal.html',
        controller: 'ApiYmalDetailCtrl'
      })
      .state('apiDetail',{
        url: '/api_detail',
        templateUrl: 'app/apis/api_detail.html',
        controller: 'ApiDetailCtrl'
      });
  });