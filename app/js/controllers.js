(function () {
    'use strict';

    angular
        .module('gitAppControllers', [])
        .controller('RepoListCtrl', RepoListCtrl)
        .controller('RepoDetailCtrl', RepoDetailCtrl)
        .controller('RepoFavoriteCtrl', RepoFavoriteCtrl);

    RepoListCtrl.$inject = ['$scope', 'storage'];
    RepoDetailCtrl.$inject = ['$scope', 'storage', '$stateParams', '$http'];
    RepoFavoriteCtrl.$inject = ['$scope', 'storage'];

    function RepoListCtrl($scope, storage) {


        $scope.getRequest = getRequest;
        $scope.checkRepo = checkRepo;
        $scope.user = user();
        $scope.repositories = repositories();

        function user() {
            return storage.getUser();
        }

        function repositories() {
            return storage.getRepositories();
        }

        function checkRepo(repo) {
            return storage.setFavoriteRepositories(repo)
        }

        function getRequest(event) {

            if (event.keyCode === 13) {

                storage.httpGetRequest($scope.user)

                    .then(function (data) {
                        $scope.repositories = data;
                    }
                )
            }
        }
    }

    function RepoDetailCtrl($scope, storage) {

        $scope.repository = getDetail();

        function getDetail() {
            return storage.getDetailRepository()
        }
    }

    function RepoFavoriteCtrl($scope, storage) {


        $scope.checkRepo = markRepo;
        $scope.repositories = repositories();

        function repositories() {
            return storage.getFavoriteRepositories()
        }

        function markRepo(repo) {
            return storage.setFavoriteRepositories(repo);
        }
    }
})();