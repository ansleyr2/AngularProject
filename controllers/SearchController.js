define([], function() {
    'use strict';

    function SearchController($scope,$resource) {
		$scope.searchBtnTxt="Search word";
		$scope.PronounceinfoMsg="Click on the word to pronounce it.";
		$scope.disableEdit=true;
		$scope.showSaveBtn=false;
		$scope.showEditDiv=false;
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
		$scope.searchWord=function(){
			var url ='http://localhost:8080/RESTfulProject/REST/WebService/'+$scope.wordToSearch;
			var users=$resource(url);
			users.query().$promise.then(function(data) {
			   // success
			   $scope.showEditDiv=false;
			   if(data.length>0){
				   $scope.showMeaning=true;
				   $scope.showSentence=true;
					$scope.infoMsg=null;
					$scope.showGetBtn=false;
					$scope.wordsList=data;
					$scope.word=data[0];
					$scope.detailsFetched=true;
			   }else{
				   $scope.wordsList=null;
				   $scope.detailsFetched=false;
				   $scope.infoMsg="No words found";
			   }
			}, function(errResponse) {
			   // fail
			   console.log('error');
			   console.log(errResponse);
			});
		}
		$scope.saveWord=function(word){
			if(word.meaning != "" && word.sentence!=""){
				var url ="http://localhost:8080/RESTfulProject/REST/EditService/"+word.word+"/"+word.meaning+"/"+word.sentence+"/"+word.word_id;
				var user=$resource(url);
				user.save().$promise.then(function(data) {
					$scope.errorMsg='save success';
					$scope.submitted=false;
					if(data[0] == 'S'){
						inputForm.word.$dirty=false;
						alert('word successfully updated.');
						$scope.searchWord();
					}else{
						alert('Something went wrong, update failed');
					}
					inputForm.meaning.$dirty=false;
					inputForm.sentence.$dirty=false;
				}, function(errResponse) {
				   console.log(errResponse);
				   $scope.errorMsg='somthing failed';
				});
			}else{
				console.log('please enter meaning and sentence');
			} 
		}
		$scope.enableEditFeature=function(){
			$scope.disableEdit=false;
			$scope.showSaveBtn=true;
			$scope.showEditDiv=true;
			$scope.detailsFetched=false;
		}
    }

    SearchController.$inject=['$scope','$resource'];

    return SearchController;
});