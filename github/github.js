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
    // Enter your access token here
    var config = {
      searchUser: {
        method: 'GET',
        url: apiURL + '/search/users',
        q: '@q',
      },
      getuser: {
        method: 'GET',
      },
      getRepo: {
        method: 'GET',
        isArray: true,
        url: apiURL + '/users/:username/repos',
      },
      getRepoDetails: {
        method: 'GET',
        url: apiURL + '/repos/:owner/:repo/languages',
      },
      getAllUsers: {
        method: 'GET',
        isArray: true,
        url: apiURL + '/users',
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
    $scope.requestedUsername = "angvish";
    $scope.searching = false;
    $scope.showSearchResult = true;
    $scope.showUser = false;
    $scope.showRepoDetails = false;

    // search for a user
    $scope.doSearch = function() {
      $state.go('github', { });
      $scope.searching = true;

      Github.searchUser({
        q: $scope.requestedUsername
      })
      .$promise.then(function (data) {
        $scope.searchresult = data;
        $scope.showSearchResult = true;
        $scope.showUser = false;
        $scope.showRepo = false;
        $scope.searching = false;
        $scope.showRepoDetails = false;
      }, function (error) {
        $scope.errorfound = error;
      });
    };

    // shows all the repo for a particular user
    $scope.showUserDetails = function (username) {
      $scope.showSearchResult = false;
      $scope.showUser = true;

      $state.go('github.user', { username: username });

      Github.getuser({
        username: username
      })
      .$promise.then(function (data) {
        $scope.userData = data;
        $scope.showUser = true;
        $scope.searching = false;
      }, function (error) {
        $scope.errorfound = error;
      });
    };
}])

.directive('searchbox', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'github/search-box.html'
  };
})

.directive('searchresult', function () {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'github/search-result.html'
  };
});
