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
      url: '/:repo',
      templateUrl: 'github-repo/github-repo.html',
      controller: 'githubRepoCtrl',
    });

  }
])

.controller('githubRepoCtrl', [
  '$scope', '$state', 'Github',
  function($scope, $state, Github) {

    Github.getRepo({
      username: $state.params.username
    })
    .$promise.then(function (data) {
      $scope.repoData = data;
    });

    $scope.showRepoDetails = function (reponame) {
      $state.go('github.user.repo.details', { reponame: reponame });
      $scope.showRepo = false;
    };

  }
]);

