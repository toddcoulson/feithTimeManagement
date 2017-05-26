app.directive('projectDisplay', function ($rootScope) {
    return {
        scope: {
            projects: '='
        },
        controller: function ($scope, $rootScope, $element, $attrs, $location,
                               coreService, projectService) {
            $scope.prs = projectService;
            $scope.updateProjectHours = function(){
                angular.forEach($scope.projects , function(project) {
                    $scope.prs.getHoursWorkedProject(project.project_id).then(function(){
                        project.hours_worked = $scope.prs.returnHoursWorked();
                        $scope.prs.getEstimatedHoursProject(project.project_id).then(function(){
                            project.estimated_hours = $scope.prs.returnEstimatedHours();
                            project.percentProject = project.hours_worked / project.estimated_hours;
                        });
                    });
                });
            }
            $scope.$watch('projects', function (newVal) {
                $scope.updateProjectHours();
            });
            $scope.updateProjectHours();
            $scope.core = coreService;
            $scope.dateFormat = "dd-MMM-yyyy";
            $scope.sortType = "project"
            $scope.sortReverse = false;
            $scope.filterFn = function(item) {
                return item.projects && item.projects.length !== 0;
            };
            $scope.viewDetails = function ( path ) {
                $location.path( path );
            };
            $scope.getStatusClass = function(v){
                for(var i=0; i< $rootScope.statuses.length; i++){
                    if($rootScope.statuses[i].value===v) return $rootScope.statuses[i].btn_class
                        }
            }
            $scope.orderProp = "company_name,project_name";
            $scope.getOrder= function(){
                var tokens = $scope.orderProp.split(",");
                var order = [];
                tokens.forEach(function (token) {
                    order.push(token.toString());
                });
                return order;
            }
        },
        restrict:"E",
        replace: true,
        templateUrl: obj + 'tm_template_project_row.html'
    };
})