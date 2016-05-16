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

    app.controller('searchController',['$scope', '$http', '$sce', function($scope, $http, $sce)
    {
        $scope.trustSource = function(source)
        {
            return $sce.trustAsResourceUrl(source);
        };
        $scope.jiraSelected = false;
        $scope.devWikiSelected = false;
        $scope.chosenUrl = "http://stackoverflow.com/search?q=";
        $scope.searchData = "";
        $scope.foundSearchData = [];
        $scope.searchOptions =
        {
            validOptions:
                [
                    {id: 1, name: 'Dev Wiki'},
                    {id: 2, name: 'Jira'},
                    {id: 3, name: 'Where would you like to search today ?'}
                ],
            chosenOption: {id: 3, name: 'Where would you like to search today ?'},
            searchData: ''
        };


        //---------------------------------------------------------------------------------------------------------
        // Variable containing useful things we will be using with our search widget
        // *****data inside should be in a json file*****
        //---------------------------------------------------------------------------------------------------------



        $scope.widget =
        {
            jira: 'http://jira.deltaware.com:8080/issues/?jql',
            devWiki: 'https://confluence.deltaware.com/dosearchsite.action?queryString=',
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
                case 'Jira':
                {
                    $scope.jiraSelected = true;
                    $scope.devwikiSelected = false;
                    $scope.chosenUrl = $scope.widget.jira;
                    processUrl($scope.chosenUrl);

                }
                    break;
                case 'Dev Wiki':
                {
                    $scope.devwikiSelected = true;
                    $scope.jiraSelected = false;
                    $scope.chosenUrl = $scope.widget.devWiki;
                    processUrl($scope.chosenUrl);

                }
                    break;
                default:
                {
                    $scope.jiraSelected = false;
                    $scope.devWikiSelected = false;
                    $scope.chosenUrl = $scope.widget.devWiki;
                    processUrl($scope.chosenUrl);
                }
                    break;
            }
        };

        //---------------------------------------------------------------------------------------------------------
        // This function sends an http get request to get the search data and it is put into out service for search
        // variable from our factory
        //---------------------------------------------------------------------------------------------------------

        function processUrl(chosenUrl,$sce)
        {
            $scope.searchArray = $scope.searchOptions.searchData.split(" ");

            angular.forEach($scope.searchArray, function (value, key)
            {
                if(key !== $scope.searchArray.length-1)
                {
                    $scope.chosenUrl += value + "+";
                }
                else
                {
                    $scope.chosenUrl += value;
                }
            });
        }
        //$http.get($scope.chosenUrl).success(function(response)
        //{
            //$scope.foundSearchData = response;
        //}).error(function(err)
       // {
          //  alert("Error!" + err);
       // });

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

