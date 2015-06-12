'use strict';

angular.module('cycloneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('access', {
        url: '/access',
        templateUrl: 'app/access/access.html',
        controller: 'AccessCtrl'
      })
      //.state("access.edit",{
      //  url:'/edit/{id}',
      //  templateUrl:"app/access/edit.html",
      //  controller:"accessEdit"
      //})
        .state("editAccess",{
          url:'/edit/{id}',
          templateUrl:"app/access/edit.html",
          controller:"accessEdit"
        })
  });