'use strict';

angular.module('angularApp.github-repo', [
  'ngRoute',
  'ngResource',
  'ui.bootstrap'
])

.controller('githubRepoCtrl', [
  '$scope', '$resource', 'Github',
  function($scope, $resource, Github) {

  }
]);
