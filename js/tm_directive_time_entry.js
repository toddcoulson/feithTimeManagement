app.directive('timeEntry', function () {
    return {
        scope: {
            editing: '=?',
            workOnTimesheet: '&?',
            newEntry: '&?', // when a new entry is added, tell parent to add it to their
            display throught this function
            editEntry: '&?',
            editObject: '=?',
            closeModal: '&?' //if modal is used, call this function to close window.
        },
        compile: function(element, attrs){
        },
        controller: function ($scope, $element, $attrs, $location, $injector, $timeout,
                               $rootScope, GetNewIdService, coreService, GetCustomersService, projectService,
                               roleService, timeEntryService, departmentTasksService) {
            $attrs.closeModal ? $scope.useModal = true : $scope.useModal = false;
            $scope.editUser = 0;
            $scope.editUser = $rootScope.currentUser.userId;
            // init time for time entry object
            $scope.time = {};
            $scope.time.type_of_hours = 'Regular';
            $scope.time.date = $rootScope.dateToday;
            $scope.prs = projectService;
            $scope.role = roleService;
            $scope.task = departmentTasksService;
            $scope.core = coreService;
            //init form elements for tracking required entries
            $scope.datepickers = {}
            $scope.datepickers.cal = false;
            $scope.form = {};
            $scope.form.entry={};
            $scope.gcs = GetCustomersService;
            $scope.init = function(){
                $scope.initPreserve();
                $scope.getCustomerList().then(function(){
                    if($scope.editObject){
                        $scope.entryValue = $scope.editObject;
                        $scope.editUser = $scope.entryValue.usr_id;
                        $scope.getTaskData().then(function(){
                            $scope.retriveTimeEntryDetails($scope.editObject);
                        });
                    }else{
                        $scope.getTaskData()
                    }
                });
                $scope.getHoursEmployeeDate($scope.time.date);
            };
            $scope.open = function($event, which) {
                $event.stopPropagation();
                console.log(which)
                $scope.datepickers[which] = true;
            };
            //function for resetting locking values.
            $scope.initPreserve = function(){
                $scope.preserve = {
                    date:{selected:false},
                    customer:{selected:false},
                    project:{selected:false},
                    phase:{selected:false},
                    role:{selected:false},
                    hours:{selected:false},
                    type_hours:{selected:false},
                    task:{selected:false},
                    details:{selected:false}
                };
            }
            $scope.$on('retriveTimeEntryDetails',function(event, data){
                $scope.entryValue = data;
                $scope.editUser = $scope.entryValue.userId;
                console.log('editUser:',$scope.editUser)
                $scope.retriveTimeEntryDetails(data);
            });
            //function needed to gather company, project, phase, role data based on existance
            of previous item.
            $scope.retriveTimeEntryDetails = function(entry){
                $scope.time.date = Date.parse(entry.submit_date.substring(0, 12));
                angular.forEach($scope.companies , function(c) {
                    if(entry.company_name == c.name){
                        $scope.time.company = c;
                        $scope.getProjectData(c).then(function(){
                            angular.forEach($scope.projects , function(p) {
                                if(entry.project_name == p.project_name){
                                    $scope.time.project = p;
                                    $scope.getPhaseData(p).then(function(){
                                        angular.forEach($scope.phases , function(ph) {
                                            if(entry.phase_name == ph.phase_name){
                                                $scope.time.phase = ph;
                                                $scope.getRoleData(ph).then(function(){
                                                    angular.forEach($scope.roles , function(r) {
                                                        if(entry.role_id == r.role_id){
                                                            $scope.time.role = r;
                                                        }
                                                    });
                                                });
                                            }
                                        });
                                    });
                                }
                            });
                        });
                    }
                });
                angular.forEach($scope.tasks , function(t) {
                    console.log(entry.task_name, t.task_name)
                    if(entry.task_name == t.task_name){
                        $scope.time.task = t;
                    }
                });
                $scope.time.comments = entry.comments;
                $scope.time.hours_worked = parseFloat(entry.hours_worked, 10);
                angular.forEach($scope.types_of_hours , function(th) {
                    if(entry.type_of_hours == th.value){
                        $scope.time.type_of_hours = th.value;
                    }
                });
            }
            //function called to get the total hours for a particular date - updates when a
            new date is chosen on time entry form.
            $scope.getHoursEmployeeDate = function(date){
                timeEntryService.getHoursWorkedEmployeeDate($scope.editUser,
                                                            date).then(function(){
                    $scope.hoursOnDay = timeEntryService.hoursOnDay();
                });
            }
            //call to get a list of all customers
            $scope.getCustomerList = function(){
                return $scope.gcs.getCustomerList($scope.companies).then(function(){
                    $scope.companies = $scope.gcs.companies;
                });
            }
            //get project data for a particular customer.
            $scope.getProjectData = function(c){
                return $scope.prs.getProjectsForCompany(c.cust_id).then(function(){
                    $scope.projects = $scope.prs.projectList();
                    angular.forEach($scope.projects , function(p) {
                        angular.forEach($rootScope.statuses , function(s) {
                            if(p.project_status === s.value) p.project_status_display = s.display
                                });
                    });
                    $scope.roles = {};
                    $scope.phases = {};
                });
            }
            //get phase data based on a particular project.
            $scope.getPhaseData = function(p){
                return $scope.prs.getPhasesList(p.project_id).then(function(){
                    $scope.phases = $scope.prs.phasesList();
                    angular.forEach($scope.phases , function(p) {
                        angular.forEach($rootScope.statuses , function(s) {
                            if(p.phase_status === s.value) p.phase_status_display = s.display
                                });
                    });
                    $scope.roles = {};
                });
            }
            //get role data based on a particular phase.
            $scope.getRoleData = function(p){
                return $scope.role.getPhaseRoles(p.phase_id).then(function(){
                    $scope.roles = $scope.role.getRoles();
                });
            }
            //get the available tasks for a particular user's department.
            $scope.getTaskData = function(){
                return
                $scope.task.getDepartmentTasksForEmployee($scope.editUser).then(function(){
                    $scope.tasks = $scope.task.deptTasks();
                });
            }
            //upon submit of time entry form, call this everytime.
            $scope.submit = function() {
                //pull out information to send to database (d)
                var d = {};
                d.entry_date = new Date($scope.time.date);
                d.entry_date = d.entry_date.toISOString();
                d.usr_id = $scope.editUser;
                d.customer_id = Number($scope.time.company.cust_id);
                d.project_id = Number($scope.time.project.project_id);
                d.phase_id = Number($scope.time.phase.phase_id);
                if($scope.time.task){
                    d.task_name = $scope.time.task.task_name;
                }else{
                    d.task_name=0;
                }
                d.type_of_hours = $scope.time.type_of_hours;
                d.hours_worked = $scope.time.hours_worked;
                d.role_id = Number($scope.time.role.role_id);
                d.comments = $scope.time.comments;
                //pull out information needed to be pushed to display for a new entry (newTE)
                var newTE = {};
                newTE.time_entry_id = GetNewIdService.newID;
                newTE.entry_date = new Date($scope.time.date);
                newTE.entry_date = newTE.entry_date.toISOString();
                newTE.submit_date = new Date();
                newTE.hours_worked = $scope.time.hours_worked;
                newTE.company_name = $scope.time.company.name;
                newTE.project_name = $scope.time.project.project_name;
                newTE.phase_name = $scope.time.phase.phase_name;
                newTE.role_code = $scope.time.role.role_code;
                if (typeof($scope.time.task) != "undefined") newTE.task_name =
                    $scope.time.task.task_name;
                newTE.type_of_hours = $scope.time.type_of_hours
                newTE.comments = $scope.time.comments;
                if($scope.editing){
                    d.time_entry_id = $scope.entryValue.time_entry_id;
                    timeEntryService.updateTimeEntry(d);
                    $scope.editEntry({arg:newTE});
                    //clear form
                }else{
                    GetNewIdService.returnUniqueID().then(function(){
                        //add in time_entry_id from service
                        d.time_entry_id = GetNewIdService.newID;
                        //write item to db with d object
                        timeEntryService.addTimeEntry(d);
                        //draw the item in with newTE object
                        $scope.newEntry({arg:newTE});
                    });
                }
                $scope.checkClear();
                $scope.close();
                $scope.editing = $scope.showTmAlert = false;
                $scope.workOnTimesheet = "Enter";
            };
            $scope.close = function(){
                $scope.closeModal();
            }
            //when role is selected, phase and project and customer need to be turned on.
            $scope.toggleRole = function(){
                $scope.preserve.role.selected = !$scope.preserve.role.selected
                if($scope.preserve.role.selected){
                    $scope.preserve.phase.selected = $scope.preserve.project.selected =
                        $scope.preserve.customer.selected = true;
                }
            }
            //turn off role OR select project and customer based on state
            $scope.togglePhase = function(){
                $scope.preserve.phase.selected = !$scope.preserve.phase.selected
                if(!$scope.preserve.phase.selected){
                    $scope.preserve.role.selected = false;
                }else{
                    $scope.preserve.project.selected = $scope.preserve.customer.selected = true;
                }
            }
            //turn off role and phase OR select customer based on state
            $scope.toggleProject = function(){
                $scope.preserve.project.selected = !$scope.preserve.project.selected
                if(!$scope.preserve.project.selected){
                    $scope.preserve.role.selected = $scope.preserve.phase.selected = false;
                }else{
                    $scope.preserve.customer.selected = true;
                }
            }
            //trun off role, phase, project if deselected customer.
            $scope.toggleCustomer = function(){
                $scope.preserve.customer.selected = !$scope.preserve.customer.selected
                if(!$scope.preserve.customer.selected){
                    $scope.preserve.role.selected = $scope.preserve.phase.selected =
                        $scope.preserve.project.selected = false;
                }
            }
            //clear fields based on locking state of each time entry form field.
            $scope.checkClear = function(){
                $scope.editing = $scope.showTmAlert = false;
                $scope.workOnTimesheet = "Enter"
                if(!$scope.preserve.date.selected) $scope.time.date = $rootScope.dateToday;
                if(!$scope.preserve.role.selected){
                    $scope.roles = {};
                    $scope.time.role = "";
                }
                if(!$scope.preserve.phase.selected){
                    $scope.phases = {};
                    $scope.time.phase = "";
                }
                if(!$scope.preserve.project.selected){
                    $scope.projects = {};
                    $scope.time.project = "";
                }
                if(!$scope.preserve.hours.selected){
                    $scope.time.hours_worked = "";
                    $scope.time.hour_type = 'Regular';
                    $scope.time.type_of_hours = 'Regular';
                }
                if(!$scope.preserve.customer.selected) $scope.time.company = "";
                if(!$scope.preserve.task.selected) $scope.time.task = "";
                if(!$scope.preserve.details.selected) $scope.time.comments = "";
            }
            //time entry form when clear is clicked.
            $scope.clear = function(){
                $scope.initPreserve();
                $scope.checkClear();
            }
            $scope.init();
        },
        restrict:"E",
        replace: true,
        templateUrl: obj + 'tm_partial_time_entry.html'
    };
});