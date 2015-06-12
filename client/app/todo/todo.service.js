'use strict';

angular.module('cycloneApp')
    .factory('Todo', function ($resource) {
        return $resource('/api/todos/:id',
            { id: '@_id' },
            { update: {method:'PUT', params: {id: '@_id'}}}
        );
    });
