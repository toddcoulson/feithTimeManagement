app.controller('AdminRolesController', ['$filter', '$routeParams', '$modal',
                                        '$rootScope', '$scope', '$q', '$http', 'GetNewIdService', 'GetCustomersService',
                                        'phaseService','projectService','coreService','roleService','adminRoleService',
                                        function ($filter, $routeParams, $modal, $rootScope, $scope, $q,
                                                   $http, GetNewIdService, GetCustomersService, phaseService, projectService,
                                                   coreService, roleService, adminRoleService) {
                                            $scope.gcs = GetCustomersService;
                                            $scope.role = roleService;
                                            $scope.phs = phaseService;
                                            $scope.prs = projectService;
                                            $scope.core = coreService;
                                            $scope.project = {};
                                            $scope.phase={};
                                            $scope.roles = [];
                                            $scope.projectRoles = [];
                                            $scope.phase.phase_id = $routeParams.phase_id;
                                            $scope.project.project_id = $routeParams.project_id;
                                            $scope.search = {role_name: '', role_code: '', standard_rate:'', clearance_rate:''};
                                            $scope.init = function(){
                                                $scope.getPhaseDetails();
                                                $scope.getProjectDetails();
                                                $scope.getRoles();
                                            };
                                            $scope.getProjectDetails = function(){
                                                $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                    $scope.project = $scope.prs.projectObject();
                                                });
                                            }
                                            $scope.getPhases = function(){
                                                $scope.prs.getPhasesList($scope.project.project_id).then(function(){
                                                    $scope.phases = $scope.prs.phases;
                                                });
                                            }
                                            $scope.getPhaseDetails = function(){
                                                $scope.phs.getPhase($scope.phase.phase_id).then(function(){
                                                    $scope.phase = $scope.phs.phaseObject();
                                                });
                                            }
                                            $scope.getRoles = function(){
                                                adminRoleService.getRolesData().then(function(){
                                                    $scope.roles = adminRoleService.getRoles();
                                                });
                                            }
                                            $scope.removeRole = function(code){
                                                adminRoleService.removeRole(code).then(function(){
                                                    $scope.roles = adminRoleService.getRoles();
                                                });
                                            }
                                            $scope.showAdminRolesModal=function(){
                                                var newRoleModalInstance = $modal.open({
                                                    templateUrl: obj+'tm_modal_admin_roles.html',
                                                    controller: newRoleModalInstanceCtrl,
                                                    backdrop: "static",
                                                    keyboard: false
                                                });
                                                newRoleModalInstance.result.then(function(){
                                                });
                                            };
                                            var newRoleModalInstanceCtrl = function($rootScope, $scope, $modalInstance,
                                                                                     phaseService, coreService, adminRoleService){
                                                $scope.form = {};
                                                $scope.form.newRole={};
                                                $scope.newRole = {};
                                                $scope.nameConflict="";
                                                $scope.codeConflict = "";
                                                $scope.adminRoleService = adminRoleService;
                                                $scope.checkCodeConflict = function(){
                                                    $scope.codeConflict =
                                                        adminRoleService.checkForCodeMatch($scope.newRole.role_code);
                                                }
                                                $scope.checkNameConflict = function(){
                                                    $scope.nameConflict =
                                                        adminRoleService.checkForNameMatch($scope.newRole.role_code, $scope.newRole.role_name);
                                                }
                                                $scope.submit = function(){
                                                    adminRoleService.addRole($scope.newRole).then(function(){
                                                        $scope.roles = adminRoleService.getRoles();
                                                    });
                                                    $modalInstance.close();
                                                };
                                                $scope.cancel = function(){
                                                    $modalInstance.dismiss('cancel');
                                                };
                                            };
                                            $scope.init();
                                        }]);