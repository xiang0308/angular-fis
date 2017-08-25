/*
 * @file 全局http拦截器
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:28:21
 */

angular.module('cmsService').factory('cmsInterceptor', function($rootScope, $q, $injector, $timeout, Constant, loading) {
    var isLoginShown = false;
    var blockedRequestArrFor401 = [];
    return {
        request: function(config) {
            var url = config.url;
            if (Constant.systemType && url.indexOf('/api/') === 0) {
                url = '/' + Constant.systemType + url;
            }
            config.url = url;
            return config;
        },
        response: function(response) {
            var deferred = $q.defer();
            loading.hide();
            if (response.status == 200) {
                var json = response.data;
                if (json.meta) {
                    var errno = json.meta.status || json.meta.errno;
                    var msg = json.meta.msg;

                    response.data.errno = errno;
                    response.data.msg = msg;

                    if (response.data.result) {
                    }

                    if (errno === 0) {
                        deferred.resolve(response);

                    } else if (/^\d{4}401$/.test(errno)) {
                        var ryModal = $injector.get('ryModal');
                        ryModal.open({
                            title: '提示',
                            template: '<div>登录已过期～5秒钟后自动跳转到登录页面</div>',
                            btns: [{
                                text: '立即登录',
                                role: 'confirm',
                                emphsis: false,
                                action: 'close'
                            }]
                        }).result.then(function() {
                            window.top.location = Constant.systemLoginHref[Constant.systemType];
                        })

                        $timeout(function() {
                            window.top.location = Constant.systemLoginHref[Constant.systemType];
                        }, 5000);
                    } else if (errno === 401) {
                        blockedRequestArrFor401.push({
                            response: response,
                            deferred: deferred
                        });

                        if (!isLoginShown) {

                            isLoginShown = true;

                            var Login = $injector.get('Login');
                            var $http = $injector.get('$http');

                            Login.popup().then(function(json) {
                                isLoginShown = false;
                                for (var i = 0; i < blockedRequestArrFor401.length; i++) {

                                    (function(index) {
                                        var blockedRequestFor401 = blockedRequestArrFor401[index];
                                        var response = blockedRequestFor401.response;
                                        var deferred = blockedRequestFor401.deferred;

                                        $http(response.config).then(function(retryResponse) {

                                            deferred.resolve(retryResponse);
                                        }, function(retryResponse) {
                                            deferred.reject(retryResponse);
                                        });
                                    })(i);
                                }
                            }, function() {
                                deferred.reject(response);
                            });
                        }

                    } else if (errno === 1536010) {
                        deferred.reject(response);
                    } else if (errno === 1531007) {
                        if (msg && !$rootScope.showCustomDialog) {
                            var ryModal = $injector.get('ryModal');
                            ryModal.toast(msg, 5000);
                        }
                        deferred.reject(response);
                    } else {
                        if (msg && !$rootScope.showCustomDialog) {
                            var ryModal = $injector.get('ryModal');
                            ryModal.toast(msg, 5000);
                        }
                    }

                } else {
                    deferred.resolve(response);
                }
            } else {
                //deferred.reject(response);
            }

            return deferred.promise;
        }
    };
});