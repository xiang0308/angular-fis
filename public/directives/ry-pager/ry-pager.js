/*
* @Author: weijie
* @Date:   2017-08-21 14:33:41
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:33:04+08:00
*/
angular
    .module('cmsDirective')
    .directive('ryPager', ryPager);

/**
 * [ryPager 分页 - 指令]
 * @return {[type]} [description]
 */
function ryPager() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            config: '='
        },
        template: __inline('./ry-pager.html'),
        controller: ryPagerCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryPagerCtrl 分页控制器]
     * @param  {[type]} $scope [description]
     * @return {[type]}        [description]
     */
    function ryPagerCtrl($scope) {
        let vm = this,
            unWatch;

        unWatch = $scope.$watch('config', fnWatchConfig, true);

        $scope.$on('$destroy', fnDestroy);


        /**
         * [fnWatchConfig 监控config]
         * @param  {[type]} newVal [description]
         * @return {[type]}        [description]
         */
        function fnWatchConfig(newVal) {
            vm.config = newVal;

            vm.jumpPage = '';
            vm.currentPage = newVal.data.page;
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
