'use strict';
var gitApp = angular.module('gitApp', [
    'ngStorage',
    'ngRoute',
    'gitAppControllers'
]);


gitApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
            when('/repos', {
              templateUrl: 'partials/list.html',
              controller: 'RepoListCtrl'}).
            when('/detailed/:user/:repo', {
              templateUrl: 'partials/detail.html',
              controller: 'RepoDetailCtrl'
            }).
            when('/favorits', {
                templateUrl: 'partials/fav-list.html',
                controller: 'RepoFavoriteCtrl'
            }).
            when('/contact', {
                templateUrl: 'partials/contact.html',
            }).
            otherwise({
              redirectTo: '/repos'
            });
      }]);
