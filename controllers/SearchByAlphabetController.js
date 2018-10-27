define([], function() {
    'use strict';

    function SearchByAlphabetController($scope,$resource) {
		$scope.showGetBtn=true;
        $scope.text="Review words learned yesterday";
		$scope.PronounceinfoMsg="Click on the word to pronounce it.";
		
		var alphabetList=[],i = 'a'.charCodeAt(0), j = 'z'.charCodeAt(0);
		for (; i <= j; ++i) {
			var alphaModel={"char":String.fromCharCode(i)};
			alphabetList.push(alphaModel);
		}
		$scope.alphabetList=alphabetList;
		$scope.getList=function(alphabet){
			console.log(alphabet);
			var url ='http://localhost:8080/RESTfulProject/REST/WebService/'+alphabet;
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

    SearchByAlphabetController.$inject=['$scope','$resource'];

    return SearchByAlphabetController;
});