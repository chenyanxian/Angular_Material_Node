'use strict';

describe('Service: apis', function () {

  // load the service's module
  beforeEach(module('cycloneApp'));

  // instantiate service
  var apis;
  beforeEach(inject(function (_apis_) {
    apis = _apis_;
  }));

  it('should do something', function () {
    expect(!!apis).toBe(true);
  });

});
