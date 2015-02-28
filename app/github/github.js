'use strict';

angular.module('angularApp.github', [
  'ngRoute',
  'ui.router',
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


/**
 * Config
 */

.config([
  '$stateProvider',
  function ($stateProvider) {

    $stateProvider.state(
      'github', {
        url: '/github',
        templateUrl: 'github/github.html',
        controller: 'GithubCtrl'
      }
    );

}])

.controller('GithubCtrl', [
  '$scope', '$resource', 'Github', '$state',
  function($scope, $resource, Github, $state) {

    $scope.requestedUsername = 'vhf';
    $scope.git_logo = true;
    $scope.show_repo = false;
    $scope.search = false;

    // search for a particular user
    $scope.doSearch = function() {
      $scope.github_details = false;
      $scope.errorfound = false;
      $scope.search = true;

      Github.getuser({
        username: $scope.requestedUsername
      })
      .$promise.then(function (data) {
        $scope.userData = data;
        $scope.show_repo = true;
      }, function (error) {
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

    // shows all the repo for a particular user
    $scope.showRepo = function (username) {
      $state.go('github.detail', { username: username });
      $scope.github_details = true;
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
