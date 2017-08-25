/*
 * @Author: wangxiang
 * @Date:   2017-06-07 11:45:30
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-12 18:06:50
 */

angular
    .module('cms')
    .controller('MirrorContentTemplateCtrl', MirrorContentTemplateCtrl);

/**
 * [MirrorContentTemplateCtrl 编辑模板-控制器]
 * @param {[type]} $scope [description]
 */
function MirrorContentTemplateCtrl($scope, userinfoJson) {
    let vm = this;

    vm.mall_id = userinfoJson.result.data.userInfo.mallMid;
}