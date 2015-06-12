'use strict';

angular.module('cycloneApp')
    .directive('todoDesc', ['$resource', '$timeout', function ($resource, $timeout) {

        var link = function (scope, element) {
            element.click(function () {
                scope.$apply(function(){
                    scope.todo.isEditing = true;

                });
                $timeout(function () {
                    element.next().focus();
                }, 100);
            });

        };

        return {
            restrict: 'A',
            scope: false,
            link: link
        };


    }]);
