define([],function(){
    'use strict';

    function config($routeProvider) {
        $routeProvider
		.when('/login', {templateUrl: 'templates/loginTemplate.html',controller:'LoginController'})
		.when('/signup', {templateUrl: 'templates/signUpTemplate.html',controller:'SignUpController'})
		.when('/recoverPassword', {templateUrl: 'templates/recoverPwdTemplate.html',controller:'RecoverPwdController'})
		.when('/home',{templateUrl:'templates/homeTemplate.html',controller:'HomeController'})
		.when('/report',{templateUrl:'templates/tableTemplate.html',controller:'TableController'})
		.when('/logout',{templateUrl:'templates/logoutTemplate.html',controller:'LogoutController'})
		.when('/error',{templateUrl:'templates/errorTemplate.html'})
		.when('/input',{templateUrl:'templates/InputTemplate.html',controller:'InputController'})
		.when('/search',{templateUrl:'templates/searchWordTemplate.html',controller:'SearchController'})
		.when('/searchByLetter',{templateUrl:'templates/searchByAlphabet.html',controller:'SearchByAlphabetController'})
		.otherwise({redirectTo: '/login'});
    }

    config.$inject=['$routeProvider'];

    return config;
});