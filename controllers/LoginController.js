define([], function() {
    'use strict';

    function LoginController($scope,$rootScope,$location,$resource) {
		$scope.validateLogin=function(loginForm){
			$scope.submitted=true;
			$scope.invalidCredentials=false;
			if(loginForm.$valid){
				console.log('credentials entered');
				var email=$scope.uname;
				var pwd=$scope.pwd;
				var url ='http://localhost:8080/RESTfulProject/REST/WebService/'+email+'/'+pwd;
				console.log(url);
				var user=$resource(url);
			
				user.query().$promise.then(function(data) {
					//$scope.errorMsg='save success';
					if(data.length>0){
						console.log(data);
						$rootScope.user_FirstName=data[0].firstName;
						$rootScope.userDetails=data[0];
						$rootScope.showMenu=true;
						$location.path('/home');
					}else{
						$scope.invalidCredentials=true;
					}
				}, function(errResponse) {
				   console.log(errResponse);
				   $scope.errorMsg='somthing failed';
				});
			}else{
				console.log('fill out fields');
			}
		}
    }

    LoginController.$inject=['$scope','$rootScope','$location','$resource'];

    return LoginController;
});