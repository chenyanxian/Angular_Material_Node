'use strict';

describe('Controller: AccessCtrl', function () {

  // load the controller's module
  beforeEach(module('cycloneApp'));

  var AccessCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AccessCtrl = $controller('AccessCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
