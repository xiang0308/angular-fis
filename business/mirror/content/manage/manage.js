/*
* @Author: wangxiang
* @Date:   2017-06-07 11:45:30
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-06-07 18:51:29
*/

angular
    .module('cms')
    .controller('MirrorContentManageCtrl', MirrorContentManageCtrl);

/**
 * [MirrorContentManageCtrl 内容管理列表-控制器]
 * @param {[type]} $scope [description]
 */
function MirrorContentManageCtrl($scope) {
    let vm = this;

    vm.searchAction = 'MirrorContentManageCtrl.search';
}