'use strict';

angular.module('cycloneApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('todo', {
                url: '/todo',
                templateUrl: 'app/todo/todo.html',
                resolve: {
                    todos: function (Todo) {
                        return Todo.query().$promise;
                    }
                },
                controller: 'TodoCtrl'
            });
    })
    .controller('TodoCtrl', function ($scope, $resource, Todo, todos) {
        $scope.data = {};
        $scope.data.todos = todos;

        $scope.$on('todoAdd', function ($event, data) {
            // create
            Todo.save(data, function (res) {
                console.log('item created', res);
                $scope.data.todos.push(res);
            });
        });

        $scope.$on('todoUpdate', function ($event, data) {
            // update
            Todo.update({id: data._id}, data, function (res) {
                console.log('item updated', res);
            });
        });


        $scope.$on('todoDelete', function ($event, data) {
            // delete
            data.$delete(function (res) {
                console.log('item deleted', res);
                _.remove($scope.data.todos, function(item) {
                    return item._id === data._id;
                });
            });
        });


    });
