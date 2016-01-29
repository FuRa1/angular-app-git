(function () {
    'use strict';

    angular
        .module('gitAppControllers')
        .factory('storage', storage);

    storage.$inject = ['$http', '$localStorage', '$stateParams'];

    function storage($http, $localStorage, $stateParams) {

        var services = {
            httpGetRequest: httpGetRequest,
            getUser: getUser,
            setUser: setUser,
            setRepositories: setRepositories,
            getRepositories: getRepositories,
            getFavoriteRepositories: getFavoriteRepositories,
            setFavoriteRepositories: setFavoriteRepositories,
            getDetailRepository: getDetailRepository
        };

        if (!_.isArray($localStorage.favoriteRepositories)) {
            $localStorage.favoriteRepositories = [];
        }

        return services;

        function getUser() {
            return $localStorage.currentUser
        }

        function setUser(user) {
            $localStorage.currentUser = user;
        }

        function httpGetRequest(user) {
            setUser(user);
            var url = 'https://api.github.com/users/' + user + '/repos';
            return $http.get(url)
                .then(function (response) {
                    setRepositories(response.data);
                    return response.data
                });
        }

        function setRepositories(repositories) {
            $localStorage.httpRepos = repositories;
        }

        function getRepositories() {
            return $localStorage.httpRepos;
        }

        function getFavoriteRepositories() {
            return $localStorage.favoriteRepositories;
        }

        function setFavoriteRepositories(repo) {

            var id = repo.id;
            var favorites = $localStorage.favoriteRepositories;

            if (favorites.length === 0) {
                favorites.push(repo);

                console.log("Repository id: "+ id + " ADDED to favorites");

            } else {

                for (var i = favorites.length - 1; i >= 0; i--) {
                    if (favorites[i].id === id) {
                        favorites.splice(i, 1);
                        $localStorage.favoriteRepositories = favorites;

                        console.log("Repository id: "+ id + " DELETED from favorites");

                        break;
                    }
                    if (i === 0) {
                        favorites.push(repo);
                        $localStorage.favoriteRepositories = favorites;

                        console.log("Repository id: "+ id + " ADDED to favorites");

                        break;
                    }
                }
            }
        }

        function getDetailRepository() {
            var repository = null;
            var fullName = $stateParams.user + "/" + $stateParams.repo;

            for (var i = $localStorage.httpRepos.length - 1; i >= 0; i--) {
                if ($localStorage.httpRepos[i].full_name === fullName) {
                    repository = $localStorage.httpRepos[i];
                }
            }
            return repository;
        }
    }
})
()



