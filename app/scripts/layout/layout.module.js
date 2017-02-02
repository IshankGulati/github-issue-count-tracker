(function(){
  'use strict';
  
  angular
    .module('issuesApp.layout', [
      'issuesApp.layout.controllers',
      'issuesApp.layout.services',
    ]);

  angular
    .module('issuesApp.layout.controllers', []);

  angular
    .module('issuesApp.layout.services', [
      'ngResource'
    ]);
})();