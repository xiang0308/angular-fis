/*
 * @file 用户信息服务
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:46:43
 */
angular.module('cmsService').factory('userinfoService', function($http, $q, Constant, $cookies){
    return {
        get: function(){
            var url = Constant.getUserUrl[Constant.systemType];
            var deferred = $q.defer();

            // then 和 success 参数不
            // then 的参数是 response
            // success 的参数是 response.data
            $http.post(url, {
                ryst: $cookies.get('RYST'),
                bsst: $cookies.get('BSST') || '123123123123123',
                channel: '002'
            })
            .success(function(json){
                deferred.resolve(json);
            });

            return deferred.promise;
        }
    };
})
.factory('loginService', function($http, $q){

    return {
        post: function(params){
            var url = '/public/login';
            var deferred = $q.defer();

            $http.post(url, {
                data: params
            })
            .success(function(json){
                deferred.resolve(json);
            });

            return deferred.promise;
        }
    };
})
.factory('logoutService', function($http, $q){

    return {
        post: function(){
            var url = '/public/logout';
            var deferred = $q.defer();
            $http.post(url)
            .success(function(json){
                deferred.resolve(json);
            })

            return deferred.promise;
        }
    };
});