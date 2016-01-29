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
            console.log("lodash array create");
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

            console.log("init " + repo.id);

            var id = repo.id;

            if ($localStorage.favoriteRepositories.length === 0) {
                $localStorage.favoriteRepositories.push(repo);
                console.log(id + " added")
            } else {
                for (var i = $localStorage.favoriteRepositories.length - 1; i >= 0; i--) {
                    console.log(i);
                    if ($localStorage.favoriteRepositories[i].id === repo.id) {
                        $localStorage.favoriteRepositories.splice(i, 1);
                        console.log(id + " removed");
                        break;
                    } else if (i === $localStorage.favoriteRepositories.length - 1) {
                        $localStorage.favoriteRepositories.push(repo);
                        console.log(id + " added");
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

    /*

     added: function (name) {
     var ad = this;
     console.log("services");
     ad.name = name;
     ad.before = "\<div class=\"alert alert-success\"> <a href=\"#\" class=\"close fade in\" data-dismiss=\"alert\" aria-label=\"close\">\&times;</a><strong>Added!</strong> Repository ";
     ad.after = " added to favorite list" + "\</div>";
     return ad.before + name + ad.after;
     },

     removed: function (name) {
     var rmv = this;

     rmv.name = name;
     rmv.before = "\<div class=\"alert alert-info\"> <a href=\"#\" class=\"close fade in\" data-dismiss=\"alert\" aria-label=\"close\">\&times;</a><strong>Removed!</strong> Repository ";
     rmv.after = " removed from favorite list" + "\</div>";
     return rmv.before + name + rmv.after;
     },
     counter: function (size) {
     var favSize = $("#favSize");
     if (size > 0) {
     favSize.html(size);
     } else {
     favSize.html("");
     }
     }
     }
     }
     */
})
()



