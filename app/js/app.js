(function () {
    'use strict';

    angular
        .module('gitApp', [
        'ngStorage',
        'ui.router',
        'gitAppControllers'
        ])
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('repos', {
                    url: "/repos",
                    templateUrl: "partials/list.html",
                    controller: 'RepoListCtrl'
                })
                .state('detailed', {
                    url: "/detailed/:user/:repo",
                    templateUrl: "partials/detail.html",
                    controller: 'RepoDetailCtrl'
                })

                .state('favorits', {
                    url: "/favorits",
                    templateUrl: "partials/fav-list.html",
                    controller: 'RepoFavoriteCtrl'
                })
                .state('contact', {
                    url: "/contact",
                    templateUrl: "partials/contact.html"
                });

            $urlRouterProvider.otherwise('/repos');
        });
})();