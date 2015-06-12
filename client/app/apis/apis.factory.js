/**
 * Created by jiawenlong on 5/27/15.
 */
angular.module('cycloneApp')
  .factory('apisFactory', function () {
    var gridHeaderArray = [
      {header: "API NAME", property: "apiName", isDefaultSortColumn: true},
      {header: "RESOURCE", property: "resource"},
      {header: "UPLOAD", property: "upload"},
      {header: "LAST MODIFIED", property: "lastModify"}
    ]
    var toReturn = {
      gridHeaderArray: gridHeaderArray
    }

    return toReturn;
  });
