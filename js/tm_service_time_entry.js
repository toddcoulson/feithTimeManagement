app.service('timeEntryService',['$timeout','$q', '$http', '$rootScope', 'coreService',
                                function($timeout, $q, $http, $rootScope, coreService){
                                    //base functionality begin
                                    var self = this;
                                    var hoursOnDay;
                                    this.hoursOnDay = function(){
                                        return hoursOnDay;
                                    }
                                    this.addTimeEntry = function(te){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'addTmTimeEntryItem',
                                            method: 'POST',
                                            data:te
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful submission of new time entry item")
                                                    }else{
                                                        if(debug) console.log("error" + response.status, response.data);
                                                    }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.updateTimeEntry = function(te){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'setTmTimeEntryItem',
                                            method: 'POST',
                                            data:te
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful update of time entry item")
                                                    }else{
                                                        if(debug) console.log("error" + response.status, response.data);
                                                    }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.getTimeEntriesEmployee = function(usr_id, min_date, max_date){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'getTmTimeEntries',
                                            method: 'POST',
                                            data:{usr_id: usr_id, max_date:max_date, min_date:min_date}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful retrival of entries for employee",
                                                                      response.data.resultSet);
                                                deferred.resolve(response.data.resultSet);
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                                deferred.resolve(response.data);
                                            }
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.getTimeEntriesProject = function(project_id, min_date, max_date){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'getTmTimeEntries',
                                            method: 'POST',
                                            data:{project_id: project_id, max_date:max_date, min_date:min_date}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful retrival of entries for employee",
                                                                      response.data.resultSet);
                                                deferred.resolve(response.data.resultSet);
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                                deferred.resolve(response.data);
                                            }
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.getTimeEntriesPhase = function(phase_id, min_date, max_date){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'getTmTimeEntries',
                                            method: 'POST',
                                            data:{phase_id: phase_id, max_date:max_date, min_date:min_date}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful retrival of entries for employee",
                                                                      response.data.resultSet);
                                                deferred.resolve(response.data.resultSet);
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                                deferred.resolve(response.data);
                                            }
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.getMyTimeEntries = function(usr_id){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'getTmTimeEntriesMyProjects',
                                            method: 'POST',
                                            data:{usr_id: usr_id}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful retrival of entries for employee",
                                                                      response.data.resultSet);
                                                entries = response.data.resultSet;
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                            }
                                            deferred.resolve();
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.getTimeEntriesAll = function(min_date, max_date){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'getTmTimeEntries',
                                            method: 'POST',
                                            data:{usr_id:null, max_date:max_date, min_date:min_date}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                if(debug) console.log("successful retrival of entries for all",
                                                                      response.data.resultSet);
                                                deferred.resolve(response.data.resultSet);
                                            }else{
                                                if(debug) console.log("error" + response.status, response.data);
                                                deferred.resolve(response.data);
                                            }
                                        }).catch(function(response) {
                                            if(debug) console.error('error', response.status, response.data);
                                        });
                                        return deferred.promise;
                                    }
                                    this.getHoursWorkedEmployeeDate = function(usr_id, entry_date){
                                        var deferred = $q.defer();
                                        $http({
                                            url: sql + 'getTmHoursWorkedEmployeeDate',
                                            method: 'POST',
                                            data:{usr_id: usr_id, entry_date: entry_date}
                                        }).then(function(response) {
                                            if (response.data.success) {
                                                hoursOnDay = response.data.resultSet[0].total_day_hours;
                                                if(hoursOnDay === null){
                                                    hoursOnDay = 0;
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
                                }]);