app.controller('ProjectPhaseListController', ['$filter', '$location', '$rootScope',
                                              '$scope', '$q', '$http', '$routeParams', '$modal', '$timeout',
                                              'GetNewIdService', 'GetCustomersService','phaseService',
                                              'projectService','coreService', 'roleService', 'userService',
                                              function ($filter, $location, $rootScope, $scope,
                                                         $q, $http, $routeParams, $modal, $timeout,
                                                         GetNewIdService, GetCustomersService, phaseService,
                                                         projectService, coreService, roleService, userService) {
                                                  $scope.gcs = GetCustomersService;
                                                  $scope.phs = phaseService;
                                                  $scope.core = coreService;
                                                  $scope.prs = projectService;
                                                  $scope.role = roleService;
                                                  $scope.user = userService;
                                                  $scope.project = {};
                                                  $scope.phase = {};
                                                  $scope.project.project_id = $routeParams.project_id;
                                                  $scope.phases = [];
                                                  $scope.sortType = "phase"
                                                  $scope.sortReverse = false;
                                                  $scope.percentProject = 0;
                                                  $scope.scObj = {};
                                                  $scope.scObj.selectedCustomer="";
                                                  $scope.init=function(){
                                                      $scope.getProjectDetails();
                                                      $scope.getPhases();
                                                      $scope.getProjectPercent();
                                                  };
                                                  $scope.removePhase = function(phase){
                                                      $scope.role.removeAllRolesFromPhase(phase.phase_id).then(function(){
                                                          $scope.user.removeAllPhaseEmployees(phase.phase_id).then(function(){
                                                              $scope.phs.removePhase(phase.phase_id);
                                                          });
                                                      });
                                                      for(var i=0; i<$scope.phases.length; i++){
                                                          if($scope.phases[i].phase_id == phase.phase_id){
                                                              $scope.phases.splice(i, 1);
                                                              break;
                                                          }
                                                      }
                                                  }
                                                  $scope.gcs.getCustomerList().then(function(){
                                                      $scope.customers = GetCustomersService.customers;
                                                  });
                                                  $scope.viewDetails = function ( path ) {
                                                      $location.path( path );
                                                  };
                                                  $scope.getProjectDetails = function(){
                                                      $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                          $scope.project = $scope.prs.projectObject();
                                                      });
                                                  }
                                                  $scope.getPhases = function(){
                                                      $scope.prs.getPhasesList($scope.project.project_id).then(function(){
                                                          $scope.phases = $scope.prs.phases;
                                                          angular.forEach($scope.phases , function(ph) {
                                                              $scope.phs.getHoursWorkedPhase(ph.project_id, ph.phase_id).then(function(){
                                                                  ph.hours_worked = $scope.phs.returnHoursWorked()
                                                                  ph.hours_worked_percent = ph.hours_worked/ph.estimated_hours;
                                                                  console.log(ph.hours_worked,ph.estimated_hours)
                                                              });
                                                          });
                                                      });
                                                  }
                                                  $scope.createProject = function(){
                                                      var getNum =
                                                          GetNewIdService.returnUniqueID().then(function(){$scope.postToProject()});
                                                  }
                                                  $scope.postToProject = function(){
                                                      var newProject = {project_id:GetNewIdService.newID,
                                                                        customer_id: $scope.scObj.selectedCustomer.cust_id,
                                                                        project_name:$scope.project.project_name,
                                                                        project_status:$scope.project.project_status,
                                                                        project_manager_id:1,
                                                                        status_date:$scope.project.status_date,
                                                                        description:$scope.project.description}
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
                                                  $scope.showAddPhaseModal=function(){
                                                      var newPhaseModalInstance = $modal.open({
                                                          templateUrl: obj+'tm_modal_phase_details.html',
                                                          controller: newPhaseModalInstanceCtrl,
                                                          backdrop: "static",
                                                          keyboard: false,
                                                          resolve: {
                                                              project: function () {
                                                                  return $scope.project;
                                                              },
                                                          }
                                                      });
                                                      newPhaseModalInstance.result.then(function(){
                                                      });
                                                  };
                                                  var newPhaseModalInstanceCtrl = function($rootScope, $scope, $modalInstance,
                                                                                            phaseService, coreService, project){
                                                      $scope.project = project;
                                                      $scope.core = coreService;
                                                      $scope.editing = true;
                                                      $scope.newPhase = true;
                                                      $scope.phase = {
                                                          phase_status:$rootScope.statuses[0].value,
                                                          phase_status_date:$rootScope.today,
                                                          start_date:$rootScope.today
                                                      };
                                                      $scope.form = {};
                                                      $scope.form.phase={};
                                                      $scope.save = function(){
                                                          $scope.phs = phaseService;
                                                          var getNum = GetNewIdService.returnUniqueID().then(function(){
                                                              $scope.phs.addNewPhase({
                                                                  phase_id: GetNewIdService.newID,
                                                                  phase_name: $scope.phase.phase_name,
                                                                  phase_status: $scope.phase.phase_status,
                                                                  phase_status_date: isoDateToDatabase($scope.phase.phase_status_date),
                                                                  project_id: $scope.project.project_id,
                                                                  start_date: isoDateToDatabase($scope.phase.start_date),
                                                                  end_date: isoDateToDatabase($scope.phase.end_date),
                                                                  estimated_hours: $scope.phase.estimated_hours,
                                                                  budget: $scope.phase.budget,
                                                                  description: $scope.phase.description
                                                              }, $scope.phases);
                                                          });
                                                          $scope.core.newLocation($scope.project.project_id, $scope.phase.phase_id,
                                                                                  '/details');
                                                          $scope.submit();
                                                      }
                                                      $scope.submit = function(){
                                                          $modalInstance.close();
                                                      };
                                                      $scope.cancel = function(){
                                                          $modalInstance.dismiss('cancel');
                                                      };
                                                      $scope.closeAllDates = function(){
                                                          $scope.datepickers = {
                                                              start_date: false,
                                                              end_date: false
                                                          }
                                                      }
                                                      $scope.closeAllDates();
                                                      $scope.openDatePicker = function($event, which) {
                                                          $event.preventDefault();
                                                          $event.stopPropagation();
                                                          $scope.closeAllDates();
                                                          $scope.datepickers[which]= true;
                                                      };
                                                  };
                                                  $scope.init();
                                              }]);