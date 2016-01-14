'use strict';

/* Controllers */
var gitAppControllers = angular.module('gitAppControllers', []);

gitAppControllers.controller('RepoListCtrl', ['$scope', '$http', '$localStorage', '$rootScope', function ($scope, $http, $localStorage, $rootScope, $timeout, $stateParams) {
    function AlertAdded(name) {
        this.name = name;
        this.before = "\<div class=\"alert alert-success\"> <a href=\"#\" class=\"close fade in\" data-dismiss=\"alert\" aria-label=\"close\">\&times;</a><strong>Added!</strong> Repository ";
        this.after = " added to favorite list" + "\</div>";
        this.ansewer = this.before + name + this.after;
    }
    function AlertRemoved(name) {
        this.name = name;
        this.before = "\<div class=\"alert alert-info\"> <a href=\"#\" class=\"close fade in\" data-dismiss=\"alert\" aria-label=\"close\">\&times;</a><strong>Removed!</strong> Repository ";
        this.after = " removed from favorite list" + "\</div>";
        this.ansewer = this.before + name + this.after;
    }

    $scope.getRepositories = function (code) {
        if (code == 13) {
            $http.get('https://api.github.com/users/' + $scope.user + '/repos').success(function (data) {
                $localStorage.currentUser = $scope.user;
                $localStorage.repositories = data;
                $scope.repositories = data;
            });

        }
    };
    var favSize = $("#favSize");

    function counter() {
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
        var addMsg = new AlertAdded(repo.name);
        var rmvMsg = new AlertRemoved(repo.name);
        var id = "#"+repo.id;

        if ($localStorage.favoriteRepositories.length == 0) {
            $localStorage.favoriteRepositories.push(repo);
            console.log(repo.id + " added");
            $(id).after(addMsg.ansewer);
        } else {
            for (var i = $localStorage.favoriteRepositories.length - 1; i >= 0; i--) {
                if ($localStorage.favoriteRepositories[i].id == repo.id) {
                    $localStorage.favoriteRepositories.splice(i, 1);
                    console.log(repo.id + " deleted");
                    $(id).after(rmvMsg.ansewer);
                    break;
                } else if (i == $localStorage.favoriteRepositories.length - 1) {
                    $localStorage.favoriteRepositories.push(repo);
                    console.log(repo.id + " added");
                    $(id).after(addMsg.ansewer);
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

gitAppControllers.controller('RepoDetailCtrl', ['$scope', '$localStorage', '$stateParams', '$http', function ($scope, $localStorage, $stateParams, $http) {
    $http.get('https://api.github.com/repos/' + $stateParams.user + "/" + $stateParams.repo).success(function (data) {
        $scope.repository = data;
    });
    var fullName =  $stateParams.user + "/" + $stateParams.repo;
    localDetail(fullName);
    function localDetail(full_Name){
        for (var i = $localStorage.favoriteRepositories.length - 1; i >= 0; i--) {
            if ($localStorage.favoriteRepositories[i].full_name == full_Name){
                $scope.repository = $localStorage.favoriteRepositories[i];
                console.log("from local");
            }
        }
    }
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