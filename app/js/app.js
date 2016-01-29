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
                    templateUrl: "app/partials/list.html",
                    controller: 'RepoListCtrl'
                })
                .state('detailed', {
                    url: "/detailed/:user/:repo",
                    templateUrl: "app/partials/detail.html",
                    controller: 'RepoDetailCtrl'
                })

                .state('favorites', {
                    url: "/favorites",
                    templateUrl: "app/partials/fav-list.html",
                    controller: 'RepoFavoriteCtrl'
                })
                .state('contact', {
                    url: "/contact",
                    templateUrl: "app/partials/contact.html"
                });

            $urlRouterProvider.otherwise('/repos');
        });
})();