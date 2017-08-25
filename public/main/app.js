/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:25:37
 */

// 声明angular依赖
angular.module('cmsDirective', [
    'ui.router'
]);

angular.module('cmsService', []);

angular.module('plugin', ['infinite-scroll', 'cmsService']);

angular.module('cms', [
    'cmsDirective',
    'cmsService',
    'ui.bootstrap',
    'ui.router',
    'ngTouch',
    'ngCookies',
    'ngSanitize',
    'ngAnimate',
    'ngFileUpload',
    'froala',
    'plugin',
    'ryUI'
]);

// 引用类库
require('lib/laydate');

// 引用服务模块
require('services/services');

// 引用指令模块
require('directives/directives');

// 引用业务模块
require('business/main');

angular.module('cms').config(function($provide) {

    $provide.decorator('$q', function($delegate) {
        var defer = $delegate.defer;
        $delegate.defer = function() {
            var deferred = defer();

            deferred.promise.success = function(fn) {

                deferred.promise.then(function(response) {
                    fn(response);
                });
                return deferred.promise;
            };

            deferred.promise.error = function(fn) {
                deferred.promise.then(null, function(response) {
                    fn(response);
                });
                return deferred.promise;
            };

            return deferred;
        };
        return $delegate;
    });
});


angular.module('cms').config(function($httpProvider) {
    $httpProvider.interceptors.push('cmsInterceptor');
});

// 主控制器
angular.module('cms').controller('MainCtrl', function() {

    })
    .value('froalaConfig', {
        inlineMode: false,
        theme: 'gray',
        height: 500,
        mediaManager: false,
        pasteImage: false,
        allowedImageTypes: ['gif', 'jpg', 'png', 'jpeg'],
        imageUploadParam: 'pic',
        imageUploadURL: '/easy-mcmc-commodity-management/fileUpload/image',
        imageUploadParams: {
            from: 'richEditor'
        },
        language: 'zh_cn',
        events: {
            'froalaEditor.image.error': function(e, editor, error) {
                console.log(error);
            }
        },
        buttons: ['bold', 'italic', 'underline', 'strikeThrough',
            /*'subscript',
                       'superscript',*/
            'fontFamily', 'fontSize', 'color', 'formatBlock',
            /*'blockStyle', 'inlineStyle',*/
            'align', 'insertOrderedList', 'insertUnorderedList',
            'outdent', 'indent', /*'selectAll',*/ 'createLink', 'insertImage',
            /*'insertVideo',*/
            'table',
            /*'save',*/
            'insertHorizontalRule', /*'uploadFile',*/ 'removeFormat', 'undo', 'redo', 'html'
        ]
    })
    .controller('CmsCtrl', function($rootScope, $window, $scope, Constant, userinfoJson, logoutService, userinfoService) {
        var result = userinfoJson.result || {};
        result = result.data || {};

        $rootScope.userinfo = {};
        Constant.userinfo = {};

        if (result.userInfo) {
            $rootScope.userinfo = result.userInfo;
            Constant.userinfo = result.userInfo;
        }

        Constant.auth = [];

        if (result.authorities) {
            Constant.auth = result.authorities;
        }

        if (window.top === window) {
            $rootScope.showHeader = true;
        } else {
            $rootScope.showHeader = false;
        }

        $rootScope.hasAuth = function(authText) {
            return Constant.auth.indexOf(authText) > -1;
        };


        $rootScope.back = function() {
            $window.history.back();
        };

        $rootScope.getArray = function(length) {
            return new Array(length);
        };

        $rootScope.logout = function() {
            logoutService.post()
                .success(function() {
                    $rootScope.userinfo = null;
                    Constant.userinfo = null;

                    userinfoService.get()
                        .success(function(json) {
                            $rootScope.userinfo = json.result;
                            Constant.userinfo = json.result;
                        });
                });
        }
    });

angular.module('cms').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
        .otherwise('/cms');
    $stateProvider
        .state('cms', {
            abstract: true,
            url: '/cms',
            template: '<div ui-view pos="cms"></div>',
            controller: 'CmsCtrl',
            resolve: {
                userinfoJson: function(userinfoService){
                    return userinfoService.get();
                }
            }
        });
});
