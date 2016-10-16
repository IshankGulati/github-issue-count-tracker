'use strict';

angular.module('issuesApp')

.constant('baseUrl', 'https://api.github.com/repos/')


.factory('issuesFactory', ['$resource', 'baseUrl', function($resource, baseUrl) {
    return $resource(baseUrl + ':organisation/:repository/issues?per_page=100');
}])

.factory('sharedUrlFactory', function(){
    var sharedFac = {};
    var repoOrg = '';
    var repoName = '';
    sharedFac.setUrl = function (org, name){
        repoOrg = org;
        repoName = name;
    };
    sharedFac.getRepoName = function() {
        return repoName;
    };
    sharedFac.getRepoOrg = function() {
        return repoOrg;
    };
    return sharedFac;
})
;