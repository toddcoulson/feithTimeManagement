$injector.get($scope.servicename);
$scope.editing = false;
$scope.oldval ="";
$scope.edit = function () {
    $scope.oldval = $scope.value;
    $scope.editing = true;
};
$scope.submit=function(){
    if($scope.record2 == undefined){
        service[$scope.action]($scope.record, $scope.value);
        console.log("no second record")
    }else{
        service[$scope.action]($scope.record, $scope.record2, $scope.value);
        console.log(" second record exists")
    }
    $scope.editing = false;
}
$scope.cancel = function(){
    $scope.value = $scope.oldval;
    $scope.editing = false;
}
},
    restrict:"E",
        replace: true,
            templateUrl: obj + 'tm_template_editable_input.html'
};
});