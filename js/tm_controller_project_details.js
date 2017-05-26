app.controller('ProjectDetailsController', ['$routeParams', '$modal', '$rootScope',
                                            '$scope', '$q', '$http', 'GetNewIdService', 'coreService', 'projectService',
                                            function ($routeParams, $modal, $rootScope, $scope, $q, $http,
                                                       GetNewIdService, coreService, projectService) {
                                                $scope.core = coreService;
                                                $scope.prs = projectService;
                                                $scope.project = {};
                                                $scope.phase = {};
                                                $scope.project.project_id = $routeParams.project_id;
                                                $scope.project.category='commercial';
                                                $scope.project.price_model= 'fixed';
                                                $scope.project.billing_frequency='begin';
                                                $scope.editSubmitText = "Edit Details";
                                                $scope.editing = false;
                                                $scope.newProject = false;
                                                $scope.percentProject = 0;
                                                $scope.init = function(){
                                                    $scope.getProjectDetails();
                                                    $scope.getProjectPercent();
                                                };
                                                $scope.editDetails=function(){
                                                    $scope.editing = !$scope.editing
                                                    $scope.editing ? $scope.editSubmitText = "Submit" : $scope.editSubmitText = "Edit
                                                    Details";
                                                }
                                                $scope.getProjectDetails = function(){
                                                    $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                        $scope.project = $scope.prs.projectObject();
                                                    });
                                                    $scope.prs.getProjectManagers($scope.project.project_id).then(function(){
                                                        $scope.projectManagers = $scope.prs.projectManagers();
                                                    });
                                                }
                                                $scope.getProjectPercent = function(){
                                                    $scope.prs.getHoursWorkedProject($scope.project.project_id).then(function(){
                                                        $scope.project.hours_worked = $scope.prs.returnHoursWorked();
                                                        $scope.prs.getEstimatedHoursProject($scope.project.project_id).then(function(){
                                                            $scope.project.estimated_hours = $scope.prs.returnEstimatedHours();
                                                            $scope.percentProject = $scope.project.hours_worked /
                                                                $scope.project.estimated_hours;
                                                        });
                                                    });
                                                }
                                                $scope.init()
                                            }]);