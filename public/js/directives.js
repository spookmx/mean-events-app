angular.module('eventDirective', []).directive('ngEvent', function () {
    return {
        restrict: 'A',
        require: '^ngModel',
        replace: true,
        templateUrl: 'partials/event-directive.html',
        link: function(scope, elem, attrs) {
            //Todo
        }
    };
});