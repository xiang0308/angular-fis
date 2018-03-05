/*
* @Author: 52css
* @Date:   2016-12-26 13:57:23
* @Last Modified by:   Wei Jie
* @Last Modified time: 2017-08-17 14:12:19
*/

'use strict';

angular.module('cmsDirective')
	.directive('ryDash', ryDash);

/**
 * [ryDash 虚线框]
 * @return {[type]} [description]
 */
function ryDash() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
		},
		template: __inline('./ry-dash.html')
	};
}
