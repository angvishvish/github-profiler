'use strict';

// Declare app level module which depends on views, and components
angular.module('angularApp', [
  'ngRoute',
  'ui.router',
  'angularApp.github',
  'angularApp.github-repo'
])


.config([
  '$urlRouterProvider',
  function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('github');
  }
]);
