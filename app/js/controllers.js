'use strict';

/* Controllers */
var gitAppControllers = angular.module('gitAppControllers', []);

gitAppControllers.controller('RepoListCtrl', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {

    $scope.getRepositories = function () {
        $http.get('https://api.github.com/users/' + $scope.user + '/repos').success(function (data) {
            $localStorage.currentUser = $scope.user;
            $localStorage.repositories = data;
            $scope.repositories = data;
            console.log(data);
        });

    };
    $scope.repositories = $localStorage.repositories;

    if (!_.isArray($localStorage.favoriteRepositories)) {
        $localStorage.favoriteRepositories = [];
    }

    $scope.addRepo = function (repo) {
        if ($localStorage.favoriteRepositories.length == 0) {
            $localStorage.favoriteRepositories.push(repo);
            console.log(repo.id + " added");
        } else {
            for (var i = $localStorage.favoriteRepositories.length - 1; i >= 0; i--) {
                if ($localStorage.favoriteRepositories[i].id == repo.id) {
                    $localStorage.favoriteRepositories.splice(i, 1);
                    console.log(repo.id + " deleted");
                    break;
                } else if (i == $localStorage.favoriteRepositories.length - 1) {
                    $localStorage.favoriteRepositories.push(repo);
                    console.log(repo.id + " added");
                    break;
                }

            }
        }

    };
    console.log($localStorage);
}]);

gitAppControllers.controller('RepoDetailCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $http.get('https://api.github.com/repos/' + $routeParams.user + "/" + $routeParams.repo).success(function (data) {
        $scope.repository = data;
    });
}]);
gitAppControllers.controller('RepoFavoriteCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
    $scope.repositories = $localStorage.favoriteRepositories;
}
]);