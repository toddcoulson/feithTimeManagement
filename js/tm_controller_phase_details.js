app.controller('PhaseDetailsController', ['$filter', '$routeParams', '$modal',
                                          '$rootScope', '$scope', '$q', '$http', '$timeout', 'GetNewIdService',
                                          'GetCustomersService', 'phaseService','projectService','coreService',
                                          function ( $filter, $routeParams, $modal, $rootScope, $scope,
                                                      $q, $http, $timeout, GetNewIdService, GetCustomersService, phaseService,
                                                      projectService, coreService) {
                                              $scope.gcs = GetCustomersService;
                                              $scope.phs = phaseService;
                                              $scope.prs = projectService;
                                              $scope.core = coreService;
                                              $scope.project = {};
                                              $scope.phase={};
                                              $scope.phase.phase_id = $routeParams.phase_id;
                                              $scope.project.project_id = $routeParams.project_id;
                                              $scope.editing = false;
                                              $scope.newPhase = true;
                                              $scope.editSubmitText = "Edit Details";
                                              $scope.percentCompletePhase=0;
                                              $scope.init = function(){
                                                  $scope.getPhaseDetails();
                                                  $scope.getProjectDetails();
                                              };
                                              $scope.datepickers = {};
                                              $scope.openDatePicker = function(dateFieldName) {
                                                  $timeout(function() {
                                                      $scope.datepickers[dateFieldName] = true;
                                                  });
                                              };
                                              $scope.getPhaseDetails = function(){
                                                  $scope.phs.getPhase($scope.phase.phase_id).then(function(){
                                                      $scope.phase = $scope.phs.phaseObject();
                                                  });
                                              }
                                              $scope.getProjectDetails = function(){
                                                  $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                      $scope.project = $scope.prs.projectObject();
                                                  });
                                              }
                                              GetCustomersService.getCustomerList().then(function(){
                                                  $scope.customers = GetCustomersService.customers;
                                              });
                                              $scope.createPhase = function(){
                                                  /*var getNum =
GetNewIdService.returnUniqueID().then(function(){$scope.postToPhase()});*/
                                              }
                                              $scope.postToPhase = function(){
                                                  var newPhase = {
                                                      phase_id: GetNewIdService.newID,
                                                      phase_name:$scope.phase.phase_name,
                                                      phase_status:$scope.phase.phase_status,
                                                      phase_status_date:isoDateToDatabase($scope.phase.phase_status_date),
                                                      project_id: GetCustomersService.project.project_id,
                                                      start_date:isoDateToDatabase($scope.phase.start_date),
                                                      end_date:isoDateToDatabase($scope.phase.end_date),
                                                      estimated_hours:$scope.phase.estimated_hours,
                                                      budget:$scope.phase.budget,
                                                      description:$scope.phase.description
                                                  }
                                                  $scope.phs.addNewPhase(newPhase).then(function(){
                                                  })
                                              }
                                              $rootScope.$watch('phase.status_date', function (newValue) {
                                                  $scope.phase.status_date = $filter('date')(newValue, 'YYYY/MM/DD');
                                              });
                                              $scope.percentComplete = function(){
                                                  $scope.phs.getHoursWorkedPhase($scope.project.project_id,
                                                                                 $scope.phase.phase_id).then(function(){
                                                      $scope.percentCompletePhase =
                                                          $scope.phs.returnHoursWorked()/$scope.phase.estimated_hours;
                                                  });
                                              }
                                              $scope.clearEntries = function(){
                                                  $scope.resetPhaseObject();
                                              }
                                              $scope.editDetails=function(){
                                                  $scope.editing = !$scope.editing
                                                  $scope.editing ? $scope.editSubmitText = "Submit" : $scope.editSubmitText = "Edit
                                                  Details";
                                              }
                                              $scope.init();
                                          }]);