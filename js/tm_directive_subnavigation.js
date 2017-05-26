app.directive('subNav', function ($rootScope) {
    return {
        scope: {
            nav: '=',
            project: '=',
            phase: '=',
            root: '@'
        },
        controller: function ($scope, $rootScope, $element, $attrs, $location,
                               coreService, $routeParams) {
            $scope.core = coreService;
            $scope.gotoSection = function(p){
                if($scope.root === 'true'){
                    $scope.core.newLocation(-1, -1, p, true);
                }else{
                    if(typeof($routeParams.project_id) !== "undefined" &&
                       typeof($routeParams.phase_id) !== "undefined"){
                        $scope.core.newLocation($routeParams.project_id, $routeParams.phase_id, p,
                                                false);
                    }else if(typeof($routeParams.project_id) !== "undefined" &&
                             typeof($routeParams.phase_id) === "undefined"){
                        $scope.core.newLocation($routeParams.project_id, -1, p, false);
                    }else if(typeof($routeParams.project_id) === "undefined" &&
                             typeof($routeParams.phase_id) === "undefined"){
                        $scope.core.newLocation(-1, -1, p);
                    }
                }
            };
            $scope.path = function(nav) {
                if (($location.$$path.indexOf(nav.path) > -1 && nav.path != '/') ||
                    ($location.$$path == nav.path + "projects" && nav.path == '/')) {
                    return 'active';
                }
                return '';
            };
        },
        restrict:"E",
        replace: true,
        templateUrl: obj + 'tm_template_sections_nav.html'
    };
});