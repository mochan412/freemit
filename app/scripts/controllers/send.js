'use strict';

/**
 * @ngdoc function
 * @name freemitApp.controller:SendCtrl
 * @description
 * # SendCtrl
 * Controller of the freemitApp
 */
angular.module('freemitApp')
  .controller('SendCtrl', function ($scope, $rootScope, $http) {
    $scope.targetCurrency = 'EUR'; //default set to Euro

  	$scope.setTarget = function(curr) {
    	$scope.targetCurrency = curr;
    }

		/* var url = 'https://api.twitter.com/1.1/statuses/show.json'

    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        crossDomain: true,
        dataType: 'jsonp',
		    success: function (data) {
		    	console.log('success!');
		    },
		    error: function(e) {
		      console.log('error!');
		    }
      });*/

    function httpGet()
      {
          var xmlHttp = null;

          xmlHttp = new XMLHttpRequest();
          xmlHttp.open( "GET", 'https://api.twitter.com/1.1/statuses/show.json', true );

          xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState === 4) {
                if (xmlHttp.status >= 200 && req.status < 400) {
                    'success!'// JSON.parse(req.responseText) etc.''
                } else {
                    'error!'
                }
            }
        };
          xmlHttp.send( null );
          return xmlHttp.responseText;
      }

      httpGet();
    
  });
