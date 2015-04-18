'use strict';

describe('Controller: CurrencyCtrl', function () {

  // load the controller's module
  beforeEach(module('freemitApp'));

  var CurrencyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CurrencyCtrl = $controller('CurrencyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
