'use strict';

/* Controllers */
var gitAppControllers = angular.module('gitAppControllers', []);

gitAppControllers.controller('RepoListCtrl', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    $http.get('https://api.github.com/users/fura1/repos').success(function (data) {
        console.log(data);
        $scope.repositories = data;
    });
    if(!_.isArray($localStorage.list)){
        $localStorage.list =[];
        console.log($localStorage.list);
    }
    $scope.addRepo = function (repo) {
        $localStorage.list.push(repo);
        console.log($localStorage.list);

     }
}]);

gitAppControllers.controller('RepoDetailCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $http.get('https://api.github.com/repos/' + $routeParams.user + "/" + $routeParams.repo).success(function (data) {
        $scope.repository = data;
    });
}]);
gitAppControllers.controller('RepoFavoriteCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
    console.log($localStorage.list);
    $scope.favorits = $localStorage.list;
    console.log($scope.favorits);
}
]);