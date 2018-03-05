/*
* @Author: weijie
* @Date:   2017-08-15 18:52:25
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:28:22+08:00
*/
angular.module('cmsDirective')
    .directive('ryClose', ryClose);

/**
 * [ryClose 弹窗关闭组件]
 * @return {[type]} [description]
 */
function ryClose() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry-close.html'),
        replace: true,
        controller: ryCloseCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryCloseCtrl 弹窗关闭组件-控制器]
     * @param  {[type]} $scope [description]
     * @return {[type]}        [description]
     */
    function ryCloseCtrl($scope) {
        let vm = this,
            unWatch;

        unWatch = $scope.$watch('config', fnWatchConfig, true);

        $scope.$on('$destroy', fnDestroy);

        /**
         * [fnDestroy 页面销毁]
         * @return {[type]} [description]
         */
        function fnDestroy() {
            unWatch();
        }

        /**
         * [fnWatchConfig 监控config]
         * @param  {[type]} newVal [description]
         * @return {[type]}        [description]
         */
        function fnWatchConfig(newVal) {
            vm.config = newVal;
        }
    }
}
