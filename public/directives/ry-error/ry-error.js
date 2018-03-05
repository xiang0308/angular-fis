/*
* @Author: liaohui
* @Date:   2016-12-22 16:28:33
* @Last Modified by:   Wei Jie
* @Last Modified time: 2017-08-17 14:13:23
*/

angular.module('cmsDirective')
	.directive('ryError', ryError);

/**
 * [ryError 错误描述-指令]
 * @return {[type]} [description]
 */
function ryError() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: __inline('./ry-error.html')
	};
}
