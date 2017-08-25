/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:54:59
 */

angular.module('cmsDirective')
    .directive('ryColorPicker', ryColorPicker);

function ryColorPicker() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry-color-picker.html'),
        transclude: true,
        replace: true,
        controller: ryColorPickerCtrl,
        controllerAs: 'vm'
    };

    function ryColorPickerCtrl($scope, $element) {
        let $el = $($element),
            config = $scope.config;

        $el.val(config.val);

        $el.colorPicker({
            customBG: config.val,
            renderCallback: function($elm) {
                let hex = '#' + this.color.colors.HEX;
                $elm.val(hex);

                if (config.change) {
                    config.change(hex, config.index);
                }
            }
        });
    }
}


