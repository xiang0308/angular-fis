/*
* @Author: weijie
* @Date:   2017-08-16 18:35:01
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:33:25+08:00
*/
angular.module('cmsDirective')
    .directive('ryRadio', ryRadio);

/**
 * [ryRadio 封装单选框]
 * @return {[type]} [description]
 */
function ryRadio() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            ngValue: '=',
            readOnly: '=',
            click: '&'
        },
        template: __inline('./ry-radio.html'),
        transclude: true,
        replace: true
    };
}
