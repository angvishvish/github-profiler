'use strict';

angular.module('githubApp.github-repo-details', [
  'ngRoute',
  'ui.router',
  'ngResource',
  'ui.bootstrap'
])

.config([
  '$stateProvider',
    function ($stateProvider) {
      $stateProvider.state('github.user.repo.details', {
        url: '/:reponame',
        templateUrl: 'github-repo-details/github-repo-details.html',
        controller: 'githubRepoDetailsCtrl'
      });
    }
  ]
)

.controller('githubRepoDetailsCtrl', [
    '$scope', '$state', 'Github',
    function ($scope, $state, Github ) {

      $scope.repoDetails = $scope.repoDetails || {};
      $scope.reponame = $state.params.reponame;
      $scope.searching = true;
      $scope.noLanguage = '';

      Github.getRepoDetails({
        owner: $state.params.username,
        repo: $state.params.reponame
      })
      .$promise.then(function (data) {
        $scope.repoDetails = data;
        highchartObj($scope.repoDetails);
        $scope.searching = false;
      });

      var highchartObj = function (obj) {
        var lang_arr = [];
        var sum_of_files = 0, percentage = 0;

        for(var lang in obj) {
          if(!isNaN(parseFloat(obj[lang])) && isFinite(obj[lang])) {
            lang_arr.push([lang, obj[lang]]);
          }
        }

        // show chart when we have an array
        if (lang_arr.length) {
          showRepoLang(lang_arr);
        } else {
          $scope.noLanguage = "No language found";
        }

      };

    }
  ]
);
