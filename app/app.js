'use strict';

// Declare app level module which depends on views, and components
angular.module('githubApp', [
  'ngRoute',
  'ui.router',
  'githubApp.github'
])


.config([
  '$urlRouterProvider',
  function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('github');
  }
]);
