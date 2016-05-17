(function() {
	var app = angular.module('parking-widget', ['modal-handler']);
	
	//Title directive
	app.directive('parkingTitle', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'HTML/parking-title.html'
		};
	});
	
	app.directive('parkingBody', function($http, $window)
	{
		return {
			restrict: 'E',
			templateUrl: 'HTML/parking-body.html',
			controller: function()
			{
				var _self = this;
				_self.loggedIn = false;
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
				
				this.createAccount = function(userName, pass, email)
				{
					var user = {
						userName: userName,
						pass: pass,
						email: email
					};
					//Creates an acconut on the server
					this.config = {
						method: "POST",
						headers: {
							'Content-Type': 'application/json',
						},
						url: 'JSON/users.json',
						data: user,
						params: {createAccount: 'true'}
					}
					
					$http(this.config).then(function(res)
					{
						console.log(res.data);
					}, function(res)
					{
						console.log(res.data);
					});
				}
				
				this.authenticate = function(username, pass)
				{
						this.config = {
						method: "GET",
						headers: {
							'Content-Type': 'application/json',
						},
						url: 'JSON/users.json',
						data: {user:username, pass:pass},
						}
						
						$http.get("JSON/users.json").then(function(res)
						{
							var user;
							for(var i = 0; i < res.data.users.length; i++)
							{
								var item = res.data.users[i];
								console.log(item);
								if(item.username === username)
								{
									user = item;
									i = res.data.users.length;
								}
							}
							if(user && user.pass === pass)
							{
								_self.loggedIn = true;
								var profile;
								_self.pickPic(_self.setProfile, username);
							}
							else
							{
								$window.alert("Invalid username/password.  Please create an account if you'd like");
							}

						});
					//Any one can log in at the moment
					//try and get the username from server, if it is null print an alert
					//if(userName === "pwilliams")
					//{
						//if(pass === "dl546d")
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
					this.config = 
					{
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
