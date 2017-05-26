app.factory('GetCustomersService', ['$http', '$q', function($http, $q) {
    var GetCustomersService = {
        companies: [],
        getCustomerList:function() {
            var deferred = $q.defer();
            $http({
                url: sql + 'getTmCustomerList',
                method: 'GET'
            }).then(function(response) {
                if (response.data.success) {
                    GetCustomersService.companies = response.data.resultSet;
                }
                deferred.resolve();
            });
            return deferred.promise;
        }
    }
    return GetCustomersService;
}]);