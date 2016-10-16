'use strict';

angular.module('issuesApp', ['ui.router', 'ngResource'])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider

    // route for home page
    .state('app', {
        url:'/',
        views: {
            'header' : {
                templateUrl : 'views/header.html',
                controller : 'HeaderController'
            },
            'content' : {
                templateUrl : 'views/home.html',
                controller : 'IndexController'
            },
            'footer' : {
                templateUrl : 'views/footer.html'
            }
        }
    });

    // route to home page
    $urlRouterProvider.otherwise('/');
});