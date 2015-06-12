'use strict';

angular.module('cycloneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('TestManagerment', {
        url: '/TestManagerment',
        templateUrl: 'app/TestManagerment/TestManagerment.html',
        controller: 'TestManagermentCtrl'
      });
  });