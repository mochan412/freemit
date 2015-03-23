'use strict';

/**
 * @ngdoc service
 * @name freemitApp.Session
 * @description
 * # Session
 * Service in the freemitApp.
 */
angular.module('freemitApp')
  .service('Session', function () {
    this.create = function (sessionId, userId, userRole) {
	    this.id = sessionId;
	    this.userId = userId;
	    this.userRole = userRole;
	  };
	  this.destroy = function () {
	    this.id = null;
	    this.userId = null;
	    this.userRole = null;
	  };
  });
