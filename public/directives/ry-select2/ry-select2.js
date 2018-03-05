/*
 * @Author: wangxiang
 * @Date:   2018-01-25 16:39:46
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2018-02-01 12:05:40
 */
angular.module('cmsDirective')
    .directive('rySelect2', rySelect2);

/**
 * [rySelect2 封装下拉选指令]
 * @return {[type]} [description]
 */
function rySelect2() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry-select2.html'),
        replace: true,
        controller: rySelect2Ctrl,
        controllerAs: 'vm'
    };

    /**
     * [rySelect2Ctrl 封装下拉选控制器]
     * @param  {[type]} $scope   [description]
     * @param  {[type]} $element [description]
     * @param  {[type]} $timeout [description]
     * @return {[type]}          [description]
     */
    function rySelect2Ctrl($scope, $element, $timeout) {
        let vm = this,
            $select = $($element).find('select'),
            unWatch;

        unWatch = $scope.$watch('config', fnWatchConfig, true);

        $scope.$on('$destroy', fnDestroy);

        /**
         * [format 格式化]
         * @param  {[type]} item [数据项]
         * @return {[type]}      [description]
         */
        function format(item) {
            return vm.config.key !== 'text' ? item[vm.config.key] : item.text;
        }

        /**
         * [fnWatchConfig 监控config]
         * @param  {[type]} newVal [变化的新值]
         * @return {[type]}        [description]
         */
        function fnWatchConfig(newVal) {
            vm.config = newVal;

            $timeout(() => {
                let text = vm.config.key !== 'text' ? vm.config.key : 'text';

                vm.selectedValue = vm.config.value || '';

                $select.select2({
                    placeholder: vm.config.placeholder,
                    data: {
                        results: vm.config.data,
                        text: text
                    },
                    formatSelection: format,
                    formatResult: format,
                    allowClear: vm.config.allowClear || false
                });

                let isEdit = vm.config.isEdit && vm.config.data;
                if (isEdit || vm.config.readOnly || vm.config.isChangeTab) {
                    let selectList = vm.config.data;
                    if (Array.isArray(selectList)) {
                        let filterData = selectList.filter(item => item.id !== '' && item.id == newVal.value);
                        let renderValue = '';
                        let $rendered = $('.select2-selection__rendered');

                        if (filterData.length > 0) {
                            renderValue = filterData[0][text];
                        } else {
                            renderValue = vm.config.placeholder;
                        }
                        if (vm.config.readOnly) {
                            $rendered.addClass('disabled');
                        } else {
                            $rendered.removeClass('disabled');
                        }
                        $rendered.html(renderValue);
                    }
                }
            }, 0);
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