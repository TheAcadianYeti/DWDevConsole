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
				this.loggedIn = false;
				this.user = "Anon";
				this.lastCheckIn = {
					user: "N/A",
					status: "No updates yet!",
					time: "N/A",
					comments: [],	
				};
				
				this.authenticate = function(userName, pass)
				{
					//Any one can log in at the moment
					//if(userName === "pwilliams")
					//{
						//if(pass === "dl546d")
						//{
							this.loggedIn = true;
							this.user = userName;
							//Pick a 
							userName = "";
							pass="";
						//}
					//}
				}
				
				this.signOut = function()
				{
					this.user = "Anon";
					this.loggedIn = false;
				}
				
				
				//Posts a comment
				this.postComment = function()
				{
					this.config = {
						method: "POST",
						headers: {
							'Content-Type': 'application/json',
						},
						url: 'JSON/check.json',
						data: _self.lastCheckIn,
						params: {postComment: 'true'}
					}
					$http(this.config).then(function(res)
					{
						console.log(res.data);
					}, function(res)
					{
						console.log(res.data);
					});
				}
				
				//Post a check in update
				this.postUpdate  = function()
				{
					this.config = {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',	
						},
						url: 'JSON/check.json',
						data: _self.lastCheckIn,
						params: {postUpdate: 'true'}
					};
					//"JSON/check.json", _self.lastCheckIn, {"content-type" : "application/json"}
					$http(this.config).then(function(res)
					{
						console.log(res.data);
					}, function(res)
					{
						console.log(res.data);
					});
				}
				
				//Init function, loads data from the check.JSON file
				this.init = function()
				{
					$http.get("JSON/check.json").then(function(res)
					{
						console.log("Successfully loaded data");
						var obj = res.data;
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
