'use strict';

describe('Controller: ApisCtrl', function () {

  // load the controller's module
  beforeEach(module('cycloneApp'));

  var ApisCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ApisCtrl = $controller('ApisCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
