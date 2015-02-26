'use strict';

angular.module('angularApp.github', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap'
])


/**
 * Authorizations resource
 */

.factory('Github', [
  '$resource',
  function ($resource) {
    var apiURL = 'https://api.github.com';
    var accessToken = '--';
    var config = {
      getuser: {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + accessToken }
      },
      getAllUsers: {
        method: 'GET',
        isArray: true,
        url: apiURL + '/users',
        headers: { 'Authorization': 'Bearer ' + accessToken }
      },
      getRepo: {
        method: 'GET',
        isArray: true,
        url: apiURL + '/users/:username/repos',
        headers: { 'Authorization': 'Bearer ' + accessToken }
      }
    };
    return $resource(apiURL + '/users/:username', { username: '@username' }, config);
  }
])


.config([
  '$routeProvider',
  function($routeProvider) {

    $routeProvider.when('/github', {
      templateUrl: 'github/github.html',
      controller: 'GithubCtrl'
    });
    $routeProvider.when(
      '/:username', {
        templateUrl: '/app/github-repo/github-repo.html',
        controller: 'githubRepoCtrl'
      }
    );

  }
])

.controller('GithubCtrl', [
  '$scope', '$resource', 'Github', '$location',
  function($scope, $resource, Github, $location) {

    $scope.requestedUsername = 'chriscoyier';
    $scope.userimage = true;

    $scope.doSearch = function() {
      $scope.userimage = $scope.errorfound = false;
      $scope.avatar_url = 'github/loading.gif';
       Github.getuser({
          username: $scope.requestedUsername
       })
       .$promise.then(function (data) {
        $scope.userData = data;
       }, function (error) {
        $scope.userimage = true;
        $scope.avatar_url = false;
        $scope.errorfound = error;
       });
    };

    // get all users
    $scope.allUser = function () {

      Github.getAllUsers()
      .$promise.then(function (data) {
        $scope.users = data;
      });
    };

    $scope.showRepo = function (path) {
      $location.path(path);
      Github.getRepo({
        username: $scope.requestedUsername
      })
      .$promise.then(function (data) {
        $scope.repoData = data;
        // $state.go('github-repo', { username: $scope.requestedUsername });
      });
    };

}])

.directive('searchbox', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/app/github/search-box.html'
  };
})

.directive('userdetails', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/app/github/user-details.html'
  };
});
