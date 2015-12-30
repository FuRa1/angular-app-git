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
              templateUrl: 'partials/repo-list.html',
              controller: 'RepoListCtrl'}).
            when('/detailed/:user/:repo', {
              templateUrl: 'partials/repo-detail.html',
              controller: 'RepoDetailCtrl'
            }).
            when('/favorite', {
              templateUrl: 'partials/repo-favorite.html',
              controller: 'RepoFavoriteCtrl'
            }).
            otherwise({
              redirectTo: '/repos'
            });
      }]);
