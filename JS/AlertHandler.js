(function ()
{
	var app = angular.module('alert-handler', []);
	
	app.directive('alertHandler', function()
	{
		return {
			restrict: 'E',
			templateUrl: 'HTML/custom-alert.html',
			controller: function()
			{
				var _self = this;
				_self.alerts = [];
				_self.addAlert = function(text)
				{
					//Adds an alert with the given text
					alerts.push({msg: text});
				}
				_self.closeAlert = function(index)
				{
					console.log("So it just calls this huh");
					//removes an element from the array is all
					_self.alerts.splice(index, 1);
				}
			},
			controllerAs: 'alertCtrl'
		};
	});
})();