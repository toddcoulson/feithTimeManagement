app.controller('PhasePreferencesController', ['$filter', '$routeParams', '$modal',
                                              '$rootScope', '$scope', '$q', '$http', 'GetNewIdService', 'GetCustomersService',
                                              'phaseService','projectService','coreService',
                                              function ($filter, $routeParams, $modal, $rootScope, $scope, $q, $http,
                                                         GetNewIdService, GetCustomersService, phaseService, projectService, coreService) {
                                                  $scope.gcs = GetCustomersService;
                                                  $scope.phs = phaseService;
                                                  $scope.prs = projectService;
                                                  $scope.core = coreService;
                                                  $scope.project = {};
                                                  $scope.phase={};
                                                  $scope.phase.phase_id = $routeParams.phase_id;
                                                  $scope.project.project_id = $routeParams.project_id;
                                                  $scope.init = function(){
                                                      $scope.getPhaseDetails();
                                                      $scope.getProjectDetails();
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
                                                  $scope.init();
                                              }]);