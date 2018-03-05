/*
* @Author: weijie
* @Date:   2017-08-16 18:35:01
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:27:30+08:00
*/
angular.module('cmsDirective')
    .directive('ryCheckbox', ryCheckbox);

/**
 * [ryCheckbox 封装复选框]
 * @return {[type]} [description]
 */
function ryCheckbox() {
    return {
        restrict: 'EA',
        require: 'ngModel',
        scope: {
            ngModel: '=',
            readOnly: '=',
            click: '&',
            config: '='
        },
        template: __inline('./ry-checkbox.html'),
        controller: ryCheckboxCtrl,
        controllerAs: 'vm',
        transclude: true,
        replace: true
    };

    /**
     * [ryCheckboxCtrl 封装复选框-控制器]
     * @param  {[type]} $scope [description]
     * @return {[type]}        [description]
     */
    function ryCheckboxCtrl($scope) {
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
