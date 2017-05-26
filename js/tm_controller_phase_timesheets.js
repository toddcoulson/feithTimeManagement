app.controller('PhaseTimesheetsController', ['$routeParams', '$modal', '$rootScope',
                                             '$scope', '$q', '$http', '$filter', 'GetNewIdService', 'coreService','projectService',
                                             'phaseService', 'timeEntryService', 'prefsService',
                                             function ($routeParams, $modal, $rootScope, $scope, $q, $http,
                                                        $filter, GetNewIdService, coreService, projectService, phaseService,
                                                        timeEntryService, prefsService) {
                                                 $scope.core = coreService;
                                                 $scope.prs = projectService;
                                                 $scope.phs = phaseService;
                                                 $scope.prefs = prefsService;
                                                 $scope.project = {};
                                                 $scope.phase = {};
                                                 $scope.phase.phase_id = $routeParams.phase_id;
                                                 $scope.project.project_id = $routeParams.project_id;
                                                 $scope.entries = [];
                                                 $scope.search = {};
                                                 $scope.selectFilter = {};
                                                 $scope.checkDates = {};
                                                 $scope.searchEntry = {min_hours:0, max_hours:24, limitEntries:15, type_of_hours:''};
                                                 $scope.core = coreService;
                                                 $scope.sortType = {
                                                     name: 'entry_date_sort', selected:$rootScope.sorts[0]
                                                 };
                                                 $scope.init = function(){
                                                     $scope.prefs.retrievePreferences($rootScope.currentUser.userId).then(function(preferenc
                                                         es){
                                                         $scope.getPhaseDetails();
                                                         $scope.getProjectDetails();
                                                         $scope.prefsDefault = preferences;
                                                         $scope.reset();
                                                         $scope.getDateValue({value:$scope.prefsDefault.date_value});
                                                     });
                                                 };
                                                 //function for time entries filter
                                                 $scope.updateTimeEntries = function(){
                                                     if($scope.checkDates.start_date && $scope.checkDates.end_date)
                                                         $scope.getTimeEntries();
                                                 }
                                                 $scope.displayDates = false;
                                                 $scope.getDateValue=function(obj){
                                                     if(obj.value == 'custom'){
                                                         $scope.displayDates = true;
                                                         if($scope.checkDates.start_date) var min =
                                                             $scope.checkDates.start_date.toISOString();
                                                         if($scope.checkDates.end_date) var max =
                                                             $scope.checkDates.end_date.toISOString();
                                                     }else{
                                                         $scope.displayDates = false;
                                                         var presetDates = $scope.core.convertDateValues(obj.value);
                                                         if(presetDates.start_date) var min = presetDates.start_date.toISOString()
                                                         if(presetDates.end_date) var max = presetDates.end_date.toISOString()
                                                         }
                                                     $scope.getTimeEntries(min, max);
                                                 }
                                                 $scope.getProjectDetails = function(){
                                                     $scope.prs.getProjectDetails($scope.project.project_id).then(function(){
                                                         $scope.project = $scope.prs.projectObject();
                                                     });
                                                 }
                                                 $scope.getPhaseDetails = function(){
                                                     $scope.phs.getPhase($scope.phase.phase_id).then(function(){
                                                         $scope.phase = $scope.phs.phaseObject();
                                                         $scope.forWho = "* "+$scope.phase.phase_name;
                                                     });
                                                 }
                                                 $scope.getTimeEntries = function(min, max){
                                                     timeEntryService.getTimeEntriesPhase($scope.phase.phase_id, min,
                                                                                          max).then(function(entries){
                                                         $scope.entries = entries;
                                                         $scope.entries.forEach(function(item) {
                                                             item.entry_date_sort = $scope.core.convertDateFromISO(item.entry_date);
                                                         });
                                                         $scope.recentChanged();
                                                     });
                                                 }
                                                 $rootScope.$on("getEditedModal", function(event, newTE){
                                                     angular.forEach($scope.entries , function(e) {
                                                         if(e.time_entry_id === $scope.entryValue.time_entry_id){
                                                             e.entry_date = $scope.entryValue.entry_date = newTE.entry_date;
                                                             $scope.entryValue.entry_date_sort =
                                                                 $scope.core.convertDateFromISO(newTE.entry_date);
                                                             e.submit_date = $scope.entryValue.submit_date = newTE.submit_date;
                                                             e.hours_worked = $scope.entryValue.hours_worked = newTE.hours_worked;
                                                             e.company_name = $scope.entryValue.company_name = newTE.company_name;
                                                             e.project_name = $scope.entryValue.project_name = newTE.project_name;
                                                             e.phase_name = $scope.entryValue.phase_name = newTE.phase_name;
                                                             e.role_code = $scope.entryValue.role_code = newTE.role_code;
                                                             if (typeof(newTE.task_name) != "undefined") e.task_name =
                                                                 $scope.entryValue.task_name = newTE.task_name;
                                                             e.type_of_hours = $scope.entryValue.type_of_hours = newTE.type_of_hours;
                                                             e.comments = $scope.entryValue.comments = newTE.comments;
                                                         }
                                                     });
                                                     $scope.recentChanged();
                                                 });
                                                 //call everytime hours are retrieved.
                                                 $scope.recentChanged = function(){
                                                     $scope.sortType = {
                                                         name: 'entry_date_sort', selected:$rootScope.sorts[0]
                                                     };
                                                     $scope.entriesDisplay = $filter('orderBy')($scope.entries, 'entry_date_sort',
                                                                                                true);
                                                     $scope.entriesDisplay = $filter('limitTo')($scope.entriesDisplay,
                                                                                                $scope.searchEntry.limitEntries);
                                                 }
                                                 //function called when export button clicked
                                                 $scope.exportData = function () {
                                                     //$scope.savedJSON = angular.toJson($filter('filter')($scope.tests,
                                                     $scope.searchText)); Possible code for filtering before sending to excel
                                                     alasql('SELECT * INTO XLSX("entries.xlsx",{headers:true}) FROM
                                                            ?',[$scope.entriesDisplay]);
                                                            };
                                                            //function onChange for sort drop down
                                                            $scope.selectedSort = function(){
                                                            $scope.sortType.name = $scope.sortType.selected.value;
                                                            }
                                                            //reset all filters
                                                            $scope.reset = function(){
                                                            $scope.search = {};
                                                            $scope.selectFilter = {};
                                                            $scope.searchEntry = {min_hours:0, max_hours:24,
                                                            limitEntries:Number($scope.prefsDefault.last_number_entries), type_of_hours:''};
                                                 $scope.checkDates = {end_date:
                                                                      $scope.core.convertDateFromISO($scope.prefsDefault.end_date),
                                                                      start_date:$scope.core.convertDateFromISO($scope.prefsDefault.start_date)};
                                                 angular.forEach($scope.core.dateValues , function(dv) {
                                                     if(dv.value === $scope.prefsDefault.date_value){
                                                         $scope.searchEntry.date_value = dv;
                                                     }
                                                 });
                                             }
                                             //called everytime edit entry button is clicked
                                             $scope.editEntry = function(entry){
                                             $scope.entryValue = $scope.editEntryItem = entry;
                                             $scope.showEditTimeModal(entry);
                                             //broadcast event: $scope.retriveTimeEntryDetails(entry);
                                             }
                                             //datepickers to make sure automatically close.
                                             $scope.datepickers = {cal: false, cal3: false,
                                             cal2: false};
                                             $scope.open = function($event, which) {
                                             $event.stopPropagation();
                                             $scope.datepickers[which] = true;
               };
               $scope.showEditTimeModal = function(entry){
    var editTimeModalInstance = $modal.open({
        template: ''
        +'<time-entry editing="editing" close-modal="cancel()" editobject="
        editEntryItem" edit-entry="editCurrentEntry(arg)"></time-entry>',
        controller: editTimeModalInstanceCtrl,
        backdrop: "static",
        keyboard: false,
        resolve: {
        editEntryItem: function () {
        return $scope.editEntryItem;
    }
                                            }
                                            });
    editTimeModalInstance.result.then(function(){
    });
};
var editTimeModalInstanceCtrl = ['$rootScope', '$scope', '$modalInstance',
                                 'phaseService', 'coreService', 'editEntryItem', function($rootScope, $scope,
                                                                                           $modalInstance, phaseService, coreService, editEntryItem){
                                     $scope.editEntryItem = editEntryItem;
                                     $scope.editing = true;
                                     $scope.workOnTimesheet = "Edit";
                                     $scope.cancel = function(){
                                         $modalInstance.close();
                                     };
                                     $scope.editCurrentEntry = function(data){
                                         $rootScope.$broadcast("getEditedModal", data);
                                     }
                                 }];
$scope.init()
}]);