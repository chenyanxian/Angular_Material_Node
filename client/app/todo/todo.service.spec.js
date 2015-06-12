'use strict';

describe('Service: TodoService', function () {

  // load the controller's module
  beforeEach(module('cycloneApp'));

  var scope, TodoServiceInst;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($rootScope, TodoService) {
    scope = $rootScope.$new();

    TodoServiceInst = TodoService;

  }));

  var todosMock = [{
    _id: 'sdjf923klsd00',
    desc: 'Buy iPhone 7s from Apple store',
    isDone: false,
    createdTime: 1432307375267
  },
    {
      _id: 'sdjf923klsd02',
      desc: 'Buy iPad mini 3 from Apple store',
      isDone: false,
      createdTime: 1432307375299
    },
    {
      _id: 'sdjf923klsd22',
      desc: 'Watch Revenger II',
      isDone: false,
      createdTime: 1432307375499
    }];

  it('should find correct index in todo collection with TodoService.getTodoArrIndexByObjectId, Paul', function () {

    var index = TodoServiceInst.getTodoArrIndexByObjectId(todosMock, {
      _id: 'sdjf923klsd02',
      desc: 'Buy iPad mini 3 from Apple store',
      isDone: false,
      createdTime: 1432307375299
    });

    expect(index).toEqual(1);
  });
});
