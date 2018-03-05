/*
 * @Author: liaohui
 * @Date:   2016-12-22 16:28:33
 * @Last modified by:
 * @Last modified time: 2017-01-12 15:58:59
 */

angular.module('cmsDirective')
    .directive('ryTradingAreaSearch', ryTradingAreaSearch);

/**
 * [ryTradingAreaSearch 商场搜索-指令]
 * @return {[type]} [description]
 */
function ryTradingAreaSearch() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            changeAction: '=',
            resetAction: '=',
            showDistrict: '='
        },
        controller: ryTradingAreaSearchCtrl,
        controllerAs: 'vm',
        template: __inline('./ry_trading_area_search.html'),
        link: function() {}
    };

    /**
     * [ryTradingAreaSearchCtrl 商场搜索-控制器]
     * @param  {[type]} $scope       [description]
     * @param  {[type]} $timeout     [description]
     * @param  {[type]} MallService  [description]
     * @param  {[type]} EventService [description]
     * @return {[type]}              [description]
     */
    function ryTradingAreaSearchCtrl($scope, $timeout, MallService, EventService) {
        let vm = this;
        let changeAction = $scope.changeAction;
        let resetAction = $scope.resetAction;

        vm.showDistrict = isShowDistrict;
        vm.areaParams = {
            areaId: []
        };
        vm.arealists = [];
        vm.getAreaLists = getAreaLists;
        vm.submit = submit;
        EventService.on(resetAction, () => {
            vm.areaParams = {
                areaId: []
            };
            vm.arealists = [vm.arealists[0]];
            submit();
        });

        submit();
        getProvince();

        /**
         * [isShowDistrict 是否显示商圈]
         * @return {Boolean} [description]
         */
        function isShowDistrict() {
            if ($scope.showDistrict && $scope.showDistrict === 'hide') {
                return false;
            }
            return true;
        }

        /**
         * [submit 查询表单]
         * @return {[type]} [description]
         */
        function submit() {
            let areaId = [];

            angular.forEach(vm.areaParams.areaId, (item, index) => {
                if (item) {
                    areaId.push(findItem(index, item))
                }
            });

            EventService
                .fire(changeAction, {
                    zoneId: areaId
                });
        }

        /**
         * [findItem description]
         * @param  {[type]} index [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        function findItem(index, value) {
            return vm.arealists[index].find(item => item.id === value);
        }

        /**
         * [getProvince 获得省]
         * @return {[type]} [description]
         */
        function getProvince() {
            MallService.getArea({
                    type: 1,
                    parentId: ''
                })
                .then(function(json) {
                    vm.arealists[0] = json;
                    return;
                });
        }

        /**
         * [getAreaLists 获得省市区商圈]
         * @param  {[type]} pid    [description]
         * @param  {[type]} type   [description]
         * @param  {[type]} $index [description]
         * @return {[type]}        [description]
         */
        function getAreaLists(pid, type, $index) {
            submit();
            var area_params = {
                "parentId": pid,
                "type": type
            }
            vm.arealists[$index + 1] = {};
            if (pid != null) {
                MallService.getArea(area_params)
                    .then(function(json) {
                        vm.arealists[$index + 1] = json;
                    })
            }
        }
    }
}