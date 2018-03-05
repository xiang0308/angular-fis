/*
* @Author: weijie
* @Date:   2017-06-30 14:52:59
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:29:00+08:00
*/

'use strict';

angular.module('cmsDirective')
    .directive('ryDatepicker', ryDatepicker);

/**
 * [ryDatepicker 日期控件]
 * @param  {[type]} $compile [description]
 * @return {[type]}          [description]
 */
function ryDatepicker($compile) {
    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            options: '='
        },
        template: __inline('./ry-datepicker.html'),
        transclude: true,
        replace: true,
        controller: ryDatepickerCtrl,
        controllerAs: 'vm'
    };

    function ryDatepickerCtrl($scope) {
    }
}
