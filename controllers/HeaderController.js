define([], function() {
    'use strict';

    function HeaderController($scope) {
        $scope.header="GRE Vocab Builder";
    }

    HeaderController.$inject=['$scope'];

    return HeaderController;
});