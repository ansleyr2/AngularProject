define([], function() {
    'use strict';

    function TableController($scope,$resource) {
		var startDate,endDate;
		var pageSize=20;
		$scope.disableBtn=true;
		$scope.showDateRange=false;
		$scope.PronounceinfoMsg="Click on the word to pronounce it."
		$scope.enableBtn=function(){
			$scope.disableBtn=false;
			$scope.detailsFetched=false;
			$scope.showEmailBtn=false;
			$scope.infoMsg=null;
			if($scope.radioVal === 'daily'){
				$scope.showPgr=false;
			}else{
				$scope.showPgr=true;
			}
			if($scope.radioVal === 'manual'){
				$scope.showDateRange=true;
			}else{
				$scope.showDateRange=false;
			}
		}
		$scope.getTotalResultsCount=function(){
			$('.pager').unbind('page');
			var record_date;
			if($scope.radioVal === 'daily'){
				record_date=new Date($('#dtpkr').val()).format('MM-dd-yyyy');
			}else if($scope.radioVal === 'weekly'){
				record_date=$scope.record_date_new;
			}else if($scope.radioVal === 'manual'){
				var fDate=new Date($('#fromDtPkr').val()).format('MM-dd-yyyy');
				var eDate=new Date($('#toDtPkr').val()).format('MM-dd-yyyy');
				record_date=fDate+':'+eDate;
			}else{
				console.log('wrong choice');
			}
			var url ='http://localhost:8080/RESTfulProject/REST/WebService/'+record_date;
			var users=$resource(url);
			users.query().$promise.then(function(data) {
			   if(data.length>0){
					$scope.totalWords = data.length;
					if($scope.radioVal === 'daily'){
						$scope.totalWords = data.length;
						$scope.wordsList=data;
						$scope.detailsFetched=true;
						$scope.showEmailBtn=true;
						$scope.infoMsg="Reviewing "+ data.length +" words";
					}else{
						$scope.showEmailBtn=false;
						$scope.ShowPager();
						$scope.getDetails();
					}	
			   }else{
				   $scope.wordsList=null;
				   $scope.detailsFetched=false;
				   $scope.showEmailBtn=false;
				   $scope.infoMsg="No words found for the selected date";
			   }
			}, function(errResponse) {
			   // fail
			   console.log('error');
			   console.log(errResponse);
			});
		}
		$scope.getDetails=function(){
			var record_date;
			if($scope.radioVal === 'daily'){
				record_date=new Date($('#dtpkr').val()).format('MM-dd-yyyy');
			}else if($scope.radioVal === 'weekly'){
				record_date=$scope.record_date_new;
				record_date= record_date+':'+$scope.pageNumber+':'+pageSize;
			}else if($scope.radioVal === 'manual'){
				var fDate=new Date($('#fromDtPkr').val()).format('MM-dd-yyyy');
				var eDate=new Date($('#toDtPkr').val()).format('MM-dd-yyyy');
				record_date=fDate+':'+eDate+':'+$scope.pageNumber+':'+pageSize;
			}else{
				console.log('wrong choice');
			}
			var url ='http://localhost:8080/RESTfulProject/REST/WebService/'+record_date;
			var users=$resource(url);
			users.query().$promise.then(function(data) {
			   // success
			   if(data.length>0){
					$scope.wordsList=data;
					$scope.detailsFetched=true;
					$scope.infoMsg="Reviewing "+ $scope.totalWords +" words";
			   }else{
				   $scope.wordsList=null;
				   $scope.detailsFetched=false;
				   $scope.infoMsg="No words found for the selected date";
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
		$scope.showDtpr=function(){
			$('#dtpkr').datepicker( {
				changeMonth: true,
				changeYear: true,
				onSelect: function(dateText, inst) { 
					if($scope.radioVal === 'weekly'){
						var date = $(this).datepicker('getDate');
						startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
						endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay() + 6);
						var dateFormat = 'mm-dd-yy';//dont change this format
						startDate=$.datepicker.formatDate( dateFormat, startDate, inst.settings );
						endDate=$.datepicker.formatDate( dateFormat, endDate, inst.settings );
						$scope.record_date_new= startDate+':'+endDate;
						//console.log(startDate+':'+endDate);
					}else{
						var date = $(this).datepicker('getDate');
						$scope.record_date_new=date.format('MM-dd-yyyy');
						console.log(date.format('MM-dd-yyyy'));
					}
				}
			});
		}
		$scope.speak=function(){
			var wordToSpeak=this.word.word;
			responsiveVoice.speak(wordToSpeak);
			//console.log(wordToSpeak);
		}
		
		$scope.getPageNumber=function(){
			$scope.pageNumber=1;
		}
		$scope.ShowPager=function(){
			$scope.pageNumber=1;
			var pages= Math.ceil($scope.totalWords/pageSize);
			$('.pager').bootpag({
				   total: 0,
				   page: 0,
				   maxVisible: 0
				});
			if(pages > 1){
				$('.pager').bootpag({
				   total: pages,
				   page: 1,
				   maxVisible: 10
				}).on('page', function(event, num){
					//$(".content2").html("Page " + num); // or some ajax content loading...
					$scope.pageNumber=num;
					console.log($scope.pageNumber);
					$scope.getDetails();
				});
				$('.pager').bootpag().show();
			}else{
				$('.pager').bootpag().hide();
			}
		}
		$scope.sendWordsToEmail=function(){
			$scope.disableEmailBtn=true;
			var record_date=null;
			var emailId="ansleyrodrigues25@gmail.com";
			var emailPwd="ansley4Gmail";
			if($scope.radioVal === 'daily'){
				record_date=new Date($('#dtpkr').val()).format('MM-dd-yyyy');
			}
			var url ="http://localhost:8080/RESTfulProject/REST/EmailService/"+record_date+"/"+emailId+"/"+emailPwd;
			console.log(url);
			var user=$resource(url);
			user.save().$promise.then(function(data) {
				$scope.errorMsg='save success';
				$scope.disableEmailBtn=false;
				$scope.submitted=false;
				if(data[0] == 'S'){
					alert('Sent message successfully....');
				}else{
					alert('No words Found for '+record_date);
				}
			}, function(errResponse) {
			   console.log(errResponse);
			   $scope.errorMsg='somthing failed';
			});
		}
    }
	
    TableController.$inject=['$scope','$resource'];

    return TableController;
});