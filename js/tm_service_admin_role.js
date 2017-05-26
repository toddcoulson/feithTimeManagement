app.service('adminRoleService',['$q', '$http', '$rootScope', 'coreService',
                                function($q, $http, $rootScope, coreService){
                                    //base functionality begin
                                    var self = this;
                                    var roles;
                                    var role;
                                    var codeChange = false;
                                    var nameChange = false;
                                    this.getRoles = function(){
                                        return roles;
                                    }
                                    this.getRolesData = function(){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'getTmRoles',
                                            method: 'GET'
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful call get roles")
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
                                    this.addRole = function(role){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'addTmAdminRole',
                                            method: 'POST',
                                            data: {role_code: role.role_code, role_name: role.role_name,
                                                   standard_rate: role.standard_rate, clearance_rate: role.clearance_rate}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful call add role")
                                                roles.push(role);
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                            }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.checkForCodeMatch = function(pass_code){
                                        for(var i=0; i<roles.length; i++){
                                            if(roles[i].role_code === pass_code){
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                    this.checkForNameMatch = function(pass_code, pass_name){
                                        for(var i=0; i<roles.length; i++){
                                            if(roles[i].role_name === pass_name && roles[i].role_code == pass_code){
                                                return true;
                                            }
                                        }
                                        return false;
                                    }
                                    this.removeRole = function(role_code){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'rmTmAdminRole',
                                            method: 'POST',
                                            data: {role_code: role_code}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful call remove role")
                                                for(var i=0; i<roles.length; i++){
                                                    if(roles[i].role_code === role_code){
                                                        roles.splice(i, 1);
                                                    }
                                                }
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                            }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.updateRoleCode = function(oldCode, newCode){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'setTmAdminRoleRoleCode',
                                            method: 'POST',
                                            data: {role_code: oldCode, new_role_code: newCode}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful call update role")
                                                this.codeChange = true;
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                                this.codeChange = false;
                                            }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.updateRoleName = function(role_code, role_name){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'setTmAdminRoleRoleName',
                                            method: 'POST',
                                            data: {role_code: role_code, role_name: role_name}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful call update role name")
                                                this.nameChange = true;
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                                this.nameChange = false;
                                            }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.updateStandardRate = function(role_code, standard_rate){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'setTmAdminRoleStandardRate',
                                            method: 'POST',
                                            data: {role_code: role_code, standard_rate: standard_rate}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful call update standard rate")
                                                    }else{
                                                        if(debug) console.log("error" + response.status, response.data);
                                                    }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.updateClearanceRate = function(role_code, clearance_rate){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'setTmAdminRoleClearanceRate',
                                            method: 'POST',
                                            data: {role_code: role_code, clearance_rate: clearance_rate}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful call clearance rate "+response.data)
                                                    }else{
                                                        if(debug) console.log("error" + response.status, response.data);
                                                    }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                }]);