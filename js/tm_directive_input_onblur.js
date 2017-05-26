app.directive('inputOnblur', function () {
    return {
        priority: 1,
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModelCtrl) {
            if (attr.type === 'radio' || attr.type === 'checkbox') return;
            var update = function () {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(elm.val());
                });
            };
            elm.off('input keydown change').on('blur', update).on('keydown', function (e) {
                if (e.keyCode === 13) {
                    update();
                }
            });
        }
    };
});