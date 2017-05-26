app.service('coreService', function($q, $http, $rootScope, $location){
    var self = this;
    var searchAll = " "
    this.setSearchAll = function(v){
        searchAll = v;
    }
    this.getSearchAll = function(){
        return searchAll;
    }
    this.displayStatus = function(s){
        for(var i=0; i<$rootScope.statuses.length; i++){
            if(s === $rootScope.statuses[i].value){
                return $rootScope.statuses[i].display;
            }
        };
    };
    this.displayStatusClass = function(s){
        for(var i=0; i<$rootScope.statuses.length; i++){
            if(s === $rootScope.statuses[i].value){
                return $rootScope.statuses[i].btn_class;
            }
        };
    };
    //javascript helper functions used to convert iso strings to dates.
    this.spliceSlice = function (str, index, count) {
        return str.slice(0, index)+ str.slice(index + count);
    }
    this.convertDateFromISO = function (isoDate){
        var tmpStr = String(isoDate)
        tmpStr = tmpStr.split('T');
        tmpStr = tmpStr[0];
        tmpStr = tmpStr.split("-");
        if(tmpStr[1].substring(0, 1) == 0) tmpStr[1] = this.spliceSlice(tmpStr[1], 0, 1);
        if(tmpStr[2].substring(0, 1) == 0) tmpStr[2] = this.spliceSlice(tmpStr[2], 0, 1);
        return new Date(tmpStr[0], tmpStr[1]-1, tmpStr[2]);
    }
    this.newLocation = function(project_id=-1, phase_id=-1, end_path="", rootPath=false){
        var newPath = "/projects";
        if(rootPath) newPath="";
        if(project_id != -1){
            newPath += "/project/"+project_id
        }
        if(phase_id != -1){
            newPath += "/phase/"+phase_id
        }
        if(end_path != ""){
            newPath += end_path;
        }
        $location.path( newPath );
    };
    this.dateValues = [
        {value:"1month", display:"Past Month"},
        {value:"2month", display:"Past 2 Months"},
        {value:"3month", display:"Past 3 Months"},
        {value:"4month", display:"Past 4 Months"},
        {value:"5month", display:"Past 5 Months"},
        {value:"6month", display:"Past 6 Months"},
        {value:"1year", display:"Past Year"},
        {value:"2year", display:"Past 2 Years"},
        {value:"custom", display:"Custom"}
    ];
    this.convertDateValues = function(val){
        var checkValues = {}
        checkValues.end_date = new Date();
        checkValues.start_date = new Date();
        if(val === '1month'){
            checkValues.start_date.setMonth(checkValues.start_date.getMonth() - 1);
        }else if(val === '2month'){
            checkValues.start_date.setMonth(checkValues.start_date.getMonth() - 2);
        }else if(val === '3month'){
            checkValues.start_date.setMonth(checkValues.start_date.getMonth() - 3);
        }else if(val === '4month'){
            checkValues.start_date.setMonth(checkValues.start_date.getMonth() - 4);
        }else if(val === '5month'){
            checkValues.start_date.setMonth(checkValues.start_date.getMonth() - 5);
        }else if(val === '6month'){
            checkValues.start_date.setMonth(checkValues.start_date.getMonth() - 6);
        }else if(val === '1year'){
            checkValues.start_date.setFullYear(checkValues.start_date.getUTCFullYear() - 1);
        }else if(val === '2year'){
            checkValues.start_date.setFullYear(checkValues.start_date.getUTCFullYear() - 2);
        }
        return checkValues;
    }
    this.types_of_hours =[{value: 'Regular', display:'Regular', btnClass:'btn-primary',
                           iconClass:'clock'},
                          {value: 'Overtime', display:'Overtime', btnClass:'btn-warning', iconClass:'fire'},
                          {value: 'Weekend', display:'Weekend', btnClass:'btn-success',
                           iconClass:'golf_course'},
                          {value: 'NoCharge', display:'No Charge', btnClass:'btn-danger', iconClass:'ban'}];
    //get colors for type of hours.
    this.checkTypeOfHoursColor = function(type){
        if(type === 'Regular'){
            return 'label-primary';
        }else if(type === 'Overtime'){
            return 'label-warning'
        }else if(type === 'Weekend'){
            return 'label-success'
        }else if(type === 'NoCharge'){
            return 'label-danger'
        }
    }
    //get icons for type of hours
    this.checkTypeOfHoursIcon = function(type){
        if(type === 'Regular'){
            return 'clock';
        }else if(type === 'Overtime'){
            return 'fire';
        }else if(type === 'Weekend'){
            return 'golf_course';
        }else if(type === 'NoCharge'){
            return 'ban';
        }
    }
});