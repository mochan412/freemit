'use strict';

describe('Controller: SendingCtrl', function () {

  // load the controller's module
  beforeEach(module('freemitApp'));

  var SendingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SendingCtrl = $controller('SendingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
