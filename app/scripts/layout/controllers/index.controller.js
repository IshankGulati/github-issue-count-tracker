
(function(){
  'use strict';

  angular
    .module('issuesApp.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'IssuesFactory', 'GithubUrlFactory'];

  function IndexController($scope, IssuesFactory, GithubUrlFactory) {
    var vm = this;

    var totalIssues;
    var issuesWithinDay;
    var issuesWithinWeek;

    var dateMonthAgo;
    var dateWeekAgo;
    var dateDayAgo;

    init();

    function init() {
      vm.success = false;
      vm.numTotalIssues = 0;
      vm.num24hrIssues = 0;
      vm.num7dayTo24hrIssues = 0;
      vm.numAfter7dayIssues = 0;

      // date a month ago
      dateMonthAgo = new Date();
      dateMonthAgo.setMonth(dateMonthAgo.getMonth() - 1);

      // date a week ago
      dateWeekAgo = new Date();
      dateWeekAgo.setDate(dateWeekAgo.getDate() - 7);

      // date 24 hrs ago
      dateDayAgo = new Date();
      dateDayAgo.setDate(dateDayAgo.getDate() -1);

      totalIssues = 0;
      issuesWithinDay = 0;
      issuesWithinWeek = 0;
    }

    $scope.$on('CountRequest', function(){
      // reset
      init();

      // hit api
      getIssuesCount(1);
    });

    function getIssuesCount(page) {
      IssuesFactory.query({
        organisation: GithubUrlFactory.getRepoOrg(),
        repository: GithubUrlFactory.getRepoName(),
        page: page,
        per_page: 100
      })
      .$promise
      .then(IssuesSuccessFn, IssuesErrorFn);

      function IssuesSuccessFn(response) {
        for (var key in response) {
          // if issue not a pull request
          if (!response[key].pull_request && response[key].state == 'open') {
            totalIssues += 1;
            var issueDate = new Date(response[key].created_at);
            // if issue was opened in last 24 hrs
            if (issueDate.getTime() > dateDayAgo.getTime()) {
              issuesWithinDay += 1;
              issuesWithinWeek += 1;
            } else if (issueDate.getTime() > dateWeekAgo.getTime()) {
              // if issue was opened in last week
              issuesWithinWeek += 1;
            }
          }
        }

        if (response.length < 100) {
          // attach the count to object
          vm.success = true;
          vm.numTotalIssues = totalIssues;
          vm.num24hrIssues = issuesWithinDay;
          vm.num7dayTo24hrIssues = issuesWithinWeek - issuesWithinDay;
          vm.numAfter7dayIssues = totalIssues - issuesWithinWeek;
        } else {
          // hit api for next page
          getIssuesCount(page += 1);
        }
      }

      function IssuesErrorFn(response) {
        console.error(response);
        vm.success = false;
      }

    }
  }
})();