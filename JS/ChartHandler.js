(function ()
{
	var app = angular.module('chart-handler', []);
	
	var chart = require('node_modules/chart.js')
	
	var ctx = document.getElementById("myChart");
	

	app.directive('chartHandler', function()
	{	
		return {
			restrict: 'E',
			templateUrl: "HTML/chart.html",
			controller:function()
			{
				//Copied form the chartjs.org/docs/ website for reference
				var myChart = new Chart(ctx, 
				{
    				type: 'bar',
    				data: 
					{
   					     labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
   					     datasets: 
						 [{
   					         label: '# of Votes',
   		    			     data: [12, 19, 3, 5, 2, 3]
   	     				}]	
   	 				},
	 			  	 options: 
					{
    					    scales: 
							{
    					        yAxes: 
								[{
    					            ticks: 
									{
    					                beginAtZero:true
    					            }
    					        }]
  		  				    }
   		 			}
				});
				
				var updateChart = function()
				{
					//Update chart here
					console.log("Would udpate here");
				}
			},
			controllerAs: chart
		};
	});
	
})();