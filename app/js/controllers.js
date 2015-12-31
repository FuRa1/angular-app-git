'use strict';

/* Controllers */
var gitAppControllers = angular.module('gitAppControllers', []);

gitAppControllers.controller('RepoListCtrl', ['$scope', '$http', '$localStorage', function ($scope, $http, $localStorage) {
    $http.get('https://api.github.com/users/fura1/repos').success(function (data) {
        console.log(data);
        $scope.repositories = data;
    });
    if (!_.isArray($localStorage.list)) {
        $localStorage.list = [];
        console.log($localStorage.list);
    }
    $scope.addRepo = function (repo) {
        var repoId = "id:"+repo.id;
        var reposf = {};
        _.defaultsDeep(repo, reposf);
        console.log(reposf);
        console.log(_.get($localStorage.list, 'id', repoId));
        if (!_.has($localStorage, repoId)) {
            $localStorage.list.push(repo);
        }
        console.log($localStorage.list);
    }
    //    $localStorage.list.push(repo);


    /*
     angular.forEach($scope.repositories, function(repository) {
     if (repo.add) $localStorage.list.push(repository);
     });
     */
}]);

gitAppControllers.controller('RepoDetailCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {
    $http.get('https://api.github.com/repos/' + $routeParams.user + "/" + $routeParams.repo).success(function (data) {
        $scope.repository = data;
    });
}]);
gitAppControllers.controller('RepoFavoriteCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {
    $scope.repositories = $localStorage.list;
}
]);