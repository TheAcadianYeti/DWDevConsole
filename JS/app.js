(function ()
{
	var app = angular.module('dw-dev', ['search-app','server-widget', 'parking-widget']);
	
	
	app.controller('FormController', function()
	{
		this.checkUp = {};
		this.userProfile = {};
		this.comment="";
		this.updateCheck = function(checkIn, user)//This is what we assign values to
		{
			//Never overrite just modify existing values!  Doesnt like it 
			checkIn.user = user;
			var date = formatDate(Date.now());
			checkIn.time = date;
			checkIn.comments = [];
			checkIn.status = this.checkUp.status;
			this.checkUp = {};
		};
		
		this.addComment = function(checkIn, user)
		{
				checkIn.comments.push({
				text: this.comment,
				userProfile: user,
				time: formatDate(Date.now()),
				});
				this.comment="";
		};
	});
})();

//Takes a date object and converts it into YYYY-MM-DD  HH:mm:SS
function formatDate(timestamp)
{
	var date = new Date(timestamp);
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "  " + (date.getUTCHours() - 3) + ":" + date.getUTCMinutes() + ":" + date.getUTCSeconds();
}