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
    $scope.searching = true;
    $scope.gotouser = $state.params.username;

    Github.getRepo({
      username: $state.params.username
    })
    .$promise.then(function (data) {
      $scope.repoData = data;
      $scope.searching = false;
    });

    $scope.showRepoDetails = function (reponame) {
      $state.go('github.user.repo.details', { reponame: reponame });
      $scope.showRepo = false;
    };

    $scope.gotoUser = function (reponame) {
      $state.go('^', { reponame: reponame });
      $scope.showUser = true;
      console.log($scope.showUser);
    };

  }
]);

