'use strict';

describe('Controller: TestManagermentCtrl', function () {

  // load the controller's module
  beforeEach(module('cycloneApp'));

  var TestManagermentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestManagermentCtrl = $controller('TestManagermentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
