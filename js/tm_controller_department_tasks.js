app.controller('DepartmentTasksController', ['$timeout', '$filter', '$routeParams',
                                             '$modal', '$rootScope', '$scope', '$q', '$http', 'GetNewIdService', 'coreService',
                                             'departmentTasksService',
                                             function ($timeout, $filter, $routeParams, $modal, $rootScope,
                                                        $scope, $q, $http, GetNewIdService, coreService, departmentTasksService) {
                                                 $scope.core = coreService;
                                                 $scope.task = departmentTasksService;
                                                 $scope.deptTasks = {};
                                                 $scope.editing = false;
                                                 $scope.newTask = "";
                                                 $scope.selectedDepartment={};
                                                 $scope.departmentTaskBtn = "Add Department Task";
                                                 $scope.taskWarning = "You have entered in a task that is already present on this
                                                 department."
                                                 $scope.duplicate = false;
                                                 $scope.init = function(){
                                                     $scope.getDepartmentTasks();
                                                     $scope.getDepartments();
                                                 };
                                                 $scope.getDepartmentTasks = function(){
                                                     $scope.task.getDepartmentTasks().then(function(){
                                                         $scope.deptTasks = $scope.task.deptTasks();
                                                     });
                                                 }
                                                 $scope.removeDepartmentTask = function(t){
                                                     $scope.task.removeDeptTask(t.department_id, t.task_name).then(function(){
                                                         for(var i=0; i<$scope.deptTasks.length; i++){
                                                             if($scope.deptTasks[i].department_id===t.department_id &&
                                                                $scope.deptTasks[i].task_name===t.task_name){
                                                                 $scope.deptTasks.splice(i, 1);
                                                                 break;
                                                             }
                                                         }
                                                     });
                                                 }
                                                 $scope.checkEditAdmin = function(){
                                                     return $rootScope.userCanViewAdmin();
                                                 }
                                                 $scope.onClickTab = function(department){
                                                     $scope.search = department.dept_idx;
                                                     $scope.selectedDepartment = department;
                                                 }
                                                 $scope.getDepartments = function(){
                                                     departmentTasksService.getDepartments().then(function(){
                                                         $scope.departments = departmentTasksService.departments();
                                                         $scope.selectedDepartment = $scope.departments[0];
                                                         $scope.search = $scope.selectedDepartment.dept_idx;
                                                     });
                                                 }
                                                 $scope.changeButtonText = function(){
                                                     if($scope.editing){
                                                         $scope.departmentTaskBtn = "Cancel Department Task";
                                                     }else{
                                                         $scope.departmentTaskBtn = "Add Department Task";
                                                     }
                                                 };
                                                 $scope.gotoSection = function(p){
                                                     $scope.core.newLocation($scope.project.project_id, $scope.phase.phase_id, p);
                                                 };
                                                 $scope.addDepartmentTask = function(){
                                                     $scope.editing = !$scope.editing;
                                                     $scope.changeButtonText();
                                                 };
                                                 $scope.cancel = function(){
                                                     $scope.editing = false;
                                                     $scope.changeButtonText();
                                                 };
                                                 $scope.submit = function(newTask){
                                                     $scope.duplicate = false;
                                                     for(var i=0; i<$scope.deptTasks.length; i++){
                                                         if($scope.deptTasks[i].department_id===$scope.selectedDepartment.dept_idx &&
                                                            $scope.deptTasks[i].task_name===newTask){
                                                             $scope.duplicate = true;
                                                         }
                                                     }
                                                     if(!$scope.duplicate){
                                                         $scope.deptTasks.push({
                                                             task_name:newTask, department_id:$scope.selectedDepartment.dept_idx
                                                         });
                                                         $scope.task.addDepartmentTask(newTask,
                                                                                       $scope.selectedDepartment.dept_idx).then(function(){
                                                             $scope.editing = !$scope.editing;
                                                             $scope.changeButtonText();
                                                         })
                                                     }
                                                 }
                                                 $scope.init();
                                             }]);