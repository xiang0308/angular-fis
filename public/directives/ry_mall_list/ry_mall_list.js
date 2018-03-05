/*
 * @Author: liaohui
 * @Date:   2016-12-23 18:37:17
 * @Last modified by:   liaohui
 * @Last modified time: 2017-01-10 16:24:25
 */

'use strict';

angular
    .module('cmsDirective')
    .directive('ryMallList', ryMallList);

/**
 * [ryMallList 商场列表-指令]
 * @return {[type]} [description]
 */
function ryMallList() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            associateAction: '=',
            searchAction: '='
        },
        template: __inline('./ry_mall_list.html'),
        controller: ryMallListCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryMallListCtrl 商场列表-控制器]
     * @param  {[type]} $scope       [description]
     * @param  {[type]} EventService [description]
     * @param  {[type]} MallService  [description]
     * @return {[type]}              [description]
     */
    function ryMallListCtrl($scope, EventService, MallService) {
        let vm = this;
        let searchAction = $scope.searchAction;
        let associateAction = $scope.associateAction;

        vm.pageOptions = {
            currentPage: 1,
            page: 1,
            pageSize: 10,
            page_size: 10
        };
        vm.field = {};
        vm.mallList = [];
        vm.associate = associate;
        vm.pageAction = 'ryMallList.page';

        EventService
            .on(searchAction, onSearch, $scope)
            .on(vm.pageAction, onPage, $scope);

        /**
         * [onPage 分页函数]
         * @param  {[type]} currentPage [description]
         * @return {[type]}             [description]
         */
        function onPage(currentPage) {
            getMallList(angular.extend(vm.field, vm.pageOptions, {
                currentPage: currentPage
            }));
        }

        /**
         * [onSearch 搜索]
         * @param  {[type]} field [description]
         * @return {[type]}       [description]
         */
        function onSearch(field) {
            let zoneId,
                name,
                mall_id;

            if (field) {
                let newField = angular.copy(field);
                zoneId = newField.zoneId;
                name = newField.name;
                mall_id = newField.mall_id;

                if (zoneId.length && zoneId[0]) {
                    $.each(zoneId.reverse(), function(i, item) {
                        if (item) {
                            zoneId = item.id;
                            return false;
                        }
                        return true;
                    });
                    vm.field.zoneId = zoneId;
                } else {
                    delete vm.field.zoneId;
                }

                if (name) {
                    vm.field.name = name;
                } else {
                    delete vm.field.name;
                }

                if (mall_id) {
                    vm.field.mall_id = mall_id;
                } else {
                    delete vm.field.mall_id;
                }
            }

            vm.pageOptions.currentPage = 1;
            getMallList(angular.extend(vm.field, vm.pageOptions));
        }

        /**
         * [getMallList 获取商场信息]
         * @param  {[type]} params [description]
         * @return {[type]}        [description]
         */
        function getMallList(params) {
            MallService
                .getJavaMallList(params)
                .then(function(result) {
                    let page = result.page;

                    vm.mallList = result.data;
                    vm.pageOptions = page;
                });
        }

        /**
         * [associate 关联商场]
         * @param  {[type]} item [description]
         * @return {[type]}      [description]
         */
        function associate(item) {
            EventService.fire(associateAction, item);
        }
    }
}
