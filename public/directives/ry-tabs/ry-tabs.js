/*
* @Author: weijie
* @Date:   2017-06-30 12:03:57
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:35:22+08:00
*/

'use strict';
angular.module('cmsDirective')
    .directive('ryTabs', ryTabs);

/**
 * [ryTabs 选项卡]
 * @return {[type]} [description]
 */
function ryTabs() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry-tabs.html'),
        transclude: true,
        replace: true,
        controller: ryTabsCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryTabsCtrl 选项卡-控制器]
     * @param  {[type]} $scope [description]
     * @return {[type]}        [description]
     */
    function ryTabsCtrl($scope) {
        let vm = this,
            unWatch;

        vm.change = change;
        $scope.$on('$destroy', fnDestroy);
        unWatch = $scope.$watch('config', fnWatchConfig, true);

        /**
         * [fnWatchConfig 监控config]
         * @param  {[type]} newVal [description]
         * @return {[type]}        [description]
         */
        function fnWatchConfig(newVal) {
            vm.config = newVal;

            if (vm.selectedIndex !== newVal.selectedIndex) {
                change(newVal.selectedIndex);
            }
        }

        /**
         * [change 改变]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        function change(index) {
            vm.selectedIndex = index;
            vm.config.selectedIndex = index;

            if (vm.config.change) {
                vm.config.change(index, vm.config.data[index]);
            }
        }

        /**
         * [fnDestroy 页面销毁]
         * @return {[type]} [description]
         */
        function fnDestroy() {
            unWatch();
        }
    }
}
