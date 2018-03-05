/*
* @Author: weijie
* @Date:   2017-07-11 13:26:33
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:31:53+08:00
*/

'use strict';

angular.module('cmsDirective')
    .directive('ryMinMax', ryMinMax);

/**
 * [ryMinMax 数值控制最大值和最小值]
 * @return {[type]} [description]
 */
function ryMinMax() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ctrl) {
            let ryMinMax,
                beforeVal;

            scope.$watch(attr.ryMinMax, function (newVal) {
                ryMinMax = newVal;
            });

            function roundTo(num, pos) {
                return +(Math.round(num + 'e+' + pos ) + 'e-' + pos);
            }
            elem.on('focus', function() {
                beforeVal = $(this).val();
            });
            elem.on('blur', function() {
                let val = $(this).val();

                if (!$.isNumeric(val)) {
                    if (beforeVal != null) {
                        val = beforeVal;
                    } else {
                        val = ryMinMax[0];
                    }
                } else {
                    val = roundTo(val, ryMinMax[2] || 0);
                }

                if (ryMinMax[0] !== null && val < ryMinMax[0]) {
                    beforeVal = ryMinMax[0];
                } else if (ryMinMax[1] !== null && val > ryMinMax[1]) {
                    beforeVal = ryMinMax[1];
                } else {
                    beforeVal = val;
                }

                ctrl.$setViewValue(beforeVal);
                ctrl.$render();
            });

        }
    };
}
