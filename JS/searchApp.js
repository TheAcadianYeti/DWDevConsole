/**
 * Created by hleclair on 5/10/2016.
 */

(function()
{
    //-------------------------------------------------------------------------------------------------------------
    // This angular module is search-app
    //-------------------------------------------------------------------------------------------------------------

    var app = angular.module('search-app',[]);

    //-------------------------------------------------------------------------------------------------------------
    // Controller for a few different aspects of submitting the search data and controlling what is searched
    //-------------------------------------------------------------------------------------------------------------

    app.controller('searchController',['$scope', "$http", function($scope, $http)
    {
        $scope.googleSelected = false;
        $scope.devWikiSelected = false;
        $scope.parkingOMaticSelected = false;
        $scope.chosenUrl = "http://google.ca";
        $scope.searchData = "";
        $scope.foundSearchData = [];
        $scope.searchOptions =
        {
            validOptions:
                [
                    {id: 1, name: 'Parking-O-Matic!'},
                    {id: 2, name: 'Dev Wiki'},
                    {id: 3, name: 'Google'},
                    {id: 4, name: 'Where would you like to search today ?'}
                ],
            chosenOption: {id: 4, name: 'Where would you like to search today ?'},
            searchData: ''
        };

        $scope.googleData = "";
        $scope.devWikiData = "";
        $scope.parkingOMaticData = "";

        //---------------------------------------------------------------------------------------------------------
        // Variable containing useful things we will be using with our search widget
        // *****data inside should be in a json file*****
        //---------------------------------------------------------------------------------------------------------



        $scope.widget =
        {
            google: 'https://www.google.ca/?ion=1&espv=2#q=',
            devWiki: 'https://confluence.deltaware.com/dosearchsite.action?queryString=',
            parkingOMatic: '/JSON/check.json',
            url: $scope.chosenUrl

        };

        //---------------------------------------------------------------------------------------------------------
        // Variables below call functions to set our booleans used with ng-show to true so that the correct
        // search results are displayed.
        //---------------------------------------------------------------------------------------------------------
        $scope.showResults = function showResults()
        {
            switch($scope.searchOptions.chosenOption.name)
            {
                case 'Google': $scope.googleSelected = true;
                {
                    $scope.googleSelected = true;
                    $scope.devwikiSelected = false;
                    $scope.parkingOMaticSelected = false;
                    $scope.chosenUrl = $scope.widget.google;
                    processUrl($scope.chosenUrl);

                }
                    break;
                case 'Dev Wiki':
                {
                    $scope.devwikiSelected = true;
                    $scope.googleSelected = false;
                    $scope.parkingOMaticSelected = false;
                    $scope.chosenUrl = $scope.widget.devWiki;
                    processUrl($scope.chosenUrl);

                }
                    break;
                case 'Parking-O-Matic!':
                {
                    $scope.parkingOMaticSelected = true;
                    $scope.googleSelected = false;
                    $scope.devWikiSelected = false;
                    $scope.chosenUrl = $scope.widget.parkingOMatic;
                    processUrl($scope.chosenUrl);
                }
                    break;
                default:
                {
                    $scope.parkingOMaticSelected = true;
                    $scope.googleSelected = false;
                    $scope.devWikiSelected = false;
                    $scope.chosenUrl = $scope.widget.parkingOMatic;
                    processUrl($scope.chosenUrl);
                }
                    break;
            }
        };

        //---------------------------------------------------------------------------------------------------------
        // This function sends an http get request to get the search data and it is put into out service for search
        // variable from our factory
        //---------------------------------------------------------------------------------------------------------

        function processUrl(chosenUrl)
        {
            $scope.searchArray = $scope.searchData.split(" ");
            if($scope.chosenUrl === $scope.widget.devWiki || $scope.chosenUrl === $scope.widget.google)
            {
                for (var data in $scope.searchArray)
                {
                    $scope.chosenUrl += data + "+";
                }
            }
            $http.get($scope.chosenUrl).success(function(response)
            {
                $scope.foundSearchData = response;
            }).error(function(err)
            {
                alert("Error!" + err);
            });
        }
    }]);

    //---------------------------------------------------------------------------------------------------------
    // Custom directive used as an html element in the dev console (index.html)
    //---------------------------------------------------------------------------------------------------------

    app.directive('searchApp', function ()
    {
        return{
            restrict: 'E',
            controller: 'searchController',
            templateUrl: 'HTML/search-app.html'}
    });
    
})();

