/*
 * @Author: wangxiang
 * @Date:   2017-06-08 10:52:54
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-12 17:59:43
 */

angular.module('cmsDirective')
    .directive('ryMirrorContentEdit', ryMirrorContentEdit);

/**
 * [ryMirrorContentEdit Edit-指令]
 * @return {[type]} [description]
 */
function ryMirrorContentEdit() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            mallId: "@"
        },
        template: __inline('./ry_mirror_content_edit.html'),
        controller: ryMirrorContentEditCtrl,
        controllerAs: 'vm',
        link: function() {}
    };

    /**
     * [ryMirrorContentEditCtrl Edit-控制器]
     * @param  {[type]} $scope       [description]
     * @param  {[type]} $state       [description]
     * @param  {[type]} Constant     [description]
     * @param  {[type]} loading      [description]
     * @param  {[type]} ryModal      [description]
     * @param  {[type]} EventService [description]
     * @return {[type]}              [description]
     */
    function ryMirrorContentEditCtrl($scope, $state, Constant, loading, ryModal, EventService) {
        let vm = this;
        let mall_id = $scope.mallId;

        vm.editContentTemplate = editContentTemplate; // 编辑内容

        vm.params = {
            mall_id: mall_id
        };

        vm.pageOptions = {
            currentPage: 1,
            page_size: 1,
            totalCount: 2
        };

        EventService
            .on(vm.pageAction, onPage, $scope);

        initList();

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
         * [initList 初始化列表]
         * @return {[type]} [description]
         */
        function initList() {
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

            // 编辑内容: “单图展示”、“分类多图展示”、“产品展示”
            vm.list = [{
                id: '1',
                menu_type: '0',
                parent_menu: '影音娱乐',
                children_menu: [],
                update_by: '小三',
                update_date: '2017-06-06 10:21:21'
            }, {
                id: '2',
                menu_type: '0',
                parent_menu: '游戏互动',
                children_menu: [],
                update_by: '小四',
                update_date: '2017-06-06 10:21:21'
            }, {
                id: '3',
                menu_type: '1',
                parent_menu: '价目表',
                children_menu: [],
                update_by: '小五',
                update_date: '2017-06-06 10:21:21'
            }, {
                id: '4',
                menu_type: '0',
                parent_menu: '发型展示',
                children_menu: [{
                    type: '男士',
                    menu_type: '1',
                    update_by: '小明',
                    update_date: '2017-06-06 10:21:21'
                }, {
                    type: '女士',
                    menu_type: '1',
                    update_by: '小红',
                    update_date: '2017-06-06 10:21:21'
                }],
                update_by: '小六',
                update_date: '2017-06-06 10:21:21'
            }, {
                id: '5',
                menu_type: '0',
                parent_menu: '产品介绍',
                children_menu: [{
                    type: '产品1',
                    menu_type: '1',
                    update_by: 'test1',
                    update_date: '2017-06-06 10:21:21'
                }, {
                    type: '产品2',
                    menu_type: '1',
                    update_by: 'test2',
                    update_date: '2017-06-06 10:21:21'
                }],
                update_by: '小七',
                update_date: '2017-06-06 10:21:21'
            }];

            // TODO
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
         * [editContent 编辑内容模板]
         * @param  {[type]} editContentTemplate [description]
         * @return {[type]}         [description]
         */
        function editContentTemplate(content) {
            $state.go('cms.mirror.content.template');
        }

    }
}