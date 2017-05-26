app.controller('ProjectReportingController', ['$routeParams', '$modal', '$rootScope',
                                              '$scope', '$q', '$http', 'GetNewIdService', 'coreService','projectService',
                                              function ($routeParams, $modal, $rootScope, $scope, $q, $http,
                                                         GetNewIdService, coreService, projectService) {
                                                  $scope.core = coreService;
                                                  $scope.prs = projectService;
                                                  $scope.project = {};
                                                  $scope.phase = {};
                                                  $scope.project.project_id = $routeParams.project_id;
                                                  $scope.init = function(){
                                                      $scope.getProjectDetails();
                                                  };
                                                  $scope.getProjectDetails = function(){
                                                      $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                          $scope.project = $scope.prs.projectObject();
                                                      });
                                                  }
                                                  $scope.init()
                                              }]);