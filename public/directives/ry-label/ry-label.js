/*
* @Author: weijie
* @Date:   2017-08-29 15:09:57
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:30:40+08:00
*/
angular.module('cmsDirective')
    .directive('ryLabel', ryLabel);

/**
 * [ryLabel 封装bootstrap-label]
 * @return {[type]} [description]
 */
function ryLabel() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry-label.html'),
        transclude: true,
        replace: true,
        controller: ryLabelCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryLabelCtrl 封装bootstrap-label 控制器]
     * @param  {[type]} $scope [description]
     * @return {[type]}        [description]
     */
    function ryLabelCtrl($scope) {
        let vm = this,
            unWatchConfig;

        unWatchConfig = $scope.$watch('config', fnWatchConfig, true);
        $scope.$on('$destroy', fnDestroy);

        /**
         * [fnDestroy 页面销毁]
         * @return {[type]} [description]
         */
        function fnDestroy() {
            unWatchConfig();
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
