(function()
{
	var app = angular.module('server-widget', []);
	
	
	
	//Defining our directives
	app.directive('serverTitle', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'HTML/server-title.html'
		};
	});
	
	
	app.directive('serverBody', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'HTML/server-body.html',
			controller:function($http)//If you need to access scope, for updating things via $apply, poass inhere in controller.
			{
				var status = "Checking...";
				var _self = this;
				_self.online = false;
		
				//Simple method to test connection to the given url
				this.testConnection = function(url)
				{
					var req = 
					{
						method: 'GET',
						url: url,
						headers: 
						{
							'Access-Control-Allow-Origin': true,
							'Content-Type': undefined
						},
					}
					//var config = {"public-client": true, "enable-cors": true, "Access-Control-Allow-Origin": "*"};
					$http(req).then(success, error);
					
					function success(response)
					{
						console.log("Success with!" + response.status);
						status = "Up!"
						_self.online = true;
					}
					
					function error(response)
					{
						console.log("Failure with!" + response.statusText);
						status = "Down :(";
						_self.online = false;
					}
				}
				
				this.getStatus = function()
				{
					return status;
				}
				
				this.isUp = function()
				{
					return _self.online;
				}
			},
			controllerAs: 'server'
		}
	});
})();

