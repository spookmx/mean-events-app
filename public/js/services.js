angular.module('eventService', [])
	.factory('Events', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/events');
			},
			create : function(eventData) {
				return $http.post('/api/events', eventData);
			},
			delete : function(id) {
				return $http.delete('/api/events/' + id);
			},
            getEvent : function(id) {
				return $http.get('/api/events/'  + id);
			},
            updateEvent : function(id, eventData) {
				return $http.post('/api/events/'+id, eventData);
			}
		}
	}]);