/*
* @Author: wangxiang
* @Date:   2017-06-09 11:35:26
* @Last Modified by:   wangxiang
* @Last Modified time: 2017-06-09 14:42:44
*/

angular.module('cmsDirective')
    .directive('ryMirrorAnalysisOverview', ryMirrorAnalysisOverview);

function ryMirrorAnalysisOverview() {
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: __inline('./ry_mirror_analysis_overview.html'),
        controller: ryMirrorAnalysisOverviewCtrl,
        controllerAs: 'vm'
    };

    function ryMirrorAnalysisOverviewCtrl($scope) {
        let vm = this;

        // 总览 mock data
        vm.overflow = [{
            duration: 5421,
            typeName: '亮屏时长'
        },{
            duration: 2131,
            typeName: '活跃时长'
        },{
            duration: 2324,
            typeName: '页面浏览次数'
        },{
            duration: 1423,
            typeName: '视频播放时长'
        },{
            duration: 456,
            typeName: '游戏启动时长'
        }];
    }

}