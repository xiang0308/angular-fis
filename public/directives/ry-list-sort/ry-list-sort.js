/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:53:36
 */
angular.module('cmsDirective')
    .directive('ryListSort', function() {
        return {
            restrict: 'E',
            replace: true,
            transclude: false,
            scope: {
                ngModelOptions: '=',
                changeAction: '='
            },
            template: __inline('./ry-list-sort.html'),
            controller: ryListSortCtrl,
            controllerAs: 'vm'
        };

        /**
         * [ryIndicationCtrl 列表排序控制器]
         * @param  {[type]} $scope [description]
         * @return {[type]}        [description]
         */
        function ryListSortCtrl($scope, EventService) {
            let vm = this;
            let ngModelOptions = $scope.ngModelOptions;
            let changeAction = $scope.changeAction;

            vm.list = ngModelOptions.list;
            vm.index = ngModelOptions.index;
            vm.isFirst = isFirst; //数组第一个位置
            vm.isLast = isLast; // 数组最后一个位置
            vm.sortUp = sortUp;
            vm.sortDown = sortDown;

            function isFirst() {
                return vm.index == 0;
            }

            function isLast() {
                return vm.index == vm.list.length - 1;
            }
            /**
             * [sortUp 向上排序]
             * @param  {...[type]} values [description]
             * @return {[type]}           [description]
             */
            function sortUp(...values) {
                // SettingService.sortUp(values[0], values[1]);
                EventService.fire(changeAction, values[1]);
            }

            /**
             * [sortDown 向下排序]
             * @param  {...[type]} values [description]
             * @return {[type]}           [description]
             */
            function sortDown(...values) {
                // SettingService.sortDown(values[0], values[1]);
                EventService.fire(changeAction, values[1]);
            }
        }

    });