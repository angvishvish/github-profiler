'use strict';

angular.module('githubApp.github-repo-details', [
  'ngRoute',
  'ui.router',
  'ngResource',
  'ui.bootstrap'
])

.config([
  '$stateProvider',
    function ($stateProvider) {
      $stateProvider.state('github.user.repo.details', {
        url: '/:reponame',
        templateUrl: 'github-repo-details/github-repo-details.html',
        controller: 'githubRepoDetailsCtrl'
      });
    }
  ]
)

.controller('githubRepoDetailsCtrl', [
    '$scope', '$state', 'Github',
    function ($scope, $state, Github ) {

      Github.getRepoDetails({
        owner: $state.params.username,
        repo: $state.params.reponame
      })
      .$promise.then(function (data) {
        $scope.repoDetails = data;
      });
    }
  ]
);