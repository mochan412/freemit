'use strict';

/**
 * @ngdoc function
 * @name freemitApp.controller:LoginmodalCtrl
 * @description
 * # LoginmodalCtrl
 * Controller of the freemitApp
 */
angular.module('freemitApp')
  .controller('LoginmodalCtrl', function ($scope, $modal, UsersApi) {

    this.cancel = $scope.$dismiss;

	  this.submit = function (email, password) {
	    UsersApi.login(email, password).then(function (user) {
	      $scope.$close(user);
	    });
	  };
  });
