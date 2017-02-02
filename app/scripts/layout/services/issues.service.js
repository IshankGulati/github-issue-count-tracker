(function(){
  'use strict';
  
  angular
    .module('issuesApp.layout.services')
    .factory('IssuesFactory', IssuesFactory);

  IssuesFactory.$inject = ['$resource'];

  function IssuesFactory($resource) {
    return $resource('https://api.github.com/repos/:organisation/:repository/issues');
  }
})();