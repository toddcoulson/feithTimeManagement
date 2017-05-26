app.directive('percentageComplete', function () {
    return {
        scope: {
            pValue: '='
        },
        controller: function ($scope, $element, $attrs, $location) {
            $scope.$watch('pValue', function (newVal) {
                $scope.pValue= newVal;
                if(isNaN($scope.pValue))$scope.pValue = -1;
                $scope.pValue == -1 ? $scope.nan = true : $scope.nan = false;
                $scope.dynamicCSS={
                    'width': $scope.getPercent(),
                    'background-color': $scope.getColor()
                }
            });
            $scope.getColor = function(){
                if($scope.pValue < .75){
                    return "#2D882D";
                }else if ($scope.pValue >= .75 && $scope.pValue <= .90){
                    return "#E8A712";
                }else{
                    return "#FF2B1C";
                }
            }
            $scope.getPercent = function(){
                var p = $scope.pValue*100;
                if(p > 100) p = 100;
                return p +'%'
            }
        },
        /*link: function(scope, element, attrs) {
console.log(scope.pValue)
},*/
        restrict:"E",
        replace: true,
        templateUrl: obj + 'tm_template_percentage_complete.html'
    };
});