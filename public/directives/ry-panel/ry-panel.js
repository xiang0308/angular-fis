/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:53:01
 */

angular.module('cmsDirective')
    .directive('ryPanel', ryPanel);

/**
 * [ryPanel 面板-指令]
 * @return {[type]} [description]
 */
function ryPanel() {
    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            ngModelOptions: '=',
            changeAction: '='
        },
        template: __inline('./ry-panel.html'),
        controller: ryPanelCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryPanelCtrl 面板-控制器]
     * @param  {[type]} $scope       [description]
     * @param  {[type]} EventService [description]
     * @param  {[type]} ryModal      [description]
     * @return {[type]}              [description]
     */
    function ryPanelCtrl($scope, EventService, ryModal) {
        let vm = this;
        let ngModelOptions = $scope.ngModelOptions;
        let changeAction = $scope.changeAction;

        vm.title = ngModelOptions.title;
        vm.showToolbar = ngModelOptions.showToolbar;
        vm.list = ngModelOptions.list;
        vm.index = ngModelOptions.index;
        vm.show = true;
        vm.showOrHidePanel = showOrHidePanel;
        vm.close = close;
        vm.isOne = isOne;
        vm.changeAction = 'ryPanelCtrl.change';

        EventService
            .on(vm.changeAction, onChange, $scope);


        /**
         * [isOne 是否只有一项]
         * @return {Boolean} [description]
         */
        function isOne() {
            return vm.list.length === 1;
        }

        /**
         * [onChange 改变]
         * @param  {[type]} newList [description]
         * @return {[type]}         [description]
         */
        function onChange(newList) {
            EventService.fire(changeAction, newList);
        }

        /**
         * [close 关闭]
         * @return {[type]} [description]
         */
        function close() {
            let modalInstance = ryModal.open({
                title: '删除活动',
                template: '<div>确定要删除该项吗？</div>',
                windowClass: 'window-menu-delete',
                btns: [{
                    text: '取消',
                    role: 'cancel',
                    emphsis: false,
                    action: 'dismiss'
                }, {
                    text: '确认',
                    role: 'confirm',
                    emphsis: true,
                    action: 'close'
                }],
                controller: function(scope, ryModalInstance, $timeout) {
                    scope.isDelete = false;
                    scope.$on('ryModal.cancel', function(e) {
                        e.preventDefault();
                        $timeout(function() {
                            scope.isDelete = false;
                            scope.$close(scope.isDelete);
                        }, 300);
                    });
                    scope.$on('ryModal.confirm', function(e) {
                        e.preventDefault();
                        $timeout(function() {
                            scope.isDelete = true;
                            scope.$close(scope.isDelete);
                        }, 300);
                    })
                }
            }).result;
            modalInstance.then(function(isDelete) {
                if (isDelete) {
                    vm.list.splice(vm.index, 1);
                    onChange(vm.list);
                    ryModal.toast('删除成功', 3000);
                }
            });
        }


        /**
         * [showOrHidePanel 展开或关闭]
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        function showOrHidePanel(val) {
            vm.show = !val;
        }
    }
}