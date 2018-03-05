/*
 * @Author: weijie
 * @Date:   2017-08-22 12:24:11
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2018-01-25 15:53:50
 */
/* global laydate */
angular.module('cmsDirective')
    .directive('ryLayDate', ryLayDate);

/**
 * [ryLayDate layDate控件]
 * @return {[type]} [description]
 */
function ryLayDate() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry-lay-date.html'),
        replace: true,
        controller: ryLayDateCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryLayDateCtrl layDate控件-控制器]
     * @param  {[type]} $scope   [description]
     * @param  {[type]} $element [description]
     * @return {[type]}          [description]
     */
    function ryLayDateCtrl($scope, $element) {
        let vm = this,
            $el = $($element).find('input'),
            unWatch;

        unWatch = $scope.$watch('config', fnWatchConfig, true);

        $scope.$on('$destroy', fnDestroy);

        // laydate.render({
        //     elem: $el.find('input')[0], //指定元素
        //     type: 'time',
        //     format: 'HH:mm'
        // });
        //
        function ph(phVal) {
            $el.attr('placeholder', phVal);
        }

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
            let value = newVal.value;
            vm.config = newVal;

            $el.val(value);
            ph(newVal.placeholder);

            laydate.render($.extend(
                {},
                {
                    elem: $el[0]
                },
                newVal || {}
            ));
        }
    }
}
