'use strict';

// Declare app level module which depends on views, and components
angular.module('githubApp', [
  'ngRoute',
  'ui.router',
  'githubApp.github',
  'githubApp.github-user',
  'githubApp.github-repo'
])


.config([
  '$urlRouterProvider',
  function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('github');
  }
]);
