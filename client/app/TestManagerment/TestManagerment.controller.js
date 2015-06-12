'use strict';

angular.module('cycloneApp')
  .controller('TestManagermentCtrl', function ($http,$scope) {

      $http.post('/api/apiss/import',[]).success(function(apis) {

      });

        //var ids = "557694ff6792e011489b7973,557694ff6792e011489b7974,557694ff6792e011489b7975";
        var ids = "5576952f4d521d1e480413c5,5576952f4d521d1e480413c6,5576952f4d521d1e480413c7";
        $http.post("/api/apiss/batchDelete",{ids:ids}).success(function(d){
            console.log(d);
        })
  });
