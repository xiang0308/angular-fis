/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:53:44
 */

angular.module('cmsDirective')
	.directive('ryListCurd', function() {
		return {
			restrict: 'E',
			replace: true,
			transclude: false,
			scope: {
				ngModelOptions: '=',
				changeAction: '='
			},
			template: __inline('./ry-list-curd.html'),
			controller: ryListCurdCtrl,
			controllerAs: 'vm'
		};

		/**
		 * [ryListCurdCtrl 列表增减元素控制器]
		 * @param  {[type]} $scope       [description]
		 * @param  {[type]} Dialog       [description]
		 * @param  {[type]} EventService [description]
		 * @return {[type]}              [description]
		 */
		function ryListCurdCtrl($scope, Dialog, EventService) {
			let vm = this;
			let ngModelOptions = $scope.ngModelOptions;
			let changeAction = $scope.changeAction;

			vm.list = ngModelOptions.list;
			vm.index = ngModelOptions.index;
			vm.initObj = ngModelOptions.initObj || {};
			vm.deleteList = deleteList;
			vm.addList = addList;
			vm.isOne = isOne;
			vm.canAdditem = canAdditem;

			function isOne() {
				return vm.list.length === 1;
			}

			function canAdditem() {
				return ngModelOptions.limit && vm.list.length == ngModelOptions.limit;
			}

			function addList(index, arr) {
				arr.splice(index + 1, 0, angular.copy(vm.initObj));
				EventService.fire(changeAction, arr);
			}
			/**
			 * [deleteList 删除活动]
			 * @param  {...[type]} values [description]
			 * @return {[type]}           [description]
			 */
			function deleteList(...values) {
				if (values[1].length <= 1) {
					return;
				}
				Dialog.confirm('删除活动', '确定要删除该活动吗？', [{
					text: '确认',
					isImportant: false,
					isAsync: false,
					clickFn: function() {
						values[1].splice(values[0], 1);
						EventService.fire(changeAction, values[1]);
					}
				}, {
					text: '取消',
					isImportant: true,
					isAsync: false
				}]);
			}
		}
	});
