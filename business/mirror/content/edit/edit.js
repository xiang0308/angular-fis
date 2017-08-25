/*
 * @Author: wangxiang
 * @Date:   2017-06-07 11:47:56
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-08 17:44:35
 */

angular
    .module('cms')
    .controller('MirrorContentEditCtrl', MirrorContentEditCtrl);

/**
 * [MirrorContentEditCtrl 编辑内容列表-控制器]
 */
function MirrorContentEditCtrl($scope, $state) {
    let vm = this;

    vm.navToList = navToList;

    /**
     * [navToList 返回内容管理列表]
     * @return {[type]} [description]
     */
    function navToList() {
        $state.go('cms.mirror.content.manage');
    }
}