app.controller('TimeEntryController', ['$scope', '$rootScope', '$http', '$location',
                                       '$filter', '$q', '$timeout', 'GetNewIdService', 'coreService', 'GetCustomersService',
                                       'projectService', 'roleService', 'timeEntryService', 'departmentTasksService', 'level',
                                       'prefsService',
                                       function($scope, $rootScope, $http, $location, $filter, $q, $timeout,
                                                 GetNewIdService, coreService, GetCustomersService, projectService, roleService,
                                                 timeEntryService, departmentTasksService, level, prefsService) {
                                           //init for level and services
                                           $scope.level = level;
                                           $scope.prs = projectService;
                                           $scope.role = roleService;
                                           $scope.task = departmentTasksService;
                                           $scope.core = coreService;
                                           $scope.prefs = prefsService;
                                           //init customers, project and phase info
                                           $scope.customers = "";
                                           $scope.project = {};
                                           $scope.phase = {};
                                           $scope.checkDates = {};
                                           $scope.prefsDefault = {};
                                           //init display of who timesheets are for, section level, navigation header
                                           $scope.forWho = $rootScope.currentUser.description;
                                           $scope.showOnMain = true;
                                           $scope.sections = $rootScope.navs[$scope.level].navItems;
                                           $scope.navigationHeader = $rootScope.navs[$scope.level].header;
                                           $scope.workOnTimesheet = "Enter";
                                           //init sortType object, keeps track of selected object for sort and name of sort for
                                           filter.
                                           $scope.sortType = {
                                               name: 'entry_date_sort', selected:$rootScope.sorts[0]
                                           };
                                           //init entries object for initial display
                                           $scope.entries = [];
                                           //init filter values
                                           $scope.hoursOnDay = 0;
                                           $scope.limitEntries = 15;
                                           //init values for opening and closing filter and entry forms.
                                           $scope.displayTimeFilter = $scope.displayTimeEntry = true;
                                           //javascript helper functions used to convert iso strings to dates.
                                           function spliceSlice(str, index, count) {
                                               return str.slice(0, index)+ str.slice(index + count);
                                           }
                                           //init function
                                           $scope.init = function(){
                                               $scope.prefs.addDefaultPrefs($rootScope.currentUser.userId).then(function(){
                                                   $scope.prefs.retrievePreferences($rootScope.currentUser.userId).then(function(preferenc
                                                       es){
                                                       $scope.prefsDefault = preferences;
                                                       $scope.reset();
                                                       $scope.getDateValue({value:$scope.prefsDefault.date_value});
                                                   });
                                               });
                                           };
                                           //function onChange for sort drop down
                                           $scope.selectedSort = function(){
                                               $scope.sortType.name = $scope.sortType.selected.value;
                                           }
                                           //function for time entries filter
                                           $scope.updateTimeEntries = function(){
                                               if($scope.checkDates.start_date) var min =
                                                   $scope.checkDates.start_date.toISOString();
                                               if($scope.checkDates.end_date) var max = $scope.checkDates.end_date.toISOString();
                                               if($scope.checkDates.start_date && $scope.checkDates.end_date)
                                                   $scope.getTimeEntryEmployee(min, max);
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
                                               $scope.getTimeEntryEmployee(min, max);
                                           }
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
                                                      //function to trigger filter of min/max hours
                                                      $scope.filterEntryHours = function(entry) {
                                                      if ($scope.searchEntry.min_hours === undefined) $scope.searchEntry.min_hours = 0;
                                                      if ($scope.searchEntry.max_hours === undefined) $scope.searchEntry.max_hours =
                                                      24;
                                                      if ($scope.searchEntry.max_hours < $scope.searchEntry.min_hours)
                                                      $scope.searchEntry.max_hours = $scope.searchEntry.min_hours + 1;
                                                      return (Number(entry.hours_worked) > $scope.searchEntry.min_hours &&
                                                      Number(entry.hours_worked) < $scope.searchEntry.max_hours);
                                                      };
                                                      //called everytime get me started button is clicked.
                                                      $scope.getMeStarted = function(entry){
                                                      //broadcast event: $scope.retriveTimeEntryDetails(entry);
                                                      $rootScope.$broadcast('retriveTimeEntryDetails',entry);
                                                      }
                                                      //when a new entry is made, we can add it to the display from directive
                                                      $scope.addNewEntry= function(arg){
                                                      $scope.entries.push(arg);
                                                      $scope.recentChanged();
                                                      }
                                                      $scope.editCurrentEntry = function(newTE){
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
                                                      $scope.editing = $scope.showTmAlert = false;
                                                      $scope.recentChanged();
                                                      }
                                                      //called everytime edit entry button is clicked
                                                      $scope.editEntry = function(entry){
                                                      $scope.entryValue = entry;
                                                      $scope.editing = $scope.showTmAlert = true;
                                                      $scope.workOnTimesheet = "Edit";
                                                      $scope.tmAlert = "You are currently in editing mode.";
                                                      //broadcast event: $scope.retriveTimeEntryDetails(entry);
                                                      $rootScope.$broadcast('retriveTimeEntryDetails',entry);
                                                      }
                                                      //function to get all entries for a given employee
                                                      $scope.getTimeEntryEmployee = function(min, max){
                                                      timeEntryService.getTimeEntriesEmployee($rootScope.currentUser.userId, min,
                                                      max).then(function(entries){
                                                      $scope.entries = entries;
                                                      $scope.entries.forEach(function(item) {
                                                      item.entry_date_sort = $scope.core.convertDateFromISO(item.entry_date);
                                                      });
                                                      $scope.recentChanged();
                                                      });
                                                      }
                                                      //function for telling controller to go to a new section.
                                                      $scope.gotoSection = function(p){
                                                      $scope.core.newLocation(-1, -1, p, true);
                                                      };
                                                      //called when saving a new time entry
                                                      $scope.saveTimeEntryEvent = function() {
                                                      $scope.getTimeEntryId().then(function() {
                                                      $scope.saveTimeEntry();
                                                      });
                                                      };
                                                      //datepickers to make sure automatically close.
                                                      $scope.datepickers = {cal: false, cal3: false,
                                                      cal2: false};
                                                      $scope.open = function($event, which) {
                                                   $event.stopPropagation();
                                                   $scope.datepickers[which] = true;
                                               };
                                               $scope.selectFilter = {};
                                               $scope.searchAll = '';
                                               //function for type of hour filter
                                               $scope.selectTypeFilter = function(v){
                                                   $scope.search.type_of_hours = v.value;
                                               }
                                               //reset all filters
                                               $scope.reset = function(){
                                                   console.log($scope.prefsDefault.date_value);
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
                                               $scope.init();
                                           }]);