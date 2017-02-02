/**
 * GithubUrlFactory
 * @namespace issuesApp.layout.services
 */
(function(){
  'use strict';

  angular
    .module('issuesApp.layout.services')
    .factory('GithubUrlFactory', GithubUrlFactory);

  /**
   * @namespace GithubUrlFactory
   * @returns {Factory}
   */
  function GithubUrlFactory() {

    var GithubUrlFactory = {
      setUrl: setUrl,
      getRepoOrg: getRepoOrg,
      getRepoName: getRepoName
    };
    var repoOrg = '';
    var repoName = '';

    return GithubUrlFactory;

    /**
     * @name setUrl
     * @desc sets the name of organization and repo
     * @memberOf issuesApp.layout.services.GithubUrlFactory
     */
    function setUrl(org, name){
      repoOrg = org;
      repoName = name;
    }

    /**
     * @name getRepoName
     * @desc returns the name of repo
     * @returns {string} name of repo
     * @memberOf issuesApp.layout.services.GithubUrlFactory
     */
    function getRepoName() {
      return repoName;
    }

    /**
     * @name getRepoOrg
     * @desc returns organization name
     * @returns {string} name of org
     * @memberOf issuesApp.layout.services.GithubUrlFactory
     */
    function getRepoOrg() {
      return repoOrg;
    }
  }
})();