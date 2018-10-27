define([], function() {
    'use strict';

    function RecoverPwdController($scope) {
        $scope.disableBtn=false;
	
		var CLIENT_ID = '258938782428-ej09ddjq8ag4khonvst2b39dkr98cctg.apps.googleusercontent.com';
		var SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
		
		$scope.recoverPwd=function(){
			$scope.disableBtn=true;
			checkAuth();
			
		}
		var checkAuth=function() {
			gapi.auth.authorize(
			  {
				client_id: CLIENT_ID, 
				scope: SCOPES, 
				immediate: false
			  },
			  function handle(authResult){handleAuthResult(authResult);});
		};
		
		var handleAuthResult=function(authResult) {
			//var authorizeDiv = document.getElementById('authorize-div');
			if (authResult && !authResult.error) {
			  // Hide auth UI, then load client library.
			  //authorizeDiv.style.display = 'none';
			  
			  loadGmailApi();
			} else {
			  // Show auth UI, allowing the user to initiate authorization by
			  // clicking authorize button.
			 // authorizeDiv.style.display = 'inline';
			 $scope.recoverySuccessMsg="Something Failed...try again later";
			}
		};
		
		var loadGmailApi=function() {
			gapi.client.load('gmail', 'v1',function(){
				var toEmailId=$scope.email;
				var emailTemplate="From: Ansley Rodrigues <ansleyr2@gmail.com> \n"+
								"To:<"+toEmailId+"> \n"+
								"Subject: Password Recovery \n"+
								"Date:Sun,31 Jan 2016 16:50:00 -0600 \n"+
								"Message-ID: <1234@local.machine.example> \n"+
								"This is a test message.So just Hi."
				var base64EncodedEmail = btoa(emailTemplate).replace(/\+/g, '-').replace(/\//g, '_');
				  var request = gapi.client.gmail.users.messages.send({
					'userId': 'me',
					'resource': {
					  'raw': base64EncodedEmail
					}
				  });
				$scope.recoverySuccessMsg="Please check you inbox for recovery mail.";
				request.execute();
				});
		};
    }

    RecoverPwdController.$inject=['$scope'];

    return RecoverPwdController;
});