app.directive('breadcrumb', function ($rootScope) {
    return {
        scope: {
            project: '=',
            phase: '=',
            level: '@'
        },
        controller: function ($scope, $rootScope, $element, $attrs, $location,
                               coreService) {
            $scope.core = coreService;
        },
        restrict:"E",
        replace: true,
        templateUrl: obj + 'tm_template_breadcrumb.html'
    };
});