/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:53:06
 */

angular
	.module('cmsDirective')
	.directive('ryPage', ryPage);

/**
 * [ryPage 分页 - 指令]
 * @return {[type]} [description]
 */
function ryPage() {
	return {
		restrict: 'E',
		replace: true,
		transclude: false,
		scope: {
			pageOptions: '=',
			action: '='
		},
		template: __inline('./ry-page.html'),
		controller: ryPageCtrl
	};

	/**
	 * [ryPageCtrl 分页 - 控制器]
	 * @param  {[type]} $scope       [description]
	 * @param  {[type]} EventService [description]
	 * @return {[type]}              [description]
	 */
	function ryPageCtrl($scope, EventService) {
		let action = $scope.action;

		$scope.pageChangeHandler = pageChangeHandler;

		/**
		 * [pageChangeHandler 给父发送事件]
		 * @return {[type]} [description]
		 */
		function pageChangeHandler() {
			if (action) {
				EventService.fire(action, $scope.pageOptions.page);
			}
		}
	}
}
