app.controller('PersonalPreferencesController', ['$routeParams', '$modal',
                                                 '$rootScope', '$scope', '$q', '$http', 'GetNewIdService',
                                                 'coreService','projectService', 'prefsService',
                                                 function ($routeParams, $modal, $rootScope, $scope, $q, $http,
                                                            GetNewIdService, coreService, projectService, prefsService) {
                                                     $scope.core = coreService;
                                                     $scope.prs = projectService;
                                                     $scope.prefs = prefsService;
                                                     $scope.project = {};
                                                     $scope.phase = {};
                                                     $scope.setPrefs = {};
                                                     $scope.dateValues = [
                                                         {value:"1month", display:"Past Month"},
                                                         {value:"2month", display:"Past 2 Months"},
                                                         {value:"3month", display:"Past 3 Months"},
                                                         {value:"4month", display:"Past 4 Months"},
                                                         {value:"5month", display:"Past Months"},
                                                         {value:"6month", display:"Past Months"},
                                                         {value:"1year", display:"Past Year"},
                                                         {value:"2year", display:"Past 2 Years"},
                                                         {value:"custom", display:"Custom"}
                                                     ];
                                                     $scope.init = function(){
                                                         $scope.prefs.retrievePreferences($rootScope.currentUser.userId).then(function(prefs){

                                                             $scope.prefsDefault = prefs;
                                                             if($scope.prefsDefault.date_value == 'custom')$scope.displayDates = true;
                                                             $scope.reset();
                                                         });
                                                         $scope.getProjectDetails();
                                                     };
                                                     $scope.displayDates = false;
                                                     $scope.getDateValue=function(obj){
                                                         var presetDates = {};
                                                         if(obj.value == 'custom'){
                                                             $scope.displayDates = true;
                                                             presetDates.start_date = $scope.setPrefs.start_date;
                                                             presetDates.end_date = $scope.setPrefs.end_date;
                                                         }else{
                                                             $scope.displayDates = false;
                                                             presetDates = $scope.core.convertDateValues(obj.value);
                                                             $scope.setPrefs.start_date = presetDates.start_date;
                                                             $scope.setPrefs.end_date = presetDates.end_date;
                                                         }
                                                         //$scope.core
                                                         $scope.prefs.updateDateValue($rootScope.currentUser.userId, obj.value);
                                                         if($scope.setPrefs.start_date)
                                                             $scope.prefs.updateStartDate($rootScope.currentUser.userId,
                                                                                          presetDates.start_date.toISOString());
                                                         if($scope.setPrefs.end_date)
                                                             $scope.prefs.updateEndDate($rootScope.currentUser.userId,
                                                                                        presetDates.end_date.toISOString());
                                                     }
                                                     $scope.project.project_id = $routeParams.project_id;
                                                     $scope.getProjectDetails = function(){
                                                         $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                             $scope.project = $scope.prs.projectObject();
                                                         });
                                                     }
                                                     $scope.reset = function(){
                                                         $scope.setPrefs.start_date =
                                                             $scope.core.convertDateFromISO($scope.prefsDefault.start_date);
                                                         $scope.setPrefs.end_date =
                                                             $scope.core.convertDateFromISO($scope.prefsDefault.end_date);
                                                         $scope.setPrefs.last_number_entries =
                                                             Number($scope.prefsDefault.last_number_entries);
                                                         angular.forEach($scope.core.dateValues , function(dv) {
                                                             if(dv.value === $scope.prefsDefault.date_value){
                                                                 $scope.setPrefs.date_value = dv;
                                                             }
                                                         });
                                                     }
                                                     $scope.init()
                                                 }]);