app.service('prefsService',['$q', '$http', '$rootScope', 'coreService', function($q,
                                                                                  $http, $rootScope, coreService){
    //base functionality begin
    var self = this;
    var dateValue, lastNumberEntries, startDate, endDate;
    var debug = false;
    this.getDateValue = function(){
        return dateValue;
    }
    this.getLastNumberEntries = function(){
        return lastNumberEntries;
    }
    this.getStartDate = function(){
        return startDate;
    }
    this.getEndDate = function(){
        return endDate;
    }
    this.addDefaultPrefs = function(usr_id){
        var deferred = $q.defer();
        console.log(usr_id)
        $http({
            url: sql + 'addTmUserPreference',
            method: 'POST',
            data: {usr_id:usr_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("Check Add Prefs:" + response.status);
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.retrievePreferences = function(usr_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmPreferences',
            method: 'POST',
            data: {usr_id:usr_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("Preferences:" + response.status, response.data);
                deferred.resolve(response.data.resultSet[0]);
            }else{
                if(debug) console.log("error retrieve prefs" + response.status, response.data);
                deferred.resolve(response.data);
            }
        }).catch(function(response) {
            if(debug) console.error('error retrieve prefs', response.status, response.data);
        });
        return deferred.promise;
    }
    this.updateDateValue = function(usr_id, date_value){
        var deferred = $q.defer();
        console.log(usr_id, date_value)
        $http({
            url: sql + 'setTmPreferencesDateValue',
            method: 'POST',
            data: {usr_id:usr_id, date_value:date_value}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated date value")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateLastNumberEntries = function(usr_id, last_number_entries){
        var deferred = $q.defer();
        console.log(usr_id, last_number_entries);
        $http({
            url: sql + 'setTmPreferencesLastNumberEntries',
            method: 'POST',
            data: {usr_id:usr_id, last_number_entries:last_number_entries}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated last number entries")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateStartDate = function(usr_id, start_date){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPreferencesStartDate',
            method: 'POST',
            data: {usr_id:usr_id, start_date:start_date}
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
    this.updateEndDate = function(usr_id, end_date){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmPreferencesEndDate',
            method: 'POST',
            data: {usr_id:usr_id, end_date:end_date}
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
}]);