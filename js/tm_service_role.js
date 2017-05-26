app.service('roleService',['$q', '$http', '$rootScope', 'coreService', function($q,
                                                                                 $http, $rootScope, coreService){
    //base functionality begin
    var self = this;
    var roles;
    var role;
    var debug=true;
    this.getRoles = function(){
        return roles;
    }
    this.updateNegotiated = function(role_id, negotiated){
        var deferred = $q.defer();
        console.log(role_id, negotiated)
        $http({
            url: sql + 'setTmPhaseRoleNegotiated',
            method: 'POST',
            data: {role_id:Number(role_id), negotiated:Number(negotiated)}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call change negotiated rate")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.updateRoleHours = function(role_id, role_hours){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseRoleRoleHours',
            method: 'POST',
            data: {role_id:role_id, role_hours:role_hours}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call change role hours")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.getPhaseRoles = function(phase_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmPhaseRoles',
            method: 'POST',
            data:{phase_id:phase_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call get phase roles");
                roles = response.data.resultSet;
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.updateRoleProject = function(newRole){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseRole',
            method: 'POST',
            data: newRole
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call update role project")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.removeRoleProject = function(newRole){
        var deferred = $q.defer();
        $http({
            url: sql + 'rmTmPhaseRole',
            method: 'POST',
            data: newRole
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call remove role from project")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.removeAllRolesFromPhase = function(phase_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'rmTmPhaseRole',
            method: 'POST',
            data: {phase_id:phase_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call remove all roles from phase",
                                      response.data)
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.addNewRoleProject = function(newRole){
        var deferred = $q.defer();
        $http({
            url: sql + 'addTmRoleProject',
            method: 'POST',
            data: newRole
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call add new role to project")
                this.newRole = newRole;
            }else{
                if(debug) console.log("error" + response.status, response.data);
                this.newRole = "error";
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.addMultipleNewRoleProjects = function(newRoles){
        var promises = newRoles.map(function(newRole) {
            return $http({
                url: sql + 'addTmRoleProject',
                method: 'POST',
                data: newRole
            }).then(function(response) {
                if (response.data.success) {
                    if(debug) console.log("successful call add new role to project")
                    this.newRole = newRole;
                }else{
                    if(debug) console.log("error" + response.status, response.data);
                    this.newRole = "error";
                }
            }).catch(function(response) {
                if(debug) console.error('error', response.status, response.data);
            });
        });
        return $q.all(promises);
    }
}]);