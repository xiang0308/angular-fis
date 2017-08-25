/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 16:01:25
 */
angular.module('cms').controller('MirrorCtrl', function($rootScope) {
    $rootScope.sidebarMenu = [{
            'title': '内容管理',
            'fullKey': 'content.manage'
        },{
            'title': '数据分析',
            'fullKey': 'analysis.overview'
        },{
            'title': '通用设置',
            'fullKey': 'common.setting'
        }]
    $rootScope.baseKey = 'cms.mirror';
});