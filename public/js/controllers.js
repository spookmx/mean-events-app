var eventController = angular.module('eventController', []);
eventController.controller('homeController', ['$scope', '$http', 'Events', function ($scope, $http, Events) {
    $scope.loading = true;
    $scope.$on('$routeChangeStart', function (event) {
        $scope.loading = true;
    });
    // GET 
    Events.get()
        .success(function (data) {
            $scope.events = data;
            $scope.loading = false;
        });

    // DELETE
    $scope.deleteEvent = function (id) {
        $scope.loading = true;

        Events.delete(id)
            // Once deleted get all the list of events
            .success(function (data) {
                $scope.loading = false;
                $scope.events = data;
            });
    };
	}]);

eventController.controller('eventAddController', ['$scope', '$http', 'Events', '$timeout', function ($scope, $http, Events, $timeout) {
    $scope.formData = {};
    $scope.success = false;
    $scope.$on('$routeChangeStart', function (event) {
        $scope.loading = true;
    });

    $scope.dateStartChange = function () {
        if ($scope.formData.dateEnd == null || $scope.formData.dateEnd.getTime() < $scope.formData.dateStart.getTime()) {
            $scope.formData.dateEnd = $scope.formData.dateStart;
        }
    };

    $scope.dateEndChange = function () {
        if ($scope.formData.dateStart == null) {
            $scope.formData.dateStart = $scope.formData.dateEnd;
        }
    };

    $scope.createEvent = function () {

        // CREATE

        // There should be at least a title
        if ($scope.formData.title != undefined) {
            $scope.loading = true;
            Events.create($scope.formData)

            // Once created load the list
            .success(function (data) {
                $scope.loading = false;
                $scope.formData = {};
                $scope.eventForm.$setUntouched();
                $scope.events = data;
                $scope.success = true;
            });
        }
    };

}]);

eventController.controller('eventEditController', ['$scope', '$routeParams', '$http', 'Events', function ($scope, $routeParams, $http, Events) {

    $scope.formData = {};
    $scope.success = false;
    $scope.$on('$routeChangeStart', function (event) {
        $scope.loading = true;
    });

    $scope.dateStartChange = function () {
        //Consider the start date as the master and help the user to autofit the end date
        if ($scope.formData.dateEnd == null || $scope.formData.dateEnd.getTime() < $scope.formData.dateStart.getTime()) {
            $scope.formData.dateEnd = $scope.formData.dateStart;
        }
    };

    $scope.dateEndChange = function () {
        //If user selected the end date and no start is set, help and set the start on the same date
        if ($scope.formData.dateStart == null) {
            $scope.formData.dateStart = $scope.formData.dateEnd;
        }
    };

    Events.getEvent($routeParams.alias)
        .success(function (data) {
            //Json strings have to be changed to dates again
            data.dateStart = new Date(data.dateStart);
            data.dateEnd = new Date(data.dateEnd);
            //Assign received data to corresponding object
            $scope.formData = data;
            $scope.loading = false;
        });

    $scope.updateEvent = function () {
        $scope.loading = true;
        Events.updateEvent($routeParams.alias, $scope.formData)
            .success(function (data) {
                $scope.loading = false;
                $scope.success = true;
            });
    };

	}]);