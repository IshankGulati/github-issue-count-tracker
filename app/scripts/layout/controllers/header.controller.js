(function(){
  'use strict';

  angular
    .module('issuesApp.layout.controllers')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$rootScope', 'GithubUrlFactory'];

  function HeaderController($scope, $rootScope, GithubUrlFactory) {
    var vm = this;

    vm.urlNotValidated = true;
    vm.repoName = '';

    vm.refreshCount = refreshCount;
    vm.validateRepoName = validateRepoName;

    // when go button is clicked set the url in shared service obtained from text box and
    // broadcast event to all the children
    function refreshCount() {
      var splittedRepoName = vm.repoName.split('/');
      GithubUrlFactory.setUrl(splittedRepoName[0], splittedRepoName[1]);
      $rootScope.$broadcast('CountRequest');
    }

    // method for validating repository name entered in text box
    function validateRepoName() {
      if (vm.repoName !== ''){
        var splittedRepoName = vm.repoName.split('/');
        if (splittedRepoName.length === 2 && splittedRepoName[0] !== '' && splittedRepoName[1] !== '') {
          vm.urlNotValidated = false;
          return true;
        }
      }
      vm.urlNotValidated = true;
      return false;
    }
  }
  
})();