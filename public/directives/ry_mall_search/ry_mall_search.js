/*
 * @Author: liaohui
 * @Date:   2016-12-22 16:28:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-03-08 11:50:56
 */

angular.module('cmsDirective')
	.directive('ryMallSearch', ryMallSearch);

/**
 * [ryMallSearch 商场搜索-指令]
 * @return {[type]} [description]
 */
function ryMallSearch() {
	return {
		restrict: 'E',
		replace: true,
		scope: {
			fieldAction: '=',
			searchAction: '='
		},
		controller: ryMallSearchCtrl,
		controllerAs: 'vm',
		template: __inline('./ry_mall_search.html')
	};

	/**
	 * [ryMallSearchCtrl 商场搜索-控制器]
	 * @param  {[type]} $scope       [description]
	 * @param  {[type]} $timeout     [description]
	 * @param  {[type]} MallService  [description]
	 * @param  {[type]} EventService [description]
	 * @return {[type]}              [description]
	 */
	function ryMallSearchCtrl($scope, $timeout, MallService, EventService) {
		let vm = this,
			fieldAction = $scope.fieldAction,
			searchAction = $scope.searchAction;

		vm.submit = submit;
		vm.reset = reset;
		vm.field = getDefaultField();
		vm.sendField = {};
		vm.areaId = [];
		vm.changeAction = 'ryMallSearch.change';
		vm.resetAction = 'ryMallSearch.reset';

		EventService
			.on(fieldAction, onField, $scope)
			.on(vm.changeAction, (res) => {
				vm.areaId = res.zoneId;
			}, $scope);

		// 没有自己查询
		if (!fieldAction) {
			submit();
		}

		/**
		 * [getDefaultField 获取默认字段]
		 * @return {[type]} [description]
		 */
		function getDefaultField() {
			return {
				name: '',
                mall_id: ''
			};
		}

		/**
		 * [onField 当收到外来field事件]
		 * @param  {[type]} field [description]
		 * @return {[type]}       [description]
		 */
		function onField(field) {
			vm.sendField = field;

			vm.field = angular.extend({}, vm.field, vm.sendField || {});

			submit();
		}

		/**
		 * [submit 查询表单]
		 * @return {[type]} [description]
		 */
		function submit() {
			let field = vm.field;

			field = angular.extend(field, {
				zoneId: vm.areaId
			});

			field.mall_name = field.name;

			EventService
				.fire(searchAction, field);
		}

		/**
		 * [submit 重置表单]
		 * @return {[type]} [description]
		 */
		function reset() {
			vm.field = angular.extend({}, getDefaultField(), vm.sendField);
			EventService.fire(vm.resetAction);
		}
	}
}
