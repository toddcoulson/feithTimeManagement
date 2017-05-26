app.controller('FilterController', ['$filter', '$routeParams', '$rootScope', '$scope',
                                    '$q','coreService',
                                    function ($filter, $routeParams, $rootScope, $scope, $q, coreService)
                                    {
                                        $scope.core = coreService;
                                        $scope.init = function(){
                                        };
                                        $scope.init();
                                    }]);