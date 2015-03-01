'use strict';

angular.module('angularApp.github-user', [
  'ngRoute',
  'ui.router',
  'ngResource',
  'ui.bootstrap'
])

/**
 * Config
 */

.config([
  '$stateProvider',
  function($stateProvider) {

    $stateProvider.state('github.user', {
      url: '/:username',
      templateUrl: 'github-repo/github-user.html',
      controller: 'githubUserCtrl',
    });

  }
])

/**
 * Authorizations resource
 */

.factory('Github', [
  '$resource',
  function ($resource) {


}]);