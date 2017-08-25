/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:55:33
 */
angular.module('cmsDirective').directive('mytab', function(){
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            tabs: '=',
            baseKey: '='
        },
        template: __inline('./mytab.html'),
        link: function(scope, elem, attr){
        }
    };
});