(function ()
{
	var app = angular.module('dw-dev', ['server-widget', 'parking-widget']);
	
	
	app.controller('FormController', function()
	{
		this.checkUp = {};
		this.comment="";
		this.updateCheck = function(checkIn, testing)//This is what we assign values to
		{
			//Never overrite just modify existing values!  Doesnt like it 
				checkIn.user = "Herb";
				var date = formatDate(Date.now());
				checkIn.time = date;
				checkIn.comments = [];
				checkIn.status = this.checkUp.status;
				this.checkUp = {};
		};
		
		this.addComment = function(checkIn)
		{
				checkIn.comments.push({
				text: this.comment,
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