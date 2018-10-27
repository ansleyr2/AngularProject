define([], function() {
    'use strict';

    function InputController($scope,$rootScope,$location,$resource) {
		$scope.date=new Date().format('dd-MM-yyyy');
		$scope.validateInput=function(inputForm){
			$scope.submitted=true;
			if(inputForm.$valid){
				var word=$scope.word;
				var meaning=$scope.meaning;
				meaning = meaning.replace(/;/g, ",");
				meaning = meaning.replace(/'/g, "");
				var sentence=$scope.sentence;
				sentence = sentence.replace(/;/g, ",");
				sentence = sentence.replace(/'/g, "");
				
				var date = new Date();
				var components = [
					date.getYear(),
					date.getMonth(),
					date.getDate(),
					date.getHours(),
					date.getMinutes(),
					date.getSeconds(),
					date.getMilliseconds()
				];

				var id = components.join("");
				var uniqueId=parseInt(id);

				var url ="http://localhost:8080/RESTfulProject/REST/WebService/"+word+"/"+meaning+"/"+uniqueId+"/"+sentence;
				console.log(url);
				var user=$resource(url);
				user.save().$promise.then(function(data) {
					$scope.errorMsg='save success';
					$scope.submitted=false;
					if(data[0] == 'S'){
						inputForm.word.$dirty=false;
						$scope.word=null;
						alert('saved');
					}else{
						alert('word "'+ word + '" already exists');
					}
					inputForm.meaning.$dirty=false;
					inputForm.sentence.$dirty=false;
					$scope.meaning=null;
					$scope.sentence=null;
				}, function(errResponse) {
				   console.log(errResponse);
				   $scope.errorMsg='somthing failed';
				});
			}
		}
    }

    InputController.$inject=['$scope','$rootScope','$location','$resource'];

    return InputController;
});