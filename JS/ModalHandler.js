(function()
{
	var app = angular.module('modal-handler', ['formly', 'formlyBootstrap']);
	
	
	app.directive('parkingModal', function()
	{
		return {
			restrict: 'E',
			templateUrl: "HTML/signup-modal.html",
			controller: function($uibModal, $window)
			{
				var _self = this;
				_self.model={};
				
				_self.fields = [
					{
						type: 'input',
						key: 'email',
						templateOptions : {
							label: "Email",
							required: true,
							placeholder: "Enter your email..."
						}
					},
					{
						type: 'input',
						key: 'username',
						templateOptions: {
							label: "Username",
							required: true,
							placeholder: "Enter your username..."
						}
					},
					{
						type: 'input',
						key: 'pass',
						templateOptions : {
							label: 'Password',
							type: "password",
							placeholder: "Enter your password..."
						}
					},
					{
						type: 'input',
						key: 'verPass',
						templateOptions : {
							label: "Verify Password",
							type: "password",
							required: true,
							placeholder: 'Verify password'
						},
						validators: {
							validPass : "$viewValue === model.pass",
						}
					}
				]
				
				
				
				
				this.openModal = function()
				{
					var modalInstance = $uibModal.open(
					{
						animation: true,
						//For whatever reason, I don't nede to include HTML/ here.   Not a hundred percent sure why, I believe it has something to do witht eh fact
						//I've already got the html maybe?
						templateUrl: 'signup-modal.html',
						controller: function($uibModalInstance)
						{
							//Cool, so it's weird but these are function definde inside the modalCtrl controll,er but theya re defined here.  
								_self.ok = function(createAccountCallback)
								{
									$uibModalInstance.close(createAccountCallback);
								};
			
								_self.cancel = function()
								{
									_self.model.username="";
									_self.model.email="";
									_self.model.pass="";
									$uibModalInstance.dismiss("Cancel");
								};	
						},
						size: 'sm',
						
					});
					modalInstance.result.then(function (createAccountCallback) 
					{
						_self.valid = true;
						//At this point we want to call parking to create a new account
						createAccountCallback(_self.model.username, _self.model.pass, _self.model.email);
						_self.model = {};
					}, function()
					{
						_self.valid = true;
						console.log("Modal dismissed");
					});
				}
				
				this.alert = function(message)
				{
					$window.alert(message);
				}
			},
			controllerAs: "modalCtrl"
		};
	});
	
})();