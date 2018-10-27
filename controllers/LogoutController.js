define([], function() {
    'use strict';

    function LogoutController($scope,$rootScope,$location) {
       $scope.logout=function(){
			$rootScope.showMenu = false;
			$location.path('/login');
		}
    }

    LogoutController.$inject=['$scope','$rootScope','$location'];

    return LogoutController;
});