'use strict';

angular.module('githubApp.github', [
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
      searchUser: {
        method: 'GET',
        url: apiURL + '/search/users',
        q: '@q',
        headers: { 'Authorization': 'Bearer ' + accessToken }
      },
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
        controller: 'githubCtrl'
      }
    );

}])

.controller('githubCtrl', [
  '$scope', '$resource', 'Github', '$state',
  function($scope, $resource, Github, $state) {

    $scope.requestedUsername = 'anit';
    $scope.searchresult = $scope.searchresult || [];

    // search for a user
    $scope.doSearch = function() {
      Github.searchUser({
        q: $scope.requestedUsername

      })
      .$promise.then(function (data) {
        $scope.searchresult = data;
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
    $scope.showDetails = function (username) {
      $state.go('github.user', { username: username });
      $scope.github_details = false;
    };

}])

.directive('searchbox', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/app/github/search-box.html'
  };
})

.directive('searchresult', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/app/github/search-result.html'
  };
});
