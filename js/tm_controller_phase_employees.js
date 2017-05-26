app.controller('PhaseEmployeesController', ['$filter', '$routeParams', '$modal',
                                            '$rootScope', '$scope', '$q', '$http', 'GetNewIdService', 'GetCustomersService',
                                            'phaseService','projectService','userService',
                                            function ($filter, $routeParams, $modal, $rootScope, $scope, $q, $http,
                                                       GetNewIdService, GetCustomersService, phaseService, projectService, userService) {
                                                $scope.gcs = GetCustomersService;
                                                $scope.user = userService;
                                                $scope.phs = phaseService;
                                                $scope.prs = projectService;
                                                $scope.project = {};
                                                $scope.phase={};
                                                $scope.selectedUsers = [];
                                                $scope.phase.phase_id = $routeParams.phase_id;
                                                $scope.project.project_id = $routeParams.project_id;
                                                $scope.init = function(){
                                                    $scope.getPhaseDetails();
                                                    $scope.getProjectDetails();
                                                    $scope.getPhaseEmployees();
                                                };
                                                $scope.getProjectDetails = function(){
                                                    $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                        $scope.project = $scope.prs.projectObject();
                                                    });
                                                }
                                                $scope.getPhases = function(){
                                                    $scope.prs.getPhasesList($scope.phase.phase_id).then(function(){
                                                        $scope.phases = $scope.prs.phases;
                                                    });
                                                }
                                                $scope.getPhaseDetails = function(){
                                                    $scope.phs.getPhase($scope.phase.phase_id).then(function(){
                                                        $scope.phase = $scope.phs.phaseObject();
                                                    });
                                                }
                                                $scope.getPhaseEmployees = function(){
                                                    userService.getPhaseEmployeesData($scope.phase.phase_id).then(function(){
                                                        $scope.selectedUsers = userService.getPhaseEmployees();
                                                    });
                                                }
                                                $scope.removeUser = function(user){
                                                    userService.removePhaseEmployee($scope.phase.phase_id, user.usr_id);
                                                    for(var j=$scope.selectedUsers.length-1; j>=0; j--){
                                                        if($scope.selectedUsers[j].usr_id === user.usr_id) $scope.selectedUsers.splice(j,
                                                                                                                                       1);
                                                    }
                                                }
                                                $scope.isADeveloper = function(datum) {
                                                    return datum.is_developer == '1';
                                                };
                                                $scope.isNotADeveloper = function(datum) {
                                                    return datum.is_developer != '1';
                                                };
                                                $scope.$on('addPhaseEmployee', function(event, data) {
                                                    $scope.selectedUsers.push(data);
                                                });
                                                $scope.showAddEmployeeModal=function(){
                                                    var addManagerModalInstance = $modal.open({
                                                        templateUrl: obj+'tm_modal_user_select.html',
                                                        controller: addManagerModalInstanceCtrl,
                                                        backdrop: "static",
                                                        keyboard: false,
                                                        scope:$scope,
                                                        resolve:{
                                                            phase_id: function () {
                                                                return $scope.phase.phase_id;
                                                            },
                                                            selectedUsers: function () {
                                                                return $scope.selectedUsers;
                                                            }
                                                        }
                                                    });
                                                    addManagerModalInstance.result.then(function(){
                                                    });
                                                };
                                                var addManagerModalInstanceCtrl = function($rootScope, $scope, $modalInstance,
                                                                                            selectedUsers, userService, phase_id){
                                                    $scope.form = {};
                                                    $scope.form.phase={};
                                                    $scope.editing = true;
                                                    $scope.users = [];
                                                    $scope.retrieveEmployeesForPhase = function(){
                                                        $scope.users = userService.getUsers().slice();
                                                        for(var i=$scope.users.length-1; i>=0; i--){
                                                            $scope.users[i].is_developer = 1;
                                                            for(var j=0; j<selectedUsers.length; j++){
                                                                if(selectedUsers[j].usr_id == $scope.users[i].usr_id){
                                                                    $scope.users.splice(i, 1);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    userService.getUsersData().then(function(){
                                                        $scope.retrieveEmployeesForPhase();
                                                    });
                                                    $scope.managerExists = function(usr_id){
                                                        for(var j=0; j<$scope.selectedUsers.length; j++){
                                                            if($scope.selectedUsers[j].usr_id == usr_id) return true;
                                                        }
                                                        return false;
                                                    }
                                                    $scope.changeUserType=function(user){
                                                        user.is_developer = !user.is_developer;
                                                    }
                                                    $scope.submit = function(){
                                                        angular.forEach($scope.users , function(r) {
                                                            var roleExists = $scope.managerExists(r.usr_id);
                                                            var editRole = {phase_id: phase_id, usr_id: r.usr_id, usr_name: r.usr_name,
                                                                            is_developer:r.is_developer, usr_email:r.usr_email, usr_desc:r.usr_desc};
                                                            if(r.selected && !roleExists){
                                                                $scope.$emit('addPhaseEmployee', editRole)
                                                                userService.addPhaseEmployee(phase_id, editRole.usr_id,
                                                                                             editRole.is_developer);
                                                            }
                                                        });
                                                        $modalInstance.close();
                                                    };
                                                    $scope.cancel = function(){
                                                        $modalInstance.dismiss('cancel');
                                                    };
                                                };
                                                $scope.init();
                                            }]);