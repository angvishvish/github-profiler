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
      getRepo: {
        method: 'GET',
        isArray: true,
        url: apiURL + '/users/:username/repos',
        headers: { 'Authorization': 'Bearer ' + accessToken }
      },
      getRepoDetails: {
        method: 'GET',
        url: apiURL + '/repos/:owner/:repo/languages',
        headers: { 'Authorization': 'Bearer ' + accessToken }
      },
      getAllUsers: {
        method: 'GET',
        isArray: true,
        url: apiURL + '/users',
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

    $scope.searchresult = $scope.searchresult || [];
    $scope.requestedUsername = 'socialschools';
    $scope.showSearchResult = true;
    $scope.showUser = false;
    $scope.showRepoDetails = false;

    // search for a user
    $scope.doSearch = function() {
      $state.go('github', { });
      Github.searchUser({
        q: $scope.requestedUsername
      })
      .$promise.then(function (data) {
        $scope.searchresult = data;
        $scope.showSearchResult = true;
        $scope.showUser = false;
        $scope.showRepo = false;
        $scope.showRepoDetails = false;
      }, function (error) {
        $scope.errorfound = error;
      });
    };

    // shows all the repo for a particular user
    $scope.showUserDetails = function (username) {
      $state.go('github.user', { username: username });
      $scope.showSearchResult = false;
      $scope.showUser = true;
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
