'use strict';

describe('Controller: FundingCtrl', function () {

  // load the controller's module
  beforeEach(module('freemitApp'));

  var FundingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FundingCtrl = $controller('FundingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
