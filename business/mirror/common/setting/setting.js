/*
 * @Author: wangxiang
 * @Date:   2017-06-07 11:46:52
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-09 16:28:13
 */

angular
    .module('cms')
    .controller('MirrorCommonSettingCtrl', MirrorCommonSettingCtrl);

/**
 * [MirrorCommonSettingCtrl 通用设置-控制器]
 */
function MirrorCommonSettingCtrl($scope, userinfoJson) {
    let vm = this;

    vm.mall_id = userinfoJson.result.data.userInfo.mallMid;
}