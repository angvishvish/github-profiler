'use strict';

angular.module('angularApp.github-repo', [
  'ngRoute',
  'ui.router',
  'ngResource',
  'ui.bootstrap'
])

.config([
  '$stateProvider',
  function($stateProvider) {

    $stateProvider.state('github.detail', {
      url: '/:username',
      templateUrl: 'github-repo/github-repo.html',
      controller: 'githubRepoCtrl',
    });

  }
])

.controller('githubRepoCtrl', [
  '$scope', '$resource', 'Github',
  function($scope, $resource, Github) {
    // shows all the repo for a particular user
    $scope.showRepo = function (username) {
        Github.getRepo({
        username: $scope.requestedUsername
      })
      .$promise.then(function (data) {
        $scope.repoData = data;
      });
    };

  }
]);

