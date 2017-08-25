/*
 * @Author: wangxiang
 * @Date:   2017-06-08 10:52:54
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-09 11:43:29
 */

angular.module('cmsDirective')
    .directive('ryMirrorContentSearch', ryMirrorContentSearch);

/**
 * [ryMirrorContentSearch Search-指令]
 * @return {[type]} [description]
 */
function ryMirrorContentSearch() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            initAction: '=',
            searchAction: '='
        },
        template: __inline('./ry_mirror_content_search.html'),
        controller: ryMirrorContentSearchCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryMirrorContentSearchCtrl Search-控制器]
     * @param  {[type]} $scope          [description]
     * @param  {[type]} $timeout        [description]
     * @param  {[type]} EventService    [description]
     * @param  {[type]} activityService [description]
     * @return {[type]}                 [description]
     */
    function ryMirrorContentSearchCtrl($scope, $timeout, EventService) {
        let vm = this;

        let searchAction = $scope.searchAction;
        let initAction = $scope.initAction;

        vm.search = search;

        vm.templateData = [];
        // 过滤搜索
        vm.filter = {
            template: '',
            name: ''
        };

        EventService.on(initAction, search, $scope);

        initRelateTemplate();

        search();

        /**
         * [search 查询表单]
         * @return {[type]} [description]
         */
        function search() {
            EventService.fire(searchAction, vm.filter);
        }

        /**
         * [initRelateTemplate 初始化关联模板下拉框列表]
         * @return {[type]} [description]
         */
        function initRelateTemplate() {
            // mock data
            let templateData = [{
                template: '1',
                text: '永琪上海区专用模版'
            }, {
                template: '2',
                text: '永琪上海区专用模版2'
            }, {
                template: '3',
                text: '永琪上海区专用模版3'
            }];

            // TODO
            vm.templateData = templateData;
            // start位置
            vm.templateData.unshift({
                template: '',
                text: '全部'
            });
            // end位置
            vm.templateData.push({
                template: 'no',
                text: '无模版'
            });
        }
    }
}