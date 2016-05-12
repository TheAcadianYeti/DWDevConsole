(function() {
	var app = angular.module('parking-widget', []);
	
	//Title directive
	app.directive('parkingTitle', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'HTML/parking-title.html'
		};
	});
	
	app.directive('parkingBody', function($http)
	{
		return {
			restrict: 'E',
			templateUrl: 'HTML/parking-body.html',
			controller: function()
			{
				_self = this;
				this.lastCheckIn = {
					user: "N/A",
					status: "No updates yet!",
					time: "N/A",
					comments: [],	
				};
				
				
				this.postUpdate  = function()
				{
					$http.post("JSON/check.json?check=newCheck", _self.lastCheckIn, {"content-type" : "application/json"}).then(function(res)
					{
						//console.log(res.data);
					}, function(res)
					{
						//console.log(res.data);
					});
				}
				//Init function, loads data from the check.JSON file
				this.init = function()
				{
					$http.get("JSON/check.json").then(function(res)
					{
						var obj = res.data.lastCheckIn;
						_self.lastCheckIn = obj;
					}, function(res)
					{
						console.log(res.data);
					});
				}
			},
			controllerAs: 'parking'
		};
	});
})();
