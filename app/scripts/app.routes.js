(function(){
  'use strict';
  
  angular
    .module('issuesApp.routes', ['ui.router'])
    .config(config);

  config.$inject = ['$stateProvider', '$urlRouterProvider'];

  function config($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        // route for home page
        url:'/',
        views: {
          'header': {
            templateUrl : 'views/layout/header.html',
            controller : 'HeaderController',
            controllerAs : 'vm'
          },
          'content': {
            templateUrl : 'views/layout/home.html',
            controller : 'IndexController',
            controllerAs : 'vm'
          },
          'footer': {
            templateUrl : 'views/layout/footer.html',
          }
        }
      });
    // route to home page
    $urlRouterProvider.otherwise('/');
  }
})();