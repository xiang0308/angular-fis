/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:52:52
 */

angular
    .module('cmsDirective')
    .directive('ryStar', ryStar);

function ryStar() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
        },
        template: __inline('./ry-star.html'),
        controller: function($scope) {
        },
        link: function(scope, elem, attr){
        }
    };
}