define([], function() {
    'use strict';

    function SignUpController($scope,$location,$resource) {
		var newUserName="";
		$scope.disableBtn=true;
		$scope.signup=function(signUpForm){
			$scope.submitted=true;
			if(signUpForm.$valid){
				//insertIntoDB();
				var fname=$scope.fname;
				var lname=$scope.lname;
				var email=$scope.email;
				var pwd=$scope.newPwd;
				var url ='http://localhost:8080/RESTfulProject/REST/WebService/'+fname+'/'+lname+'/'+email+'/'+pwd;
				console.log(url);
				var user=$resource(url);
			
				user.save().$promise.then(function(data) {
					$scope.errorMsg='save success';
					if(data[0] == 'U'){
						alert("User with email '"+email+"' already exists");
					}else{
						var ok=confirm('SignUp successfull');
						if(ok){
							$location.path('/login');
						}else{
							
						}
					}
					
					//console.log(data);
				}, function(errResponse) {
				   console.log(errResponse);
				   $scope.errorMsg='somthing failed';
				});
				
			}
		}
		
		/* var insertIntoDB=function(){
			var myDB = new ACCESSdb("F:\\Work\\AngularJs\\RequireJSDemo\\database\\AppDB.mdb",{showErrors:true});
			//console.log(myDB);
			var id=Math.floor((Math.random() * 100) + 1);

			 var SQL = "INSERT INTO Users VALUES('"+id+"','"+$scope.email+"','"+$scope.fname+"','"+$scope.lname+"','"+$scope.email+"','"+$scope.newPwd+"')";
			 //console.log(SQL);
			 if(myDB.query(SQL)) {
				//alert("Inserted!");
				$scope.errorMsg='Signup Successfull...Please wait while you are redirected to login page';
				setTimeout(function(){ $location.path('/login'); }, 3000);
				
			 }else{
				//$location.path('/error');
				$scope.errorMsg='Something failed...Please try again later..';
			 }
			
		} */
    }

    SignUpController.$inject=['$scope','$location','$resource'];

    return SignUpController;
});
