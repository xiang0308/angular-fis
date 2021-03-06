/*
* @Author: weijie
* @Date:   2016-12-26 10:30:15
* @Last Modified by:   52css
* @Last Modified time: 2017-01-10 15:29:25
*/

'use strict';

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
		template: __inline('./ry_page.html'),
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

		$scope.jumpToPage = jumpToPage;
		$scope.pageChangeHandler = pageChangeHandler;

		/**
		 * [jumpToPage 页面跳转]
		 * @return {[type]} [description]
		 */
		function jumpToPage() {
			let currentPage = $scope.jumpPage;
			$scope.pageOptions.currentPage = currentPage;

			if (action) {
				EventService.fire(action, currentPage);
			}
		}

		/**
		 * [pageChangeHandler 给父发送事件]
		 * @return {[type]} [description]
		 */
		function pageChangeHandler() {
			if (action) {
				EventService.fire(action, $scope.pageOptions.currentPage);
			}
		}
	}
}
