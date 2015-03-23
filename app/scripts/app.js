'use strict';

/**
* @ngdoc overview
* @name freemitApp
* @description
* # freemitApp
*
* Main module of the application.
*/
angular
	.module('freemitApp', [
		'ngAnimate',
		'toaster',
		'ngCookies',
		'ngResource',
		'ui.router',
		'ui.bootstrap',
		'ngSanitize',
		'ngTouch'
	])
	.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
	  loginFailed: 'auth-login-failed',
	  logoutSuccess: 'auth-logout-success',
	  sessionTimeout: 'auth-session-timeout',
	  notAuthenticated: 'auth-not-authenticated',
	  notAuthorized: 'auth-not-authorized'
  })
  .constant('USER_ROLES', {
	  all: '*',
	  admin: 'admin',
	  editor: 'editor',
	  guest: 'guest'
	})
	.config(function ($stateProvider, $urlRouterProvider, USER_ROLES) {
		$urlRouterProvider.otherwise('/home');
		
		$stateProvider
			.state('send', {
				url: '/send',
				templateUrl: 'views/send.html',
				data: {
					requireLogin: false
				}
			})

			.state('send.amount', {
        url: '/amount',
        templateUrl: 'views/send-enter-amount.html'
	    })

	    .state('send.source', {
        url: '/source',
        templateUrl: 'views/send-choose-source.html'
	    })

	    .state('send.receiver', {
        url: '/receiver',
        templateUrl: 'views/send-choose-receiver.html'
	    })

	    .state('receive', {
        url: '/receive',
        templateUrl: 'views/receive.html'
	    })

	    .state('transfer', {
	    	url:'/transfer',
	    	templateUrl: 'views/transfer.html'
	    })

	    .state('/signup', {
      	  url: 'signup',
          templateUrl: 'views/signup.html',
          data: {
						requireLogin: false
					}
      })

	    .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        data: {
					requireLogin: false
				}
	    })

	    .state('account', {
        url: '/account',
        templateUrl: 'views/account-landing.html',
        data: {
					requireLogin: true,
					authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
				}
	    })

			.state('home', {
				url: '/home',
				templateUrl: 'views/home.html',
        data: {
					requireLogin: false
				}
			});
});
	/*.run(function ($rootScope, AUTH_EVENTS, AuthService) {

  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    if (!AuthService.isAuthorized(authorizedRoles)) {
      event.preventDefault();
      if (AuthService.isAuthenticated()) {
        // user is not allowed
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      } else {
        // user is not logged in
        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
      }
    }
  });
});*/