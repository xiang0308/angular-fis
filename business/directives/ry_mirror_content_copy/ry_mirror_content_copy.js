/*
 * @Author: wangxiang
 * @Date:   2017-06-08 10:52:54
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-12 17:59:58
 */

angular.module('cmsDirective')
    .directive('ryMirrorContentCopy', ryMirrorContentCopy);

function ryMirrorContentCopy() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            selectedAction: '='
        },
        template: __inline('./ry_mirror_content_copy.html'),
        controller: ryMirrorContentCopyCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryMirrorContentCopyCtrl 复制内容列表-控制器]
     * @param  {[type]} $scope       [description]
     * @param  {[type]} $rootScope   [description]
     * @param  {[type]} ryModal      [description]
     * @param  {[type]} loading      [description]
     * @param  {[type]} EventService [description]
     * @return {[type]}              [description]
     */
    function ryMirrorContentCopyCtrl($scope, $rootScope, ryModal, loading, EventService) {
        let vm = this;
        let selectedAction = $scope.selectedAction;

        vm.params = {};

        vm.selectAll = selectAll; // 全选
        vm.selectOne = selectOne; // 单选
        vm.checked = []; // 存放所有被选中元素

        vm.pageOptions = {
            currentPage: 1,
            page_size: 1,
            totalCount: 2
        };

        vm.pageAction = 'ryMirrorContentCopyCtrl.page';
        EventService
            .on(vm.pageAction, onPage, $scope);

        initList();

        /**
         * [onPage 分页函数]
         * @param  {[type]} currentPage [description]
         * @return {[type]}             [description]
         */
        function onPage(currentPage) {
            getShopList(angular.extend(vm.params, vm.pageOptions, {
                currentPage: currentPage
            }));
        }

        /**
         * [onSearch description]
         * @param  {[type]} field [description]
         * @return {[type]}       [description]
         */
        function initList() {
            vm.pageOptions.currentPage = 1;
            getShopList(angular.extend(vm.params, vm.pageOptions));
        }

        /**
         * [getList 获取店铺列表]
         * @param  {[type]} params [description]
         * @return {[type]}        [description]
         */
        function getShopList(params) {
            // mock data
            vm.list = [{
                mall_id: '1',
                shop_id: '58f9c1e7e072332abd8ef47e',
                shop_name: '门店001',
                shop_address: '[上海上海市]徐汇区漕溪北路88号'
            }, {
                mall_id: '2',
                shop_id: '592281dde072331c70f705ee',
                shop_name: '门店002',
                shop_address: '[上海上海市]徐汇区大师傅夫人'
            }, {
                mall_id: '3',
                shop_id: '88f9c1e7e072332abd8ef48e',
                shop_name: '门店003',
                shop_address: '[上海上海市]徐汇区漕溪北路100号'
            }, {
                mall_id: '4',
                shop_id: '88f9c1e7e072332abd8ef48e',
                shop_name: '门店003',
                shop_address: '[上海上海市]徐汇区漕溪北路20号'
            }, {
               mall_id: '5',
                shop_id: '88f9c1e7e072332abd8ef48e',
                shop_name: '门店003',
                shop_address: '[上海上海市]徐汇区漕溪北路88号'
            }, {
                mall_id: '6',
                shop_id: '88f9c1e7e072332abd8ef48e',
                shop_name: '门店003',
                shop_address: '[上海上海市]徐汇区漕溪北路36号'
            }];

            // loading.show();
            // MirrorTemplateService.getShopList(params).then(res => {
            //     let result = res.data.result;

            //     vm.list = result.data;
            //     vm.list.forEach(x => {
            //         x.num_config.sort((a, b) => a.position - b.position);
            //     });
            //     $.extend(vm.pageOptions, {
            //         page: result.page,
            //         pageSize: result.page_size,
            //         totalCount: result.total,
            //         totalPage: result.total_page
            //     });
            // }).finally(() => {
            //     loading.hide();
            // });
        }

        /**
         * [selectAll 全选]
         * @return {[type]} [description]
         */
        function selectAll() {
            if (vm.select_all) {
                vm.checked = [];
                angular.forEach(vm.list, function(item) {
                    item.checked = true;
                    vm.checked.push(item.mall_id);
                });
            } else {
                angular.forEach(vm.list, function(item) {
                    item.checked = false;
                    vm.checked = [];
                });
            }

            EventService.fire(selectedAction, vm.checked);
        }
        /**
         * [selectOne 单选]
         * @return {[type]} [description]
         */
        function selectOne() {
            angular.forEach(vm.list, function(item) {
                let index = vm.checked.indexOf(item.mall_id);
                if (item.checked && index === -1) {
                    vm.checked.push(item.mall_id);
                } else if (!item.checked && index !== -1) {
                    vm.checked.splice(index, 1);
                }
            });

            if (vm.list.length === vm.checked.length) {
                vm.select_all = true;
                vm.select_all_indeterminate = false;
            } else {
                vm.select_all = false;
                vm.select_all_indeterminate = true;
            }

            if (vm.checked.length === 0) {
                vm.select_all = false;
                vm.select_all_indeterminate = false;
            }

            EventService.fire(selectedAction, vm.checked);
        }
    }
}