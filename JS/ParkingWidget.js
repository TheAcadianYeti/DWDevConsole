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
				_self.loggedIn = false;
				//this.user = "Anon";
				_self.userProfile = {
					user: "Anon",
					profilepic: "Images/ProfilePics/star_wars.jpg",
				};
				_self.lastCheckIn = {
					user: "N/A",
					status: "No updates yet!",
					time: "N/A",
					comments: [],	
				};
				
				this.setProfile = function(profile, userName)
				{
					_self.userProfile = {
						user: userName,
						profilepic: profile,
					}
				}
				this.authenticate = function(userName, pass)
				{
					//Any one can log in at the moment
					//if(userName === "pwilliams")
					//{
						//if(pass === "dl546d")
						//{
							_self.loggedIn = true;
							var profile; 
							_self.pickPic(this.setProfile, userName);

						//}
					//}
				}
				
				this.signOut = function()
				{
					this.userProfile = {
						user: "Anon",
						profilepic: "Images/ProfilePics/star_wars.jpg",	
					}
					this.loggedIn = false;
				}
				
				
				//Posts a comment
				this.postComment = function()
				{
					console.log(_self.lastCheckIn.comments);
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
						_self.pickPic(_self.setProfile, "Anon");
						console.log("Successfully loaded data");
						var obj = res.data;
						_self.lastCheckIn = obj;
					}, function(res)
					{
						console.log(res.data);
					});
				}
				
				//Method that returns a random profil pic from a JSON list
				this.pickPic = function(callback, userName)
				{
					//Get the pictures
					$http.get("JSON/profiles.json").then(function(res)
					{
						console.log("Got profiles");
						var pics = res.data;
						//Pick a random index
						var index = Math.floor((Math.random() * +pics.count));
						callback(pics.profile_pics[index], userName);
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
