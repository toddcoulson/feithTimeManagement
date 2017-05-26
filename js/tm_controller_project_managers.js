app.controller('ProjectManagersController', ['$filter', '$routeParams', '$modal',
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
                                                     //$scope.getPhaseDetails();
                                                     $scope.getProjectDetails();
                                                     $scope.getSelectedUsers();
                                                 };
                                                 $scope.getProjectDetails = function(){
                                                     $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                         $scope.project = $scope.prs.projectObject();
                                                     });
                                                 }
                                                 $scope.getPhases = function(){
                                                     $scope.prs.getPhasesList($scope.project.project_id).then(function(){
                                                         //$scope.phases = $scope.prs.phases;
                                                     });
                                                 }
                                                 $scope.getPhaseDetails = function(){
                                                     $scope.phs.getPhase($scope.phase.phase_id).then(function(){
                                                         $scope.phase = $scope.phs.phaseObject();
                                                     });
                                                 }
                                                 $scope.getSelectedUsers = function(){
                                                     //call userService here.
                                                     userService.getProjectManagersData($scope.project.project_id).then(function(){
                                                         $scope.selectedUsers = userService.getProjectManagers();
                                                     });
                                                 }
                                                 $scope.returnAll = function(datum) {
                                                     return datum;
                                                 };
                                                 $scope.removeUser = function(user){
                                                     userService.removeProjectManager($scope.project.project_id, user.usr_id);
                                                     for(var j=$scope.selectedUsers.length-1; j>=0; j--){
                                                         if($scope.selectedUsers[j].usr_id === user.usr_id) $scope.selectedUsers.splice(j,
                                                                                                                                        1);
                                                     }
                                                 }
                                                 $scope.showAddEmployeeModal=function(){
                                                     var addManagerModalInstance = $modal.open({
                                                         templateUrl: obj+'tm_modal_user_select.html',
                                                         controller: addManagerModalInstanceCtrl,
                                                         backdrop: "static",
                                                         keyboard: false,
                                                         scope:$scope,
                                                         resolve:{
                                                             project_id: function () {
                                                                 return $scope.project.project_id;
                                                             },
                                                             selectedUsers: function () {
                                                                 return $scope.selectedUsers;
                                                             }
                                                         }
                                                     });
                                                     addManagerModalInstance.result.then(function(){
                                                     });
                                                 };
                                                 $scope.$on('addProjectManager', function(event, data) {
                                                     $scope.selectedUsers.push(data);
                                                 });
                                                 var addManagerModalInstanceCtrl = function($rootScope, $scope, $modalInstance,
                                                                                             selectedUsers, userService, project_id){
                                                     $scope.form = {};
                                                     $scope.form.phase={};
                                                     $scope.editing = true;
                                                     $scope.users = [];
                                                     $scope.retrieveManagersForPhase = function(){
                                                         $scope.users = userService.getUsers().slice();
                                                         for(var i=$scope.users.length-1; i>=0; i--){
                                                             $scope.users[i].filterRate = $scope.users[i].standard_rate;
                                                             for(var j=0; j<$scope.selectedUsers.length; j++){
                                                                 if($scope.selectedUsers[j].usr_id == $scope.users[i].usr_id){
                                                                     $scope.users.splice(i, 1);
                                                                     break;
                                                                 }
                                                             }
                                                         }
                                                     }
                                                     userService.getUsersData().then(function(){
                                                         $scope.retrieveManagersForPhase();
                                                     });
                                                     $scope.managerExists = function(usr_id){
                                                         angular.forEach($scope.selectedUsers , function(su) {
                                                             if(su.usr_id == usr_id) return true;
                                                         });
                                                         return false;
                                                     }
                                                     $scope.submit = function(){
                                                         angular.forEach($scope.users , function(r) {
                                                             var roleExists = $scope.managerExists(r.usr_id);
                                                             if(r.selected && !roleExists){
                                                                 var editRole = {project_id: project_id, usr_id: r.usr_id, usr_name:
                                                                                 r.usr_name, usr_email:r.usr_email, usr_desc: r.usr_desc};
                                                                 $scope.$emit('addProjectManager', editRole)
                                                                 userService.addProjectManager(editRole.project_id, editRole.usr_id);
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