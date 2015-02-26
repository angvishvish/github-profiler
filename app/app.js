'use strict';

// Declare app level module which depends on views, and components
angular.module('angularApp', [
  'ngRoute',
  'angularApp.github',
  'angularApp.github-repo'
])

.config([
  '$routeProvider',
  function($routeProvider) {

    $routeProvider.otherwise({
        redirectTo: '/github'
      }
    );

  }
]);
