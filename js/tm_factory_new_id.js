app.factory('GetNewIdService', ['$http', '$q', function($http, $q) {
    var GetNewIdService = {
        returnUniqueID: function() {
            var deferred = $q.defer();
            $http({
                url: sql + 'getTmNextTimeEntryID',
                method: 'GET'
            }).then(function(response) {
                if (response.data.success) {
                    GetNewIdService.newID = response.data.resultSet[0].time_entry_id;
                }
                deferred.resolve();
            });
            return deferred.promise;
        },
        newID:0
    }
    return GetNewIdService;
}]);