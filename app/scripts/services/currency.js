'use strict';

/**
 * @ngdoc service
 * @name freemitApp.currencyFactory
 * @description
 * # currencyFactory
 * Factory in the freemitApp.
 */
angular.module('freemitApp')
  .service('currencyService', ['$http', function ($http) {
    
    var urlBase = 'http://freeportmobile.com:8080';


    this.getRatio = function (start, end) {
      var url = urlBase+'/factor?pair='+start+end;
      $.ajax({
        url: url,
        type: 'GET',
        async: false,
        crossDomain: true,
        success: function (data) {
          return data.factor;
        },
        error: function(e) {
          console.log('currency service error');
        }
      });
    };
  }]);
