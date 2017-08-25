/*
 * @Author: wangxiang
 * @Date:   2017-06-08 10:52:54
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-09 14:44:40
 */

angular.module('cmsDirective')
    .directive('ryMirrorAnalysisList', ryMirrorAnalysisList);

/**
 * [ryMirrorAnalysisList List-指令]
 * @return {[type]} [description]
 */
function ryMirrorAnalysisList() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: __inline('./ry_mirror_analysis_list.html'),
        controller: ryMirrorAnalysisListCtrl,
        controllerAs: 'vm',
        link: function() {}
    };

    /**
     * [ryMirrorAnalysisListCtrl List-控制器]
     * @param  {[type]} $scope       [description]
     * @param  {[type]} $modal       [description]
     * @param  {[type]} $state       [description]
     * @param  {[type]} Constant     [description]
     * @param  {[type]} Dialog       [description]
     * @param  {[type]} loading      [description]
     * @param  {[type]} EventService [description]
     * @return {[type]}              [description]
     */
    function ryMirrorAnalysisListCtrl($scope, EventService) {
        let vm = this;

        vm.pageAction = 'ryMirrorAnalysisList.page';
        vm.params = {};
        vm.pageOptions = {
            currentPage: 1,
            page_size: 1,
            totalCount: 2
        };

        EventService
            .on(vm.pageAction, onPage, $scope);

        init();

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
         * [init 初始化列表]
         * @return {[type]} [description]
         */
        function init() {
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

            // mock data
            vm.list = [{
                template: '通用模版',
                page: '价目表',
                view_num: 5,
                view_duration: 10
            }, {
                template: '通用模版',
                page: '发型展示',
                view_num: 8,
                view_duration: 12
            }, {
                template: '通用模版',
                page: '影音娱乐',
                view_num: 20,
                view_duration: 50
            }, {
                template: '通用模版',
                page: '游戏互动',
                view_num: 15,
                view_duration: 60
            }, {
                template: '通用模版',
                page: '产品介绍',
                view_num: 3,
                view_duration: 9
            }, {
                template: '上海区专用模版',
                page: '明星推荐',
                view_num: 50,
                view_duration: 100
            }, {
                template: '上海区专用模版',
                page: '发型师推荐',
                view_num: 18,
                view_duration: 26
            }];

            // AnalysisService
            //     .getMirrorAnalysisList(vm.params)
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
    }
}