/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 16:01:22
 */

require('business/mirror');

// 引入内容管理模块
require('business/mirror/content/manage');
require('business/mirror/content/edit');
require('business/mirror/content/template');
require('business/mirror/analysis/overview');
require('business/mirror/common/setting');

angular.module('cms').config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        '**'
    ]);

    $urlRouterProvider
        .when('/cms', '/cms/mirror')
        .when('/cms/mirror', '/cms/mirror/content/manage');

    $stateProvider
        .state('cms.mirror', {
            abstract: true,
            url: '/mirror',
            template: '<div ui-view pos="cms.mirror"></div>',
            controller: 'MirrorCtrl',
            custom: {
                crumb: '镜面屏'
            }
        });

    // 内容管理
    $stateProvider
        .state('cms.mirror.content', {
            url: '/content',
            template: ' <div ui-view pos="cms.mirror.content"></div>'
        })
        // 内容管理
        .state('cms.mirror.content.manage', {
            url: '/manage',
            templateUrl: __uri('/business/mirror/content/manage/manage.html'),
            controller: 'MirrorContentManageCtrl',
            controllerAs: 'vm',
            custom: {
                crumb: '内容管理'
            }
        })
        // 编辑内容
        .state('cms.mirror.content.edit', {
            url: '/edit/:id',
            templateUrl: __uri('/business/mirror/content/edit/edit.html'),
            controller: 'MirrorContentEditCtrl',
            controllerAs: 'vm',
            custom: {
                crumb: '编辑内容'
            }
        })
        // 编辑模板
        .state('cms.mirror.content.template', {
            url: '/template/:id',
            templateUrl: __uri('/business/mirror/content/template/template.html'),
            controller: 'MirrorContentTemplateCtrl',
            controllerAs: 'vm',
            custom: {
                crumb: '编辑模板'
            }
        })

    // 数据分析
    $stateProvider
        .state('cms.mirror.analysis', {
            url: '/analysis',
            template: ' <div ui-view pos="cms.mirror.analysis"></div>'
        })
        // 数据分析
        .state('cms.mirror.analysis.overview', {
            url: '/overview',
            templateUrl: __uri('/business/mirror/analysis/overview/overview.html'),
            controller: 'MirrorAnalysisOverviewCtrl',
            controllerAs: 'vm',
            custom: {
                crumb: '数据分析'
            }
        })

    // 通用设置
    $stateProvider
        .state('cms.mirror.common', {
            url: '/common',
            template: ' <div ui-view pos="cms.mirror.common"></div>'
        })
        // 通用设置
        .state('cms.mirror.common.setting', {
            url: '/common',
            templateUrl: __uri('/business/mirror/common/setting/setting.html'),
            controller: 'MirrorCommonSettingCtrl',
            controllerAs: 'vm',
            custom: {
                crumb: '通用设置'
            }
        })

});