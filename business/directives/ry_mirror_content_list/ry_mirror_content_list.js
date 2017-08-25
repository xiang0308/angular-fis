/*
 * @Author: wangxiang
 * @Date:   2017-06-08 10:52:54
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-12 18:00:13
 */

angular.module('cmsDirective')
    .directive('ryMirrorContentList', ryMirrorContentList);

/**
 * [ryMirrorContentList List-指令]
 * @return {[type]} [description]
 */
function ryMirrorContentList() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            mallId: "@",
            searchAction: '=',
            selectedAction: '=',
            refreshAction: '='
        },
        template: __inline('./ry_mirror_content_list.html'),
        controller: ryMirrorContentListCtrl,
        controllerAs: 'vm',
        link: function() {}
    };

    /**
     * [ryMirrorContentListCtrl List-控制器]
     * @param  {[type]} $scope                   [description]
     * @param  {[type]} $state                   [description]
     * @param  {[type]} Constant                 [description]
     * @param  {[type]} loading                  [description]
     * @param  {[type]} ryModal                  [description]
     * @param  {[type]} EventService             [description]
     * @param  {[type]} MirrorContentCopyService [description]
     * @return {[type]}                          [description]
     */
    function ryMirrorContentListCtrl($scope, $state, Constant, loading, ryModal, EventService, MirrorContentCopyService) {
        let vm = this;
        let mall_id = $scope.mallId;
        let searchAction = $scope.searchAction; // 搜索
        let refresh = 'ryMirrorContentList.refresh'; // 刷新列表

        vm.editContent = editContent; // 编辑内容
        vm.copy = copy; // 复制
        vm.pageAction = 'ryMirrorContentList.page';

        vm.params = {
            mall_id: mall_id
        };

        vm.pageOptions = {
            currentPage: 1,
            page_size: 1,
            totalCount: 2
        };

        EventService
            .on(searchAction, onSearch, $scope)
            .on(refresh, onRefresh, $scope)
            .on(vm.pageAction, onPage, $scope);

        /**
         * [onPage 分页函数]
         * @param  {[type]} currentPage [description]
         * @return {[type]}             [description]
         */
        function onPage(currentPage) {
            getList(angular.extend(vm.params, vm.pageOptions, {
                currentPage: currentPage
            }));
        }

        /**
         * [onRefresh 刷新列表]
         * @return {[type]} [description]
         */
        function onRefresh() {
            getList(angular.extend(vm.params, vm.pageOptions));
        }

        /**
         * [onSearch 搜索]
         * @param  {[type]} field [description]
         * @return {[type]}       [description]
         */
        function onSearch(field) {
            if (field) {
                vm.params = angular.extend(vm.params, field);
            }
            vm.pageOptions.page = 1;
            getList(angular.extend(vm.params, vm.pageOptions));
        }

        /**
         * [getList 获取列表]
         * @param  {[type]} extendParams [description]
         * @return {[type]}              [description]
         */
        function getList(extendParams) {
            vm.params = angular.extend(vm.params, extendParams);

            vm.list = [{
                id: '1',
                shop_name: '上海一店',
                relate_template: '永琪上海区专用模版',
                update_by: '小三',
                update_date: '2017-06-06 10:21:21'
            }, {
                id: '2',
                shop_name: '北京一店',
                relate_template: '通用模版',
                update_by: '小四',
                update_date: '2017-06-06 10:21:21'
            }, {
                id: '3',
                shop_name: '广州一店',
                relate_template: '永琪上海区专用模版2',
                update_by: '小五',
                update_date: '2017-06-06 10:21:21'
            }, {
                id: '4',
                shop_name: '深圳二店',
                relate_template: '通用模版',
                update_by: '小六',
                update_date: '2017-06-06 10:21:21'
            }];

            // contentService
            //     .getMirrorContentList(vm.params)
            //     .then((res) => {
            //         loading.hide();
            //         var result = res.data.result;
            //         vm.list = result.data;
            //         $.extend(vm.pageOptions, {
            //             currentPage: result.cur_page,
            //             totalCount: result.total,
            //             totalPage: result.total_page
            //         });
            //     });
        }

        /**
         * [editContent 编辑内容]
         * @param  {[type]} content [description]
         * @return {[type]}         [description]
         */
        function editContent(content) {
            $state.go('cms.mirror.content.edit', {
                id: content.id
            });
        }

        /**
         * [copy 复制]
         * @param  {[type]} content [description]
         * @return {[type]}         [description]
         */
        function copy(content) {
            let modalInstance = MirrorContentCopyService.open({
                content: content
            }).result;
            modalInstance.then(res => {
                if (res.length > 0) {
                    ryModal.toast('复制成功！', 3000);
                    onSearch(vm.params);
                }
            });
        }

    }
}