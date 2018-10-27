var app = angular.module('app',['controllers','ngRoute']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/login', {templateUrl: 'templates/loginTemplate.html',controller:'LoginController'})
	.when('/signup', {templateUrl: 'templates/signUpTemplate.html',controller:'SignUpController'})
	.when('/recoverPassword', {templateUrl: 'templates/recoverPwdTemplate.html',controller:'RecoverPwdController'})
    .when('/home',{templateUrl:'templates/homeTemplate.html',controller:'HomeController'})
	.when('/report',{templateUrl:'templates/tableTemplate.html',controller:'TableController'})
	.when('/logout',{templateUrl:'templates/logoutTemplate.html',controller:'LogoutController'})
	.when('/error',{templateUrl:'templates/errorTemplate.html'})
    .otherwise({redirectTo: '/login'});
}]);