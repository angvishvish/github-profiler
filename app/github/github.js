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
    };
    return $resource(apiURL + '/users/:username', { }, config);
  }
])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/github', {
    templateUrl: 'github/github.html',
    controller: 'GithubCtrl'
  });
}])

.controller('GithubCtrl', [
  '$scope', '$resource', 'Github',
  function($scope, $resource, Github) {

    $scope.requestedUsername = 'chriscoyier';
    $scope.userimage = true;

    $scope.doSearch = function() {
      $scope.userimage = false;
      $scope.avatar_url = 'github/loading.gif';
      $scope.userData = Github.getuser({
        username: $scope.requestedUsername
      });
    };

    // get all users
    $scope.allUser = function () {
      $scope.allavatar_url = 'github/loading.gif';
      $scope.promise = Github.getAllUsers().$promise.then(function (data) {
        $scope.users = data;
      });
    };

}]);
