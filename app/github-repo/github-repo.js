'use strict';

angular.module('githubApp.github-repo', [
  'ngRoute',
  'ui.router',
  'ngResource',
  'ui.bootstrap'
])

.config([
  '$stateProvider',
  function($stateProvider) {

    $stateProvider.state('github.user.repo', {
      url: '/repo',
      templateUrl: 'github-repo/github-repo.html',
      controller: 'githubRepoCtrl',
    });

  }
])

.controller('githubRepoCtrl', [
  '$scope', '$state', 'Github',
  function($scope, $state, Github) {

    // shows all the repo for a particular user
    $scope.showRepo = function () {
        Github.getRepo({
        username: $state.params.username
      })
      .$promise.then(function (data) {
        $scope.repoData = data;
      });
    };

  }
]);

