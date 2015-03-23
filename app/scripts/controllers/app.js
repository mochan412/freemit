'use strict';

/**
 * @ngdoc function
 * @name freemitApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the freemitApp
 */
angular.module('freemitApp')
  .controller('AppCtrl', function ($scope, USER_ROLES, AuthService) {
    $scope.currentUser = null;
	  $scope.userRoles = USER_ROLES;
	  $scope.isAuthorized = AuthService.isAuthorized;
	 
	  $scope.setCurrentUser = function (user) {
	    $scope.currentUser = user;
	  };
  });
