define([], function() {
    'use strict';

    function HomeController($scope,$resource) {
		$scope.showGetBtn=true;
        $scope.text="Review words learned yesterday";
		$scope.PronounceinfoMsg="Click on the word to pronounce it.";
		$scope.getPreviousDayWordsList=function(){
			if($scope.showSearch){
				$scope.showSearch=false;
			}
			//logic to get yesterdays date
			var today_date=new Date();
			var yest_date=new Date(today_date);
			yest_date.setDate(today_date.getDate() - 1);
		
			var url ='http://localhost:8080/RESTfulProject/REST/WebService/'+yest_date.format('MM-dd-yyyy');
			var users=$resource(url);
			users.query().$promise.then(function(data) {
			   // success
			   console.log(data);
			   if(data.length>0){
					$scope.infoMsg=null;
					$scope.showGetBtn=false;
					$scope.wordsList=data;
					$scope.detailsFetched=true;
				   
			   }else{
				   $scope.wordsList=null;
				   $scope.detailsFetched=false;
				   $scope.infoMsg="No words found"
			   }
			}, function(errResponse) {
			   // fail
			   console.log('error');
			   console.log(errResponse);
			});
		}
		$scope.helpEnable=function(){
			var meaningCbx=document.getElementById('meaning_cbx');
			var sentenceCbx=document.getElementById('sentence_cbx');
			if(meaningCbx.checked){
				$scope.showMeaning=true;
			}else{
				$scope.showMeaning=false;
			}
			if(sentenceCbx.checked){
				$scope.showSentence=true;
			}else{
				$scope.showSentence=false;
			}
			
		}
		$scope.speak=function(){
			var wordToSpeak=this.word.word;
			responsiveVoice.speak(wordToSpeak);
		}
    }

    HomeController.$inject=['$scope','$resource'];

    return HomeController;
});