'use strict';

/**
* @ngdoc function
* @name freemitApp.controller:CalculatorCtrl
* @description
* # CalculatorCtrl
* Controller of the freemitApp
*/
angular.module('freemitApp').controller('CalculatorCtrl', ['$scope', '$rootScope', '$window', 
	function ($scope, $rootScope, $window) {
	// Bound to the output display
	$scope.output = "0";

	// Used to evaluate whether to start a new number
	// in the display and when to concatenate
	$scope.newNumber = true;

	// Holds the pending operation so calculate knows
	// what to do
	$scope.pendingOperation = null;

	// Bound to the view to display a token indicating
	// the current operation
	$scope.operationToken = null;

	// Holds the running total as numbers are added/subtracted
	$scope.runningTotal = null;

	// Holds the number value of the string in the display output
	$scope.pendingValue = null;

	// Tells calculate what to do when the equals buttons is clicked repeatedly
	$scope.lastOperation = null;

	// Bound to the result display
	$scope.result = null;

	//currency factor
	$scope.factor = null;

	//target currency
	$scope.targetCurrency = null;

	// Constants
	var ADD = "adding";
	var SUBTRACT = "subtracting";
	var DIVIDE = "dividing";
	var MULTIPLY = "multiplying";
	var ADD_TOKEN = "+";
	var SUBTRACT_TOKEN = "-";
	var MULTIPLY_TOKEN = "x";
	var DIVIDE_TOKEN = "÷";

	/*
	* Runs every time a number button is clicked.
	* Updates the output display and sets 
	* newNumber flag
	*/

	/* get ratio */
	//console.log($rootScope.userCurrency + $rootScope.targetCurrency);
	var urlBase = 'http://freeportmobile.com:8080/factor' + '?pair=' + $rootScope.userCurrency + $rootScope.targetCurrency;
	
  $.ajax({
    url: urlBase,
    type: 'GET',
    async: false,
    crossDomain: true,
    success: function (data) {
    	$scope.factor = data.factor;
    	console.log($scope.factor);
      return data;
    },
    error: function(e) {
      console.log('currency service error');
    }
  });

	$scope.updateOutput = function (btn) {
		if ($scope.operationToken === null) {
			//update first num
			if ($scope.output === "0" || $scope.newNumber) {
				$scope.output = btn;
				$scope.newNumber = false;
			} else {
				$scope.output += String(btn);
			}

			$scope.pendingValue = toNumber($scope.output);
		} else {
			//update second num
			if ($scope.newNumber) {
				$scope.output2 = btn;
				$scope.newNumber = false;
			} else {
				$scope.output2 += String(btn);
			}

			//update result
			if ($scope.pendingOperation === 'adding') {
				var unrounded = Number($scope.output) + Number($scope.output2);
				$scope.runningTotal = Math.round(unrounded*100)/100;
			} else if ($scope.pendingOperation === 'subtracting') {
				var unrounded = Number($scope.output) - Number($scope.output2);
				$scope.runningTotal = Math.round(unrounded*100)/100;
			} else if ($scope.pendingOperation === 'multiplying') {
				var unrounded = Number($scope.output) * Number($scope.output2);
				$scope.runningTotal = Math.round(unrounded*100)/100;
			} else if ($scope.pendingOperation === 'dividing') {
				var unrounded = Number($scope.output) / Number($scope.output2);
				$scope.runningTotal = Math.round(unrounded*100)/100;
			};

			//$scope.runningTotal = $scope.result;
			$scope.targetCurr = Math.round($scope.runningTotal * $scope.factor * 100)/100;

		}
	};

	angular.element($window).on('keydown', function(e) {
    console.log(e.keyCode);
    if (e.keyCode === 49) {
    	$scope.updateOutput(1);
    }
	});

	/*
	* add period to existing string
	*/
	$scope.addPeriod = function() {
		if ($scope.operationToken === null) {
			$scope.output += String('.');
			$scope.newNumber = false;
		} else {
			$scope.output2 += String('.');
			$scope.newNumber = false;
		}
	};

	/*
	* Runs every time an operator button is clicked.
	* If a number has not been entered, first number is 0
	* If a number has been entered, it sets newNumber to true and starts a new number
	* if 2 numbers have been entered, it sets the first output as the total and sets up the second output 
	* pending operation is set according to number passed: 0=ADD, 1=SUBTRACT, 2=MULTIPLY, 3=DIVIDE
	*/
	$scope.setOperator = function (btn) {
		if ($scope.pendingValue) {
			$scope.runningTotal = $scope.pendingValue;
		} else if ($scope.runningTotal) {
			$scope.operationToken = null;
			$scope.output2 = null;
			$scope.output = '$scope.runningTotal';
		} else if ($scope.output === "0") {
			$scope.runningTotal = 0;
		}
		setOutput(String($scope.runningTotal));
		$scope.newNumber = true;
		$scope.pendingValue = null;
		if (btn === 0) {
			setOperationToken(ADD);
			$scope.pendingOperation = ADD;
		} else if (btn === 1) {
			setOperationToken(SUBTRACT);
			$scope.pendingOperation = SUBTRACT;
		} else if (btn === 2) {
			setOperationToken(MULTIPLY);
			$scope.pendingOperation = MULTIPLY;
		} else if (btn === 3) {
			setOperationToken(DIVIDE);
			$scope.pendingOperation = DIVIDE;
		}
	};

	/* 
	* Initializes the appropriate values
	* when the clear button is clicked.
	*/
	$scope.clear = function () {
		$scope.runningTotal = null;
		$scope.pendingValue = null;
		$scope.pendingOperation = null;
		setOutput("0");
	};

	/* 
	* deletes prior values
	*/
	$scope.delete = function () {
		if ($scope.operationToken === null) {
			//delete digits from first number
			if ($scope.output.length > 1) {
				$scope.output = $scope.output.slice(0, - 1);
			} else {
				$scope.output = "0";
			}
			$scope.pendingValue = $scope.output;
			$scope.runningTotal = $scope.output;
		} else if ($scope.pendingOperation !== null && !$scope.output2) {
			//remove operator
			$scope.pendingOperation = null;
			$scope.operationToken = null;
			$scope.pendingValue = $scope.output;
			$scope.newNumber = false;
			$scope.runningTotal = null;
		} else if ($scope.pendingOperation !== null && $scope.output2) {
			//remove second number
			if ($scope.output2.length > 0) {
				$scope.output2 = $scope.output2.slice(0, - 1);

				//update result
				if ($scope.pendingOperation === 'adding') {
					var unrounded = Number($scope.output) + Number($scope.output2);
					$scope.runningTotal = Math.round(unrounded*100)/100;
				} else if ($scope.pendingOperation === 'subtracting') {
					var unrounded = Number($scope.output) - Number($scope.output2);
					$scope.runningTotal = Math.round(unrounded*100)/100;
				} else if ($scope.pendingOperation === 'multiplying') {
					var unrounded = Number($scope.output) * Number($scope.output2);
					$scope.runningTotal = Math.round(unrounded*100)/100;
				} else if ($scope.pendingOperation === 'dividing') {
					var unrounded = Number($scope.output) / Number($scope.output2);
					$scope.runningTotal = Math.round(unrounded*100)/100;
				};

				$scope.targetCurr = Math.round($scope.runningTotal * $scope.factor * 100)/100;
			} else {
				$scope.output2 = "";

				$scope.result = $scope.output;

				$scope.runningTotal = $scope.result;
				$scope.targetCurr = Math.round($scope.runningTotal * $scope.factor * 100)/100;
			}
		}
	};

	/* 
	* Updates the display output and resets the
	* newNumber flag.
	*/
	function setOutput(outputString) {
		$scope.output = outputString;
		$scope.newNumber = true;
	};

	/* 
	* Sets the operation token to let the user know
	* what the pendingOperation is
	*/
	function setOperationToken(operation) {
		if (operation === ADD) {
			$scope.operationToken = ADD_TOKEN;
		} else if (operation === SUBTRACT) {
			$scope.operationToken = SUBTRACT_TOKEN;
		} else if (operation === DIVIDE) {
			$scope.operationToken = DIVIDE_TOKEN;
		} else if (operation === MULTIPLY) {
			$scope.operationToken = MULTIPLY_TOKEN;
		} else {
			$scope.operationToken = "";
		}
	};

	/* Converts a string to a number so we can
	* perform calculations. Simply multiplies
	* by one to do so
	*/
	function toNumber(numberString) {
		var result = 0;
		if (numberString) {
			result = numberString * 1;
		}
		return result;
	};
}]);
