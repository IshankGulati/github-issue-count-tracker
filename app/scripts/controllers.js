'use strict';

angular.module('issuesApp')

.controller('IndexController', ['$scope', 'issuesFactory', 'sharedUrlFactory', function($scope, issuesFactory, sharedUrlFactory) {
    $scope.message = 'Loading...';
    $scope.success = false;
    $scope.numTotalIssues = 0;
    $scope.num24hrIssues = 0;
    $scope.num7dayTo24hrIssues = 0;
    $scope.numAfter7dayIssues = 0;

    // date a month ago
    var dateMonth = new Date();
    dateMonth.setMonth(dateMonth.getMonth() - 1);

    // date a week ago
    var dateWeek = new Date();
    dateWeek.setDate(dateWeek.getDate() - 7);

    // date 24 hrs ago
    var date24hr = new Date();
    date24hr.setDate(date24hr.getDate() -1);

    var totalIssues = 0;
    var issues24hr = 0;
    var issues7days = 0;

    $scope.$on('validatedCountRequest', function(){
        // reset count
        $scope.numTotalIssues = 0;
        $scope.num24hrIssues = 0;
        $scope.num7dayTo24hrIssues = 0;
        $scope.numAfter7dayIssues = 0;

        totalIssues = 0;
        issues24hr = 0;
        issues7days = 0;

        // hit api
        getIssuesCount(1);
    });


    var getIssuesCount = function(pageNo) {

        issuesFactory.query({
            organisation : sharedUrlFactory.getRepoOrg(),
            repository : sharedUrlFactory.getRepoName(),
            page : pageNo
        }).$promise.then(
            function(response) {
                for (var key in response) {
                    if (response.hasOwnProperty(key)) {
                        // if issue not a pull request
                        if (!response[key].pull_request) {
                            totalIssues += 1;
                            var issueDate = new Date(response[key].created_at);
                            // if issue was opened in last 24 hrs
                            if (issueDate.getTime() > date24hr.getTime()) {
                                issues24hr += 1;
                                issues7days += 1;
                            }
                            // if issue was opened in last week
                            else if (issueDate.getTime() > dateWeek.getTime()) {
                                issues7days += 1;
                            }
                        }
                    }
                }
                if (response.length < 100) {
                    // attach the count to scope
                    $scope.success = true;
                    $scope.numTotalIssues = totalIssues;
                    $scope.num24hrIssues = issues24hr;
                    $scope.num7dayTo24hrIssues = issues7days - issues24hr;
                    $scope.numAfter7dayIssues = totalIssues - issues7days;
                }
                else {
                    // hit api for next page
                    getIssuesCount(pageNo += 1);
                }
            },
            function(response) {
                $scope.message = 'Error: ' + response.status + '  ' + response.statusText;
            }
        );
    };
}])

.controller('HeaderController', ['$scope', '$rootScope', 'sharedUrlFactory', function($scope, $rootScope, sharedUrlFactory) {
    $scope.urlNotValidated = true;

    // when go button is clicked set the url in shared service obtained from text box and
    // broadcast event to all the children
    $scope.refreshCount = function() {
        var splittedRepoName = $scope.repoName.split('/');
        sharedUrlFactory.setUrl(splittedRepoName[0], splittedRepoName[1]);
        $rootScope.$broadcast('validatedCountRequest');
    };

    // method sor validating repository name entered in text box
    $scope.validateRepoName = function () {
        if ($scope.repoName !== ''){
            var splittedRepoName = $scope.repoName.split('/');
            if (splittedRepoName.length === 2 && splittedRepoName[0] !== '' && splittedRepoName[1] !== '') {
                $scope.urlNotValidated = false;
                return true;
            }
        }
        $scope.urlNotValidated = true;
        return false;
    };
}])
;