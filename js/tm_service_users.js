app.service('userService',['$q', '$http', '$rootScope', 'coreService', function($q,
                                                                                 $http, $rootScope, coreService){
    //base functionality begin
    var self = this;
    var projectManagers, users, phaseEmployees;
    this.getUsers = function(){
        return users;
    }
    this.getUsersData = function(){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmUsers',
            method: 'GET'
        }).then(function(response) {
            if (response.data.success) {
                users = response.data.resultSet;
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.getProjectManagers = function(){
        return projectManagers;
    }
    this.getProjectManagersData = function(project_id){
        var deferred = $q.defer();
        console.log("passing: "+project_id)
        $http({
            url: sql + 'getTmProjectManagers',
            method: 'POST',
            data:{project_id:project_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log('success', response.data.resultSet);
                projectManagers = response.data.resultSet;
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.removeProjectManager = function(project_id, usr_id){
        var deferred = $q.defer();
        console.log(project_id, usr_id)
        $http({
            url: sql + 'rmTmProjectManager',
            method: 'POST',
            data: {project_id:project_id, usr_id:usr_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call remove project manager")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.addProjectManager = function(project_id, usr_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'addTmProjectManager',
            method: 'POST',
            data: {project_id:project_id, usr_id:usr_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call add project manager")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.getPhaseEmployees = function(){
        return phaseEmployees;
    }
    this.getPhaseEmployeesData = function(phase_id){
        var deferred = $q.defer();
        console.log(phase_id)
        $http({
            url: sql + 'getTmPhaseEmployees',
            method: 'POST',
            data:{phase_id:phase_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log('success get phase employee data',
                                      response.data.resultSet);
                phaseEmployees = response.data.resultSet;
            }else{
                if(debug) console.log("getPhaseEmployeesData error" + response.status,
                                      response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.removePhaseEmployee = function(phase_id, usr_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'rmTmPhaseEmployee',
            method: 'POST',
            data: {phase_id:phase_id, usr_id:usr_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("removePhaseEmployee successful call")
                    }else{
                        if(debug) console.log("removePhaseEmployee error" + response.status,
                                              response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('removePhaseEmployee error', response.status,
                                    response.data);
        });
        return deferred.promise;
    }
    this.removeAllPhaseEmployees = function(phase_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'rmTmPhaseEmployee',
            method: 'POST',
            data: {phase_id:phase_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("removePhaseEmployee successful call")
                    }else{
                        if(debug) console.log("removePhaseEmployee error" + response.status,
                                              response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('removePhaseEmployee error', response.status,
                                    response.data);
        });
        return deferred.promise;
    }
    this.addPhaseEmployee = function(phase_id, usr_id, is_developer){
        var deferred = $q.defer();
        $http({
            url: sql + 'addTmPhaseEmployee',
            method: 'POST',
            data: {phase_id:phase_id, usr_id:usr_id, is_developer:is_developer}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("addPhaseEmployee successful call")
                    }else{
                        if(debug) console.log("addPhaseEmployee error" + response.status,
                                              response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
        })
    }
};