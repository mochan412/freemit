'use strict';

describe('Service: currencyFactory', function () {

  // load the service's module
  beforeEach(module('freemitApp'));

  // instantiate service
  var currencyFactory;
  beforeEach(inject(function (_currencyFactory_) {
    currencyFactory = _currencyFactory_;
  }));

  it('should do something', function () {
    expect(!!currencyFactory).toBe(true);
  });

});
