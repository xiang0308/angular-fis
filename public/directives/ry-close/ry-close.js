/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:55:08
 */

angular.module('cmsDirective')
	.directive('ryClose', ryClose);

/**
 * [ryClose 关闭按钮-指令]
 * @return {[type]} [description]
 */
function ryClose() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			closeAction: '='
		},
		template: __inline('./ry-close.html'),
		controller: ryCloseCtrl,
		controllerAs: 'vm'
	};

	/**
	 * [ryCloseCtrl 关闭按钮-控制器]
	 * @param  {[type]} $scope       [description]
	 * @param  {[type]} EventService [description]
	 * @return {[type]}              [description]
	 */
	function ryCloseCtrl($scope, EventService) {
		let vm = this;

		vm.click = click;

		function click() {
			EventService.fire($scope.closeAction || 'ryClose.closeModal');
		}
	}
}
