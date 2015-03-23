'use strict';

describe('Controller: NewcontrolCtrl', function () {

  // load the controller's module
  beforeEach(module('freemitApp'));

  var NewcontrolCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewcontrolCtrl = $controller('NewcontrolCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
