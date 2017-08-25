/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:52:27
 */

angular
    .module('cmsDirective')
    .directive('ryTabs', ryTabs);

/**
 * [ryTabs tabs-指令]
 * @return {[type]} [description]
 */
function ryTabs() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            tabs: '=',
            initAction: '=',
            selectedAction: '='
        },
        template: __inline('./ry-tabs.html'),
        controller: ryTabsCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryTabsCtrl tabs-控制器]
     * @param  {[type]} $scope       [description]
     * @param  {[type]} EventService [description]
     * @return {[type]}              [description]
     */
    function ryTabsCtrl($scope, EventService) {
        let vm = this,
            tabs = $scope.tabs,
            selectedIndex = tabs.selectedIndex,
            selectedAction = $scope.selectedAction,
            initAction = $scope.initAction;

        vm.changeSelectedIndex = changeSelectedIndex;
        vm.list = tabs.list;
        vm.selectedIndex = selectedIndex;

        EventService
            .on(initAction, function() {
                changeSelectedIndex(vm.selectedIndex)
            });

        changeSelectedIndex(selectedIndex);


        /**
         * [changeSelectedIndex 修改索引]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        function changeSelectedIndex(index) {
            vm.selectedIndex = index;
            EventService.fire(selectedAction, vm.list[index]);
        }
    }
}
