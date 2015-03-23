'use strict';

/**
 * @ngdoc function
 * @name freemitApp.controller:FundingCtrl
 * @description
 * # FundingCtrl
 * Controller of the freemitApp
 */
angular.module('freemitApp')
  .controller('FundingCtrl', function ($scope) {
    $scope.fundingSource = false;
    $scope.addSource = false;

    $scope.addSourceFunc = function() {
    	$scope.addSource = true;
    };
  });
