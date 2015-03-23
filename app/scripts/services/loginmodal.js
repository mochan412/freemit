'use strict';

/**
 * @ngdoc service
 * @name freemitApp.loginModal
 * @description
 * # loginModal
 * Service in the freemitApp.
 */
angular.module('freemitApp')
  .service('loginModal', function ($modal, $rootScope) {
    function assignCurrentUser (user) {
	    $rootScope.currentUser = user;
	    return user;
	  }

	  return function() {
	    var instance = $modal.open({
	      templateUrl: 'views/loginModalTemplate.html',
	      controller: 'LoginModalCtrl',
	      controllerAs: 'LoginModalCtrl'
	    });

	    return instance.result.then(assignCurrentUser);
	  };

  });
