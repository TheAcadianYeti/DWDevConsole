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

    app.controller('searchController',['serviceForSearch','$scope', "$http", function(serviceForSearch, $scope, $http)
    {
        $scope.googleSelected = false;
        $scope.devWikiSelected = false;
        $scope.chosenUrl = "http://google.ca";
        $scope.searchData = "";
        $scope.serviceForSearch = serviceForSearch;
        $scope.founcSearchData = "";
        $scope.searchOptions =
        {
            validOptions:
                [{id: 1, name: 'Google'},
                {id: 2, name: 'Dev Wiki'},
                {id: 3, name: 'Where would you like to search'}],
            chosenOption: {id: 3, name: 'Where would you like to search'},
            searchData: 'The internet is your oyster.... Search'
        };

        $scope.googleData = "";
        $scope.devWikiData = "";

        //---------------------------------------------------------------------------------------------------------
        // Variable containing useful things we will be using with our search widget
        // *****data inside will probably be going into a json file*****
        //---------------------------------------------------------------------------------------------------------



        $scope.widget =
        {
            google: 'https://www.google.ca/?ion=1&espv=2#q=',
            devWiki: 'https://confluence.deltaware.com/display/DW/Dev+WIKI+Home/',
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
                    $scope.chosenUrl = $scope.widget.google;
                    processUrl($scope.chosenUrl);

                }
                    break;
                case 'Dev Wiki':
                {
                    $scope.devwikiSelected = true;
                    $scope.googleSelected = false;
                    $scope.chosenUrl = $scope.widget.devWiki;
                    processUrl($scope.chosenUrl)

                }
                    break;
                default:
                {
                    $scope.googleSelected = false;
                    $scope.devWikiSelected = false;
                }
                    break;
            }
        };

        function processUrl(chosenUrl)
        {
            for(var data in $scope.searchData.split(' '))
            {
                $scope.chosenUrl += data + "+";
            }
            $scope.chosenUrl = $scope.chosenUrl.substring(0,$scope.chosenUrl.length-2);
            alert(chosenUrl);
            $http.get(chosenUrl).success(function(response)
            {
                serviceForSearch.results = response;
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
            templateUrl: 'search-app.html'}
    });

    //---------------------------------------------------------------------------------------------------------
    // Custom factory used for search data
    //---------------------------------------------------------------------------------------------------------

    app.factory('serviceForSearch', function ()
    {
        var serviceForSearch = {};
        serviceForSearch.results = [];
        return serviceForSearch;
    });
})();
