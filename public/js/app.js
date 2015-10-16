var myEventApp = angular.module('myEventApp', ['ngRoute', 'eventController', 'eventService', 'ngAnimate', 'eventDirective']);

myEventApp.config(['$routeProvider',
  function ($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/home.html',
            controller: 'homeController',
            resolve: {
                //Adding a delay to set an expectation that something is loading in case sometimes it actually takes time to load 
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        }).
        when('/event/edit/:alias', {
            templateUrl: 'partials/event-edit.html',
            controller: 'eventEditController',
            resolve: {
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        }).
        when('/event/add', {
            templateUrl: 'partials/event-add.html',
            controller: 'eventAddController',
            resolve: {
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        }).
        when('/event/:alias', {
            templateUrl: 'partials/event-view.html',
            controller: 'eventViewController',
            resolve: {
                delay: function ($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 1000);
                    return delay.promise;
                }
            }
        }).
        otherwise({
            redirectTo: '/'
        });
  }]);