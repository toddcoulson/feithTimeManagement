var dsp = 'dataservices/rest/v1/api/';
var sql = dsp+ "developer/sql/";
var obj = dsp+ "developer/object/";
var debug = false;
var authUrl = dsp + 'auth/login';
var activeAuthUrl = dsp + 'auth/keepAlive';
var unauthUrl = dsp + 'auth/logout';
var usrLoginAuditUrl = sql + 'setLoginAudit';
var docViewerAuthUrl = '/docview/viewer/api/auth/login';
var app = angular.module('tmApp',['ngRoute',
                                  'ui.bootstrap',
                                  'ngAnimate',
                                  'feithAppsHeader',
                                  "fdd-angular.authentication",
                                  "fdd-angular.authorization"]);
app.constant('AUTH_ROUTES', {
    authUrl: authUrl,
    unAuthUrl: unauthUrl,
    //loginModalUrl: '/apps/dataservices/rest/v1/api/developer/object/login-modal.html',
    //loginFormUrl: '/apps/dataservices/rest/v1/api/developer/object/login-form.html',
    loginModalUrl: 'login-modal.html', //default loaded in templateCache
    loginFormUrl: 'login-form.html', //default loaded in templateCache
    sinkHtmlUrl: './dataservices/rest/v1/api/developer/object/sink.html',
    currentSessionUrl: './dataservices/rest/v1/api/auth/keepAlive',
    currentUserUrl: './dataservices/rest/v1/api/user',
    databasesUrl: './dataservices/rest/v1/api/auth/databases',
    userRolesUrl: './dataservices/rest/v1/api/group/groups'
    //loginModalUrl and loginFormUrl are served from templateCache in
    authenticationService
    //alternatively provide your own login modal and form and override their paths in
    app.run();
})
app.run(function ($rootScope, AuthenticationService, AuthorizationService, AUTH_ROUTES)
        {
    AUTH_ROUTES.userRolesUrl= './dataservices/rest/v1/api/group/groups';
    AuthenticationService.run();
    AuthorizationService.run();
});
app.constant('USER_ROLES', {
    tmAdmin: 'tmAdmin',
    tmPM: 'tmPM',
    tmManager: 'tmManager',
    tmBilling: 'tmBilling',
    tmEmployee: 'tmEmployee'
});
app.config(['$routeProvider', 'USER_ROLES', function($routeProvider, USER_ROLES ) {
    $routeProvider.
    /*Personal level of display*/
    when('/login', {
        template: '<div>Redirecting...</div>',
        controller: function(){
            console.log('redirecting to login');
            window.location = '/apps/dev/tm/#/Time%20Management';
        },
        routeName: 'loginPage'
    }).
    when('/logout/:force?', {
        template: " ",
        controller: 'fddLogoutController'
    }).
    when('/timesheets', {
        templateUrl: obj + 'tm_page_timesheets.html',
        controller: 'TimeEntryController',
        resolve:{
            level: function( ) {
                return "project";
            },
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/reporting', {
        templateUrl: obj + 'tm_page_personal_reporting.html',
        controller: 'PersonalReportingController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/preferences', {
        templateUrl: obj + 'tm_page_personal_preferences.html',
        controller: 'PersonalPreferencesController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    /*Company level of display*/
    when('/projects', {
        templateUrl: obj + 'tm_page_company_list.html',
        controller: 'CompanyProjectController',
        resolve:{
            "myProjects": function( ) {
                return {
                    value: function( ) {
                        return false;
                    }
                }
            },
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee,
                              USER_ROLES.tmBilling, , USER_ROLES.tmPM, USER_ROLES.tmManager]
        }
    }).
    when('/projects/my-projects', {
        templateUrl: obj + 'tm_page_company_list.html',
        controller: 'CompanyProjectController',
        resolve:{
            "myProjects": function( ) {
                return {
                    value: function( ) {
                        return true;
                    }
                }
            },
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee,
                              USER_ROLES.tmBilling, , USER_ROLES.tmPM, USER_ROLES.tmManager]
        }
    }).
    when('/projects/all-timesheets', {
        templateUrl: obj + 'tm_page_all_timesheets.html',
        controller: 'AllTimesheetsController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee,
                              USER_ROLES.tmBilling, , USER_ROLES.tmPM, USER_ROLES.tmManager]
        }
    }).
    /*Project level of display*/
    when('/projects/project/:project_id/phase-list', {
        templateUrl: obj + 'tm_page_project_phase_list.html',
        controller: 'ProjectPhaseListController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/projects/project/:project_id/details', {
        templateUrl: obj + 'tm_page_project_details.html',
        controller: 'ProjectDetailsController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/projects/project/:project_id/managers', {
        templateUrl: obj + 'tm_page_project_managers.html',
        controller: 'ProjectManagersController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/projects/project/:project_id/project-reporting', {
        templateUrl: obj + 'tm_page_project_reporting.html',
        controller: 'ProjectReportingController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/projects/project/:project_id/project-timesheets', {
        templateUrl: obj + 'tm_page_project_timesheets.html',
        controller: 'ProjectTimesheetsController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    /*Phase level of display*/
    when('/projects/project/:project_id/phase/:phase_id/details', {
        templateUrl: obj + 'tm_page_phase_details.html',
        controller: 'PhaseDetailsController'
    }).
    when('/projects/project/:project_id/phase/:phase_id/phase-reporting', {
        templateUrl: obj + 'tm_page_phase_reporting.html',
        controller: 'PhaseReportingController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/projects/project/:project_id/phase/:phase_id/roles', {
        templateUrl: obj + 'tm_page_phase_roles.html',
        controller: 'PhaseRolesController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/projects/project/:project_id/phase/:phase_id/employees', {
        templateUrl: obj + 'tm_page_phase_employees.html',
        controller: 'PhaseEmployeesController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/projects/project/:project_id/phase/:phase_id/phase-timesheets', {
        templateUrl: obj + 'tm_page_phase_timesheets.html',
        controller: 'PhaseTimesheetsController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/projects/project/:project_id/phase/:phase_id/preferences', {
        templateUrl: obj + 'tm_page_phase_preferences.html',
        controller: 'PhasePreferencesController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    /*Main level nav items*/
    when('/department-tasks', {
        templateUrl: obj + 'tm_page_department_tasks.html',
        controller: 'DepartmentTasksController'
    }).
    when('/role-management', {
        templateUrl: obj + 'tm_page_admin_roles.html',
        controller: 'AdminRolesController',
        resolve: {
            role: function resolveRole(RoleResolver) { return RoleResolver.resolve();}
        },
        data: {
            authorizedRoles: [USER_ROLES.tmAdmin, USER_ROLES.tmEmployee]
        }
    }).
    when('/not-authorized', {
        templateUrl: obj + 'app_not_authorized.html',
        controller: 'AppNotAuthorizedController'
    }).
    otherwise({
        redirectTo: '/timesheets'
    });
}]);
function isoDateToDatabase(date) {
    try {
        var d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        d.setUTCHours(0);
        d.setUTCMinutes(0);
        d.setUTCSeconds(0);
        d.setUTCMilliseconds(0);
        return d.toJSON();
    } catch (e) {
        return date;
    }
};