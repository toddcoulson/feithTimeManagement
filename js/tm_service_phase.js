app.service('phaseService',['$q', '$http', '$rootScope', 'coreService', function($q,
                                                                                  $http, $rootScope, coreService){
    //base functionality begin
    var self = this;
    var phase, hoursWorked;
    var debug = true;
    this.phaseObject = function(){
        return phase;
    }
    this.returnHoursWorked = function(){
        return hoursWorked;
    }
    this.addNewPhase = function(newPhase){
        var deferred = $q.defer();
        $http({
            url: sql + 'addTmNewPhase',
            method: 'POST',
            data: newPhase
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call add new phase")
                coreService.newLocation(newPhase.project_id, newPhase.phase_id, '/details');
            }else{
                console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.getPhase = function(phase_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmPhaseDetails',
            method: 'POST',
            data: {phase_id:phase_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call get phase")
                phase = response.data.resultSet[0];
            }else{
                console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updatePhaseName = function(phase_id, phase_name){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseItemPhaseName',
            method: 'POST',
            data: {phase_id:phase_id, phase_name:phase_name}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated phase name")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateDescription = function(phase_id, d){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseItemDescription',
            method: 'POST',
            data: {phase_id:phase_id, description:d}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated phase description")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updatePhaseStatus = function(phase_id, phase_status){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseItemPhaseStatus',
            method: 'POST',
            data: {phase_id:phase_id, phase_status:phase_status}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated phase status")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateStartDate = function(phase_id, start_date){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseItemStartDate',
            method: 'POST',
            data: {phase_id:phase_id, start_date:start_date}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated start date")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateEndDate = function(phase_id, end_date){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseItemEndDate',
            method: 'POST',
            data: {phase_id:phase_id, end_date:end_date}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated end date")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateStatusDate = function(phase_id, status_date){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseItemStatusDate',
            method: 'POST',
            data: {phase_id:phase_id, status_date:status_date}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated status date")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.removePhase = function(phase_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'rmTmPhase',
            method: 'POST',
            data: {phase_id:phase_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful removal of phase")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.updatePhaseBudget = function(phase_id, budget){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseItemBudget',
            method: 'POST',
            data: {phase_id:phase_id, budget:budget}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call set phase budget")
                    }else{
                        if(debug) console.log("error setTmPhaseBudget" + response.status,
                                              response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error setTmPhaseBudget', response.status,
                                    response.data);
        });
        return deferred.promise;
    }
    this.updatePhaseHours = function(phase_id, estimated_hours){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPhaseItemEstimatedHours',
            method: 'POST',
            data: {phase_id:phase_id, estimated_hours:estimated_hours}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call set phase estimated hours")
                    }else{
                        if(debug) console.log("error setTmPhaseBudget" + response.status,
                                              response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error setTmPhaseBudget', response.status,
                                    response.data);
        });
        return deferred.promise;
    }
    this.getHoursWorkedPhase = function(project_id, phase_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmSumHoursWorkedPhase',
            method: 'POST',
            data:{project_id: project_id, phase_id: phase_id}
        }).then(function(response) {
            if (response.data.success) {
                hoursWorked = response.data.resultSet[0].hours_worked;
                if(hoursWorked === null){
                    hoursWorked = 0;
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