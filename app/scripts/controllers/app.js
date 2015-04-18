'use strict';

/**
 * @ngdoc function
 * @name freemitApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the freemitApp
 */
angular.module('freemitApp')
  .controller('AppCtrl', function ($scope, $rootScope) {	 
		$rootScope.userCurrency = 'USD';
		$rootScope.targetCurrency = 'EUR';
  });
