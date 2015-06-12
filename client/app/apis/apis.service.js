'use strict';

angular.module('cycloneApp')
  .factory('apis', function () {
    // Service logic
    // ...

    var gridHeaderArray = [
      {header: 'check_box', columnStyle: 'checkbox'},
      {header: "API NAME", property: "apiName", columnStyle:"name" ,isDefaultSortColumn: true},
      {header: "RESOURCE", property: "resource", columnStyle:""},
      {header: "TESTS", property: "tests", columnStyle:""},
      {header: "UPLOAD", property: "upload", columnStyle:""},
      {header: "LAST MODIFIED", property: "lastModify", columnStyle:""}
    ]
    var toReturn = {
      gridHeaderArray: gridHeaderArray
    }

    return toReturn;
  });
