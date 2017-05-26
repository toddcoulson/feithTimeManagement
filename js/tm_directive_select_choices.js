app.directive('selectChoices', function () {
    return {
        scope: {
            statuses: '=',
            value: '=',
            record: '=',
            record2: '=',
            servicename: '@',
            action: '@'
        },
        controller: function ($scope, $element, $attrs, $location, $injector, $timeout)
        {
            $(document).keydown(function(e){
                if($scope.editing && e.keyCode =='13')
                    $scope.submit()
                    });
            var service = $injector.get($scope.servicename);
            $scope.convertName = $injector.get('coreService');
            $scope.editing = false;
            $timeout(function() {
                $scope.tmpValue = $scope.value;
            });
            $scope.oldval ="";
            $scope.edit = function () {
                $scope.tmpValue = $scope.value;
                $scope.oldval = $scope.value;
                $scope.editing = true;
            };
            $scope.submit=function($event){
                console.log("we are submitting")
                $scope.editing = false;
                $scope.value = $scope.tmpValue;
                if($scope.record2 == undefined){
                    service[$scope.action]($scope.record, $scope.value);
                }else{
                    service[$scope.action]($scope.record, $scope.record2, $scope.value);
                }
            }
            $scope.changeStatus=function(s){
                $scope.tmpValue = s;
            }
            $scope.capitalize = function(textInput){
                return textInput.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});
            }
            $scope.cancel = function(){
                $scope.value = $scope.oldval;
                $scope.editing = false;
            }
            $scope.displayStatus = function(s){
                for(var i=0; i<$scope.statuses.length; i++){
                    if(s === $scope.statuses[i].value){
                        return $scope.statuses[i].display;
                    }
                };
            };
            $scope.displayClass = function(s){
                for(var i=0; i<$scope.statuses.length; i++){
                    if(s === $scope.statuses[i].value){
                        return $scope.statuses[i].btn_class;
                    }
                };
            };
        },
        restrict:"E",
        replace: true,
        templateUrl: obj + 'tm_template_select_choices.html'
    };
});