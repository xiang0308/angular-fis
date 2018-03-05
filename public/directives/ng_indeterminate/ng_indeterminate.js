/*
* @Author: 52css
* @Date:   2017-01-05 16:41:24
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:26:20+08:00
*/

'use strict';

angular
	.module('cmsDirective')
	.directive('ngIndeterminate', ngIndeterminate);

/**
 * [ngIndeterminate 半选]
 * @param  {[type]} $compile [description]
 * @return {[type]}          [description]
 */
function ngIndeterminate($compile) {
	return {
		restrict: 'A',
		link: function(scope, element, attributes) {
			scope.$watch(attributes['ngIndeterminate'], function (value) {
				element.prop('indeterminate', !!value);
			});
		}
	};
}
