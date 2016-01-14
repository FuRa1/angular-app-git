'use strict';

/* Controllers */
var gitAppControllers = angular.module('gitAppControllers', []);

gitAppControllers.controller('RepoListCtrl', ['$scope', '$http', '$localStorage', '$rootScope', function ($scope, $http, $localStorage, $rootScope, $timeout, $stateParams) {
    console.log($rootScope);
    $scope.getRepositories = function (code) {
        console.log(code);
        if (code == 13) {
            console.log(code);
            $http.get('https://api.github.com/users/' + $scope.user + '/repos').success(function (data) {
                $localStorage.currentUser = $scope.user;
                $localStorage.repositories = data;
                $scope.repositories = data;
            });

        }
    };
    var favSize = $("#favSize");

    function counter() {
        console.log($localStorage);
        if ($localStorage.favoriteRepositories.length > 0) {
            favSize.html($localStorage.favoriteRepositories.length);
        } else {
            favSize.html("");
        }
    }

    $scope.user = $localStorage.currentUser;
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
        counter();
    };
    counter();
}
])
;

gitAppControllers.controller('RepoDetailCtrl', ['$scope', '$stateParams', '$http', function ($scope, $stateParams, $http) {
    $http.get('https://api.github.com/repos/' +$stateParams.user + "/" + $stateParams.repo).success(function (data) {
        $scope.repository = data;
    });
}]);

gitAppControllers.controller('RepoFavoriteCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
    $scope.repositories = $localStorage.favoriteRepositories;
    $scope.rmvRepo = function (repo) {
        for (var i = $localStorage.favoriteRepositories.length - 1; i >= 0; i--) {
            if ($localStorage.favoriteRepositories[i].id == repo.id) {
                $localStorage.favoriteRepositories.splice(i, 1);
                console.log(repo.id + " deleted");
                counter();
                break;
            }
        }
    };
    var favSize = $("#favSize");
    function counter() {
        console.log($localStorage);
        if ($localStorage.favoriteRepositories.length > 0) {
            favSize.html($localStorage.favoriteRepositories.length);
        } else {
            favSize.html("");
        }
    }

}
]);