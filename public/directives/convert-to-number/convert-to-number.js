/**
 * @Author: weijie
 * @Date:   2017-09-04T09:37:51+08:00
 * @Email:  weijie@rongyi.com
 * @Filename: convert-to-number.js
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-04T09:39:37+08:00
 */

angular.module('cmsDirective').directive('convertToNumber', convertToNumber);

/**
  * [convertToNumber ng-model装换类型]
  * @return {[type]} [description]
  */
function convertToNumber() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(val) {
                return $.isNumeric(val)
                    ? parseInt(val, 10)
                    : ''
            });
            ngModel.$formatters.push(function(val) {
                return $.isNumeric(val)
                    ? '' + val
                    : null;
            });
        }
    };

}
