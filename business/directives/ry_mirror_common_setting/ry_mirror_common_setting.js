/*
 * @Author: wangxiang
 * @Date:   2017-06-09 11:35:26
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-12 11:15:09
 */

angular.module('cmsDirective')
    .directive('ryMirrorCommonSetting', ryMirrorCommonSetting);

function ryMirrorCommonSetting() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            mallId: '@'
        },
        template: __inline('./ry_mirror_common_setting.html'),
        controller: ryMirrorCommonSettingCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryMirrorCommonSettingCtrl description]
     * @param  {[type]} $scope [description]
     * @return {[type]}        [description]
     */
    function ryMirrorCommonSettingCtrl($scope, ryModal, EventService) {
        let vm = this;

        vm.mall_id = $scope.mallId;
        vm.uploadedSelfImg = 'ryMirrorCommonSettingCtrl.uploadedSelfImg';
        vm.save = save; // 保存
        vm.unSelected = unSelected; // 未选中检测

        // 字段
        vm.field = {
            await: 5,
            putout: 5,
            selected: 0,
            default_pic: '',
            self_pic: ''
        };

        // 待机图片单选
        vm.awaitImages = [{
            id: 0,
            name: '默认图片'
        }, {
            id: 1,
            name: '自有图片'
        }];

        // 上传图片配置选项
        vm.options = {
            type: 'image', // 上传文件类型
            pattern: '.jpg,.png',
            multiple: false,
            allowCrop: true,
            maxSize: '10MB'
        };

        EventService
            .on(vm.uploadedSelfImg, onChangeSelfImg, $scope);

        /**
         * [onChangeSelfImg 自有图片上传回调]
         * @param  {[type]} url [description]
         * @return {[type]}     [description]
         */
        function onChangeSelfImg(url) {
            vm.field[url.key] = url.val;
        }

        /**
         * [unSelected 未选中检测]
         * @return {[type]} [description]
         */
        function unSelected() {
            ryModal.toast('请先选中自有图片哦~', 3000);
        }

        /**
         * [save 保存]
         * @return {[type]} [description]
         */
        function save() {
            let reg = /^([1-9]|[1-5][0-9]|60)$/;
            if (!reg.test(vm.field.await)) {
                ryModal.toast('自动待机时间请输入1~60之间的正整数哦~', 3000);
                return;
            }
            if (!reg.test(vm.field.putout)) {
                ryModal.toast('自动熄屏时间请输入1~60之间的正整数哦~', 3000);
                return;
            }

            // TODO
            console.log(vm.field);
            ryModal.toast('保存成功', 3000);
        }
    }

}