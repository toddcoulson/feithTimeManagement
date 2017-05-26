app.directive('chosen', function () {
    var linker = function(scope, element, attr){
        var list = attr['chosen'];
        scope.$watch(list, function () {
            element.trigger('chosen:updated');
        });
        scope.$watch(attr['ngModel'], function() {
            element.trigger('chosen:updated');
        });
        element.chosen();
    };
    return {
        restrict:'A',
        link:linker
    };
});