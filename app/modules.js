define(['app/config',
        'controllers/HomeController',
        'controllers/LoginController',
		'controllers/HeaderController',
		'controllers/LogoutController',
		'controllers/SignUpController',
		'controllers/RecoverPwdController',
		'controllers/TableController',
		'controllers/InputController',
		'controllers/SearchController',
		'controllers/SearchByAlphabetController'],
    function(config,HomeController, LoginController,HeaderController,LogoutController,SignUpController,RecoverPwdController,TableController,InputController,SearchController,SearchByAlphabetController){
    'use strict';

    var app = angular.module('LoginDemoApp',['ngRoute','ngResource']);

    app.config(config);
	app.controller('HeaderController', HeaderController);
    app.controller('HomeController', HomeController);
    app.controller('LoginController',LoginController);
	app.controller('LogoutController',LogoutController);
	app.controller('SignUpController',SignUpController);
	app.controller('RecoverPwdController',RecoverPwdController);
	app.controller('TableController',TableController);
	app.controller('InputController',InputController);
	app.controller('SearchController',SearchController);
	app.controller('SearchByAlphabetController',SearchByAlphabetController);
	
	app.directive('jqdatepicker', function () {
		return {
			restrict: 'A',
			require: 'ngModel',
			link: function (scope, element, attrs, TableController) {
				$(element).datepicker({
					changeMonth: true,
					changeYear: true
				});
			}
		};
	});
});