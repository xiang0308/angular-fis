/**
 * @file 切换组件
 * @author zhaoran
 * @date 2015-06-08
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