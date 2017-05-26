app.directive('userSelectionDisplay', function ($rootScope, $filter, userService) {
    return {
        scope: {
            selectedUsers: '=',
            removeMethod: '@',
            elementId: '=',
            headerTitle: '@',
            filterData: '='
        },
        controller: function ($scope, $rootScope, $element, $attrs, $location,
                               $injector) {
            $scope.removeUser = function(user){
                var service = $injector.get('userService');
                service[$scope.removeMethod]($scope.elementId, user.usr_id);
                for(var j=$scope.selectedUsers.length-1; j>=0; j--){
                    if($scope.selectedUsers[j].usr_id === user.usr_id)
                        $scope.selectedUsers.splice(j, 1);
                }
            }
        },
        restrict:"E",
        replace: true,
        templateUrl: obj + 'tm_partial_user_display_selection.html'
    };
});