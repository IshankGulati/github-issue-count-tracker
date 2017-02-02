(function(){
  'use strict';

  angular
    .module('issuesApp.layout.services')
    .factory('GithubUrlFactory', GithubUrlFactory);

  function GithubUrlFactory() {

    var GithubUrlFactory = {
      setUrl: setUrl,
      getRepoOrg: getRepoOrg,
      getRepoName: getRepoName
    };
    var repoOrg = '';
    var repoName = '';

    return GithubUrlFactory;

    function setUrl(org, name){
      repoOrg = org;
      repoName = name;
    }

    function getRepoName() {
      return repoName;
    }

    function getRepoOrg() {
      return repoOrg;
    }
  }
})();