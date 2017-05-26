app.service('projectService', ['$q', '$http', '$rootScope', 'coreService', function($q,
                                                                                     $http, $rootScope, coreService){
    var self = this;
    var projectManagers, projectList, phasesList, project, hoursWorked, estimatedHours;
    this.projectManagers = function(){
        return projectManagers;
    }
    this.projectList = function(){
        return projectList;
    }
    this.phasesList = function(){
        return phasesList;
    }
    this.projectObject = function(){
        return project;
    }
    this.returnHoursWorked = function(){
        return hoursWorked;
    }
    this.returnEstimatedHours = function(){
        return estimatedHours;
    }
    this.addNewProject = function(newProject){
        var deferred = $q.defer();
        $http({
            url: sql + 'addTmNewProject',
            method: 'POST',
            data: newProject
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call add new project");
                coreService.newLocation(newProject.project_id, -1, '/details');
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.getAllProjects = function(){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmProjectDetails',
            method: 'GET'
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call get all projects");
                projectList = response.data.resultSet;
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    }
    this.getProjectsForCompany = function(cust_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmProjectDetails',
            method: 'POST',
            data: {customer_id:Number(cust_id)}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call projects for company");
                projectList = response.data.resultSet;
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.getProjectsForCompanyMyProjects = function(usr_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmProjectDetailsMyProjects',
            method: 'POST',
            data: {usr_id:usr_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("successful call projects for company my projects");
                projectList = response.data.resultSet;
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.getProjectDetails = function(project_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmProjectDetails',
            method: 'POST',
            data: {project_id:project_id}
        }).then(function(response) {
            if (response.data.success) {
                project = response.data.resultSet[0];
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.getPhasesList = function(p_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmProjectPhase',
            method: 'POST',
            data: {project_id:p_id}
        }).then(function(response) {
            if (response.data.success) {
                self.phases=response.data.resultSet;
                phasesList = response.data.resultSet;
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateProjectName = function(project_id, project_name){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemProjectName',
            method: 'POST',
            data: {project_id:project_id, project_name:project_name}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated project name")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateStatusDate = function(project_id, status_date){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemStatusDate',
            method: 'POST',
            data: {project_id:project_id, status_date:status_date}
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
    this.updateProjectStatus = function(project_id, project_status){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemProjectStatus',
            method: 'POST',
            data: {project_id:project_id, project_status:project_status}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated project status")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateDescription = function(project_id, description){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemDescription',
            method: 'POST',
            data: {project_id:project_id, description:description}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated description")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateDiscountPercentage = function(project_id, discount_percentage){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemDiscountPercentage',
            method: 'POST',
            data: {project_id:project_id, discount_percentage:discount_percentage}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated discount percentage")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateCategory = function(project_id, category){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemCategory',
            method: 'POST',
            data: {project_id:project_id, category:category}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated category")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateBillingFrequency = function(project_id, billing_frequency){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemBillingFrequency',
            method: 'POST',
            data: {project_id:project_id, billing_frequency:billing_frequency}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated billing frequency")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updateBillType = function(project_id, bill_type){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemBillType',
            method: 'POST',
            data: {project_id:project_id, bill_type:bill_type}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated category")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.updatePriceModel = function(project_id, price_model){
        var deferred = $q.defer();
        $http({
            url: sql + 'setTmProjectItemPriceModel',
            method: 'POST',
            data: {project_id:project_id, price_model:price_model}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("updated price model")
                    }else{
                        if(debug) console.log("error" + response.status, response.data);
                    }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.getProjectManagers = function(project_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmProjectManagers',
            method: 'POST',
            data: {project_id:project_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("success get project managers")
                projectManagers = response.data.resultSet;
            }else{
                if(debug) console.log("error" + response.status, response.data);
            }
            deferred.resolve();
        }).catch(function(response) {
            if(debug) console.error('error', response.status, response.data);
        });
        return deferred.promise;
    };
    this.getHoursWorkedProject = function(project_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmSumHoursWorkedProject',
            method: 'POST',
            data:{project_id: project_id}
        }).then(function(response) {
            if (response.data.success) {
                if(debug) console.log("success hours worked project");
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
    this.getEstimatedHoursProject = function(project_id){
        var deferred = $q.defer();
        $http({
            url: sql + 'getTmSumEstimatedHoursProject',
            method: 'POST',
            data:{project_id: project_id}
        }).then(function(response) {
            if (response.data.success) {
                estimatedHours = response.data.resultSet[0].estimated_hours;
                if(estimatedHours === null){
                    estimatedHours = 0;
                }
                if(debug) console.log("success estimated hours project", estimatedHours);
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