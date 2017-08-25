/*
 * @Author: wangxiang
 * @Date:   2017-06-12 17:27:22
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-12 18:37:38
 */

angular.module('cmsDirective')
    .directive('ryMirrorContentPriceList', ryMirrorContentPriceList);

/**
 * [ryMirrorContentPriceList 编辑内容-价目表-指令]
 * @return {[type]} [description]
 */
function ryMirrorContentPriceList() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            mallId: '@'
        },
        template: __inline('./ry_mirror_content_price_list.html'),
        controllerAs: 'vm',
        controller: ryMirrorContentPriceListCtrl
    };

    /**
     * [ryMirrorContentPriceListCtrl 编辑内容-价目表-控制器]
     * @return {[type]} [description]
     */
    function ryMirrorContentPriceListCtrl($scope, $state, ryModal, EventService) {
        let vm = this;

        vm.menuTitle = menuTitle; //菜单标题
        vm.add = add; // 新增
        vm.save = save; // 保存
        vm.navToList = navToList; // 返回

        vm.changeAction = 'ryMirrorContentPriceListCtrl.changeAction';
        vm.uploadedHomeImg = 'ryMirrorContentPriceListCtrl.uploadedHomeImg';

        EventService.on(vm.uploadedHomeImg, onChangeHomeImg, $scope);

        // 上传主图配置选项
        vm.homeBgOptions = {
            type: 'image', // 上传文件类型
            pattern: '.jpg,.png',
            ratio: '16:9',
            cropOutputRatio: '16:9',
            maxSize: '10MB',
            multiple: false,
            allowCrop: true
        };

        vm.list = [{
            home_bg_img: '',
            selected: 0,
            link: ''
        }];

        /**
         * [menuTitle 菜单标题]
         * @param  {[type]} index [description]
         * @return {[type]}       [description]
         */
        function menuTitle(index) {
            let idx = parseInt(index),
                reIdx = idx + 1,
                rtnTitle;
            if (idx <= 8) {
                rtnTitle = '菜单0' + reIdx;
            } else if (idx > 8) {
                rtnTitle = '菜单' + reIdx;
            }
            return rtnTitle;
        }

        /**
         * [add 新增]
         */
        function add() {
            if (vm.list.length >= 10) {
                ryModal.toast('新增的位置数量已经达到上限~', 3000);
                return;
            }
            vm.list.push({
                home_bg_img: '',
                selected: 0,
                link: ''
            });
        }

        /**
         * [save 保存]
         * @return {[type]} [description]
         */
        function save() {

        }

        /**
         * [navToList 返回]
         * @return {[type]} [description]
         */
        function navToList() {
            $state.go('cms.mirror.content.edit');
        }

        /**
         * [onChangeHomeImg 首页背景图上传回调]
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        function onChangeHomeImg(url) {
            vm.list[url.key] = url.val;
        }
    }
}