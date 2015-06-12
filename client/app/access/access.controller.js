'use strict';

angular.module('cycloneApp')
  .controller('AccessCtrl', function ($rootScope,$scope ,$http) {

    var getData = function(){
      $http.get('/api/access').success(function(data) {
          $rootScope.allData = data;
      });
    }
    getData();

        $rootScope.$on("reloadList",function(event,item){
            getData();
        })

    // add
    $scope.accessAdd = function() {
      if($scope.name === '') {
        return;
      }
      $http.post('/api/access', { name: $scope.name, gender: $scope.gender, hobby: $scope.hobby });
      $scope.name = '';
      $scope.gender = '';
      $scope.hobby = '';
      getData();
    };
    //delete
    $scope.deleteData = function(data) {
      $http.delete('/api/access/' + data._id);
      getData();
    };

  })
  .controller('accessEdit',function($rootScope,$scope, $http, $stateParams, $state){  //edit
        $scope.editData = null;
        $scope.isShow= true;

      var id = $stateParams.id;
      $http.get("/api/access/"+id+"").success(function(data){
        $scope.editData = data;
      })


      $scope.save = function(){
        console.log(id);
          var item = {_id:id,name:$scope.editData.name, gender:$scope.editData.gender, hobby:$scope.editData.hobby};

          $http.put("/api/access/"+id+"",item).success(function(d){
            console.log(d);

              $scope.isShow = false;

              $state.go("access");

              //$rootScope.$broadcast("reloadList",null);

              //$http.get('/api/access').success(function(data) {
              //    $rootScope.allData = data;
              //});
        })



      }
  })
