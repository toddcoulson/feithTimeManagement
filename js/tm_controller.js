app.controller('MainController', ['$scope', '$rootScope', '$http', '$location',
                                  '$filter', '$q', '$routeParams', 'AUTH_EVENTS', 'USER_ROLES', 'AuthorizationService',
                                  function($scope, $rootScope, $http, $location, $filter, $q, $routeParams, AUTH_EVENTS,
                                            USER_ROLES, AuthorizationService) {
                                      $rootScope.partials = {
                                          time_entry: obj + 'tm_partial_time_entry.html',
                                          timesheet_list: obj + 'tm_partial_timesheet_list.html',
                                          timesheet_list_alt: obj + 'tm_partial_timesheet_list_alt.html',
                                          personal_reporting: obj + 'tm_partial_personal_reporting.html',
                                          personal_preferences: obj + 'tm_partial_personal_preferences.html',
                                          company_list: obj + 'tm_partial_company_list.html',
                                          company_list_tools: obj + 'tm_partial_company_list_tools.html',
                                          phase_list: obj + 'tm_partial_project_phase_list.html',
                                          project_details: obj + 'tm_partial_project_details.html',
                                          project_details_entry: obj + 'tm_partial_project_details_entry.html',
                                          project_phase_list: obj + 'tm_partial_project_phase_list.html',
                                          project_reporting: obj + 'tm_partial_project_reporting.html',
                                          project_details_tools: obj + 'tm_partial_project_detail_tools.html',
                                          project_phase_list_tools: obj + 'tm_partial_project_phase_list_tools.html',
                                          project_managers: obj + 'tm_partial_user_display_selection.html',
                                          phase_details: obj + 'tm_partial_phase_details.html',
                                          phase_details_entry: obj + 'tm_partial_phase_details_entry.html',
                                          roles: obj + 'tm_partial_phase_roles.html',
                                          //preferences: obj + 'tm_partial_preferences.html',
                                          phase_reporting: obj + 'tm_partial_phase_reporting.html',
                                          phase_employees: obj + 'tm_partial_user_display_selection.html',
                                          department_tasks: obj + 'tm_partial_department_tasks.html',
                                          admin_roles_list: obj + 'tm_partial_admin_roles_list.html',
                                          sections_nav: obj + 'tm_partial_sections_nav.html',
                                          nav: obj + 'tm_partial_nav.html',
                                          breadcrumb: obj + 'tm_partial_breadcrumb.html',
                                          filter_timesheets: obj + 'tm_partial_filter_timesheets.html'
                                      };
                                      $scope.init = function(){
                                          $rootScope.buildNav()
                                      }
                                      $scope.headerSettings = {
                                          app_name: 'Time Management',
                                          logoff_path: 'logout/y'
                                      };
                                      $scope.checkAuth = function(m){
                                          if(m){
                                              return $rootScope[m]();
                                          }else{
                                              return true;
                                          }
                                      }
                                      $rootScope.buildNav = function () {
                                          $rootScope.tmNavs = [];
                                          $rootScope.tmNavs.push(tmTimesheetsSection);
                                          $rootScope.tmNavs.push(tmReportingSection);
                                          $rootScope.tmNavs.push(tmPreferencesSection);
                                          if (AuthorizationService.isAuthorized([USER_ROLES.tmAdmin, USER_ROLES.tmManager,
                                                                                 USER_ROLES.tmBilling, USER_ROLES.tmPM])) {
                                              $rootScope.tmNavs.push(tmPMSection);
                                              $rootScope.tmNavs.push(tmAdminSection);
                                          }
                                      };
                                      $scope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl) {
                                          $rootScope.previousPath = absOldUrl.substring(absOldUrl.indexOf("#") + 1);
                                      });
                                      $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
                                          //for example, send the user to the root path
                                          $location.path("/");
                                      });
                                      $rootScope.$on(AUTH_EVENTS.cancelLogin, function(event, args) {
                                          $scope.logoff();
                                      });
                                      $rootScope.$on(AUTH_EVENTS.sessionCreated, function(event, args) {
                                          //$rootScope.appInit();
                                      });
                                      $scope.$on(AUTH_EVENTS.rolesLearned, function (){
                                          $scope.buildNav();
                                          if (AuthorizationService.isAuthorized([USER_ROLES.admin])) {
                                          }
                                      });
                                      $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(event, args) {
                                          $location.path('/login');
                                      });
                                      $rootScope.$on(AUTH_EVENTS.sessionTimeout, function() {
                                          $.growl.error({
                                              title: 'Session Timeout',
                                              message: '',
                                              size: "large"
                                          });
                                      });
                                      $rootScope.$on(AUTH_EVENTS.sessionExpired, function (){
                                          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                                      });
                                      $rootScope.$on(AUTH_EVENTS.notAuthorized, function(){
                                          if (AuthorizationService.isAuthorized([USER_ROLES.admin])) {
                                              if ($rootScope.previousPath == '/login')
                                                  $rootScope.previousPath = '/';
                                              $location.path($rootScope.previousPath);
                                          } else {
                                              $location.path('/not-authorized');
                                          }
                                      });
                                      $rootScope.$on(AUTH_EVENTS.loginFailed, function() {
                                          $.growl.error({
                                              title: "Failed Login",
                                              message: "Login has failed.",
                                              size: 'large'
                                          });
                                      });
                                      $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
                                          $location.path('/login');
                                      });
                                      var tmTimesheetsSection = {title:'Time Entry', path:'/timesheets'};
                                      var tmPMSection = {title:'Project Management', path:'/projects'};
                                      var tmAdminSection = {title:'Admin', path:'/role-management'};
                                      var tmReportingSection = {title:'Reporting Dashboard', path:'/reporting'};
                                      var tmPreferencesSection = {title:'Preferences', path:'/preferences'};
                                      // Date Format
                                      $scope.dateOptions = {
                                          formatYear: 'yyyy',
                                          startingDay: 1
                                      };
                                      $scope.initDate = new Date();
                                      $rootScope.dateFormat = "dd-MMM-yyyy";
                                      $scope.dateTimeFormat = "dd-MMM-yyyy HH:mm";
                                      $scope.dateTimeFormatLong = "dd-MMM-yyyy hh:mm:ss:a";
                                      $scope.dateTomorrow = $scope.initDate.getDate() + 1;
                                      $rootScope.dateToday = new Date();
                                      $rootScope.userCanEditAdmin = function() {
                                          return (AuthorizationService.isAuthorized([USER_ROLES.tmAdmin]));
                                      };
                                      $rootScope.userCanViewPM = function() {
                                          return (AuthorizationService.isAuthorized([USER_ROLES.tmAdmin, USER_ROLES.tmPM,
                                                                                     USER_ROLES.tmManager, USER_ROLES.tmBilling]));
                                      };
                                      $rootScope.userCanViewAdmin = function() {
                                          return (AuthorizationService.isAuthorized([USER_ROLES.tmAdmin, USER_ROLES.tmPM]));
                                      };
                                      $rootScope.adminNav = {
                                          header:"Administration",
                                          navItems:[
                                              {title:'Role Management', path:'/role-management'},
                                              {title:'Department Tasks', path:'/department-tasks'}
                                          ]}
                                      $rootScope.companyNav = {
                                          header:"Company Navigation",
                                          navItems:[
                                              {title:'All Projects', path:'/'},
                                              {title:'My Projects', path:'/my-projects'},
                                              {title:'All Timesheets', path:'/all-timesheets'}
                                          ]}
                                      $rootScope.projectNav = {
                                          header:"Project Navigation",
                                          navItems:[
                                              {title:'Project Phases', path:'/phase-list'},
                                              {title:'Project Details', path:'/details'},
                                              {title:'Project Managers', path:'/managers'},
                                              {title:'Reporting', path:'/project-reporting'},
                                              {title:'Project Timesheets', path:'/project-timesheets'}
                                          ]}
                                      $rootScope.phaseNav = {
                                          header:"Phase Navigation",
                                          navItems:[
                                              {title:'Phase Details', path:'/details'},
                                              {title:'Reporting', path:'/phase-reporting'},
                                              {title:'Roles', path:'/roles'},
                                              {title:'Assigned Employees', path:'/employees'},
                                              {title:'Phase Timesheets', path:'/phase-timesheets'}//,
                                              //{title:'Preferences', path:'/preferences'}
                                          ]}
                                      $rootScope.navs = {admin:$rootScope.adminNav,
                                                         personal:$rootScope.personalNav,
                                                         company:$rootScope.companyNav,
                                                         project:$rootScope.projectNav,
                                                         phase:$rootScope.phaseNav,
                                                         tm:$rootScope.tmNav}
                                      $rootScope.statuses = [
                                          {display:'Pending', value:'pending', btn_class:'fss-status-three'},
                                          {display:'Active', value:'active', btn_class:'fss-status-one'},
                                          {display:'Cancelled', value:'cancelled', btn_class:'fss-status-two'},
                                          {display:'Closed', value:'closed', btn_class:'fss-status-four'}
                                      ];
                                      $rootScope.categories=[
                                          {value: 'commercial', display: 'Commercial', btn_class:'fss-status-one'},
                                          {value:'sewp', display:'SEWP', btn_class:'fss-status-two'},
                                          {value:'gsa', display:'GSA', btn_class:'fss-status-three'}
                                      ];
                                      $rootScope.priceModels=[{value: 'fixed', display: 'Fixed', btn_class:'fss-statusone'},
                                                              {value: 'tm', display: 'T&M', btn_class:'fss-status-two'}];
                                      $rootScope.frequencies=[{value: 'begin', display: 'At Begin', btn_class:'fss-statusone'},
                                                              {value: 'end', display: 'At End', btn_class:'fss-status-two'},
                                                              {value: 'monthly', display: 'Monthly', btn_class:'fss-status-three'},
                                                              {value: 'phase', display: 'By Phase', btn_class:'fss-status-four'},
                                                              {value: 'schedule', display: 'Schedule', btn_class:'fss-status-five'},
                                                              {value: 'other', display: 'Other', btn_class:'fss-status-six'}];
                                      $rootScope.billings=[{value: 'billable', display: 'Billable', btn_class:'fss-statusone'},
                                                           {value: 'nonbillable', display: 'Non-Billable', btn_class:'fss-statustwo'}];
                                      $rootScope.sorts = [{name:'Entry Date', value:'entry_date_sort'},
                                                          {name:'Phase Name', value:'phase_name'},
                                                          {name:'Project Name', value:'project_name'},
                                                          {name:'Company Name', value:'company_name'},
                                                          {name:'Hours Worked', value:'hours_worked'} ];
                                      $rootScope.companies = [];
                                      $rootScope.goRootNav = function(nav){
                                          $location.path(nav);
                                      }
                                      $scope.path = function(nav) {
                                          if (
                                              ($location.$$path.indexOf(nav.path) > -1 && nav.path != '/') ||
                                              ($location.$$path == nav.path + "projects" && nav.path == '/')
                                          ) {
                                              return 'active';
                                          }
                                          return '';
                                      };
                                      $scope.logoff = function() {
                                          $scope.lastRoute = null;
                                          $location.path('/logout/y');
                                      };
                                  }]);
app.filter('parseDate', function() {
    return function(input) {
        return new Date(input);
    };
});