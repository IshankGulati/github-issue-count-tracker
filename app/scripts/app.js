(function(){
  'use strict';

  angular
    .module('issuesApp', [
      'issuesApp.routes',
      'issuesApp.config',
      'issuesApp.layout',
    ]);

  angular
    .module('issuesApp.routes', [
      'ui.router'
    ]);

  angular
    .module('issuesApp.config', []);

})();