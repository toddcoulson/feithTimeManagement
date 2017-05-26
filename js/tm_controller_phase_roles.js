app.controller('PhaseRolesController', ['$filter', '$routeParams', '$modal',
                                        '$rootScope', '$scope', '$q', '$http', 'GetNewIdService', 'GetCustomersService',
                                        'phaseService','projectService','coreService','roleService',
                                        function ($filter, $routeParams, $modal, $rootScope, $scope, $q, $http,
                                                   GetNewIdService, GetCustomersService, phaseService, projectService, coreService,
                                                   roleService) {
                                            $scope.gcs = GetCustomersService;
                                            $scope.role = roleService;
                                            $scope.phs = phaseService;
                                            $scope.prs = projectService;
                                            $scope.core = coreService;
                                            $scope.project = {};
                                            $scope.phase={};
                                            $scope.roles = [];
                                            $scope.phaseRoles = [];
                                            $scope.totalPhaseBudget = 0;
                                            $scope.totalPhaseHours = 0;
                                            $scope.phase.phase_id = $routeParams.phase_id;
                                            $scope.project.project_id = $routeParams.project_id;
                                            $scope.init = function(){
                                                $scope.getPhaseDetails();
                                                $scope.getProjectDetails();
                                                $scope.getPhaseRoles();
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
                                            $scope.getPhaseRoles = function(){
                                                roleService.getPhaseRoles($scope.phase.phase_id).then(function(){
                                                    $scope.phaseRoles = roleService.getRoles();
                                                });
                                            }
                                            $scope.getRoleBudget=function(r){
                                                r.role_budget = r.role_hours * r.negotiated;
                                                return r.role_budget;
                                            }
                                            $scope.getPhaseBudget=function(r){
                                                $scope.totalPhaseBudget = 0;
                                                for(var j=0; j<$scope.phaseRoles.length; j++){
                                                    $scope.totalPhaseBudget += $scope.phaseRoles[j].role_budget;
                                                }
                                                return $scope.totalPhaseBudget;
                                            }
                                            $scope.$watch('totalPhaseBudget', function() {
                                                phaseService.updatePhaseBudget($scope.phase.phase_id, $scope.totalPhaseBudget);
                                            });
                                            $scope.getPhaseHours=function(){
                                                $scope.totalPhaseHours = 0;
                                                for(var j=0; j<$scope.phaseRoles.length; j++){
                                                    $scope.totalPhaseHours += Number($scope.phaseRoles[j].role_hours);
                                                }
                                                return $scope.totalPhaseHours;
                                            }
                                            $scope.$watch('totalPhaseHours', function() {
                                                phaseService.updatePhaseHours($scope.phase.phase_id, $scope.totalPhaseHours);
                                            });
                                            //remove elements from phaseRoles
                                            $scope.removeRole = function(data) {
                                                for(var j=0; j<$scope.phaseRoles.length; j++){
                                                    if($scope.phaseRoles[j].role_id == data.role_id){
                                                        $scope.phaseRoles.splice(j, 1);
                                                        $scope.role.removeRoleProject({role_id:data.role_id});
                                                    }
                                                }
                                            };
                                            $scope.discountPercent = function(role){
                                                if(role.classification === 'standard'){
                                                    return 1-(role.negotiated / role.standard_rate);
                                                }else{
                                                    return 1-(role.negotiated / role.clearance_rate);
                                                }
                                            }
                                            $scope.discountAll = function(discount){
                                                angular.forEach($scope.phaseRoles , function(role) {
                                                    var newRate = 0;
                                                    if(role.classification === 'standard'){
                                                        newRate = role.standard_rate - (role.standard_rate * (discount/100));
                                                    }else{
                                                        newRate = role.clearance_rate - (role.clearance_rate * (discount/100));
                                                    }
                                                    role.negotiated = newRate;
                                                    roleService.updateNegotiated(role.role_id, +newRate.toFixed(2));
                                                });
                                            }
                                            //Communication between modal to main page
                                            $scope.$on('updateDisplayFunction', function(event, data) {
                                                for(var j=0; j<$scope.phaseRoles.length; j++){
                                                    if($scope.phaseRoles[j].role_code == data.role_code){
                                                        $scope.phaseRoles[j].classification = data.classification;
                                                        $scope.phaseRoles[j].hourly_rate = data.hourly_rate;
                                                    }
                                                }
                                            });
                                            $scope.$on('addDisplayFunction', function(event, data) {
                                                $scope.phaseRoles.push(data);
                                            });
                                            $scope.showAddRoleModal=function(c){
                                                var newRoleModalInstance = $modal.open({
                                                    templateUrl: obj+'tm_modal_roles.html',
                                                    controller: newRoleModalInstanceCtrl,
                                                    backdrop: "static",
                                                    keyboard: false,
                                                    scope:$scope,
                                                    resolve:{
                                                        phase_id: function () {
                                                            return $scope.phase.phase_id;
                                                        },
                                                        phaseRoles: function () {
                                                            return $scope.phaseRoles;
                                                        },
                                                        classification:function(){
                                                            return c;
                                                        }
                                                    }
                                                });
                                                newRoleModalInstance.result.then(function(){
                                                });
                                            };
                                            var newRoleModalInstanceCtrl = function($q, $rootScope, $scope, $modalInstance,
                                                                                     phaseService, coreService, roleService, adminRoleService, phase_id, classification,
                                                                                     GetNewIdService){
                                                $scope.form = {};
                                                $scope.form.phase={};
                                                $scope.roleSearch = {classification:'standard'};
                                                $scope.editing = true;
                                                $scope.rate = "";
                                                $scope.roles = [];
                                                $scope.classifications = [{display:"Standard", value:"standard"},
                                                                          {display:"Clearance", value:"clearance"}];
                                                $scope.search = {role_name: '', role_code: '', standard_rate:'', clearance_rate:'',
                                                                 filterRate:''};
                                                $scope.searchRate = {min_rate:0, max_rate:1000};
                                                $scope.roleSearch.classification = $scope.classification = classification;
                                                $scope.classDisplay = capFirstLetter(classification);
                                                $scope.sortReverse = false;
                                                $scope.filterRange = function(item) {
                                                    if ($scope.searchRate.min_rate === undefined) $scope.searchRate.min_rate = 0;
                                                    if ($scope.searchRate.max_rate === undefined) $scope.searchRate.max_rate =
                                                        1000;
                                                    return (Number(item[$scope.roleSearch.classification + "_rate"]) >
                                                            $scope.searchRate.min_rate && Number(item[$scope.roleSearch.classification + "_rate"])
                                                            < $scope.searchRate.max_rate);
                                                };
                                                $scope.changeClassification = function(val){
                                                    $scope.search.standard_rate='';
                                                    $scope.search.clearance_rate='';
                                                    $scope.roleSearch.classification = val;
                                                    $scope.retrieveRolesForClassification();
                                                };
                                                $scope.pickRate=function(role){
                                                    //role.showClearance = !role.showClearance;
                                                    if($scope.roleSearch.classification == 'clearance'){
                                                        role.filterRate = role.clearance_rate;
                                                    }else{
                                                        role.filterRate = role.standard_rate;
                                                    }
                                                }
                                                $scope.retrieveRolesForClassification = function(){
                                                    $scope.roles = adminRoleService.getRoles().slice();
                                                    for(var i=$scope.roles.length-1; i>=0; i--){
                                                        $scope.pickRate($scope.roles[i]);
                                                        $scope.roles[i].clearance_rate = parseFloat($scope.roles[i].clearance_rate);
                                                        $scope.roles[i].standard_rate = parseFloat($scope.roles[i].standard_rate);
                                                        for(var j=0; j<$scope.phaseRoles.length; j++){
                                                            if($scope.phaseRoles[j].role_code == $scope.roles[i].role_code &&
                                                               $scope.phaseRoles[j].classification == $scope.roleSearch.classification){
                                                                $scope.roles.splice(i, 1);
                                                            }
                                                        }
                                                    }
                                                }
                                                adminRoleService.getRolesData().then(function(){
                                                    $scope.retrieveRolesForClassification();
                                                });
                                                $scope.roleExists = function(role_code, classification){
                                                    for(var j=0; j<$scope.phaseRoles.length; j++){
                                                        if($scope.phaseRoles[j].role_code == role_code &&
                                                           $scope.phaseRoles[j].classification == classification) return true;
                                                    }
                                                    return false;
                                                }
                                                $scope.submit = function(){
                                                    var addObjects = [];
                                                    var promises = [];
                                                    angular.forEach($scope.roles , function(r) {
                                                        var roleExists = $scope.roleExists(r.role_code, r.classification);
                                                        if(r.selected && !roleExists){
                                                            var editRole = {phase_id:phase_id,
                                                                            role_code:r.role_code,
                                                                            role_name:r.role_name,
                                                                            negotiated:r.filterRate,
                                                                            hourly_rate:r.filterRate,
                                                                            role_hours: 0,
                                                                            classification: $scope.roleSearch.classification
                                                                           };
                                                            editRole.classification == 'standard' ? editRole.standard_rate =
                                                                r.filterRate : editRole.clearance_rate = r.filterRate;
                                                            var promise = GetNewIdService.returnUniqueID();
                                                            promise.then(function(){
                                                                editRole.role_id = GetNewIdService.newID;
                                                                $scope.$emit('addDisplayFunction', editRole);
                                                            });
                                                            promises.push(promise);
                                                            addObjects.push(editRole);
                                                        }
                                                    });
                                                    $q.all(promises).then(function(){
                                                        roleService.addMultipleNewRoleProjects(addObjects);
                                                    })
                                                    $modalInstance.close();
                                                };
                                                $scope.cancel = function(){
                                                    $modalInstance.dismiss('cancel');
                                                };
                                            };
                                            $scope.init();
                                        }]);
function capFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}