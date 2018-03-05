/*
 * @Author: weijie
 * @Date:   2016-12-26 10:46:49
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2018-02-01 14:27:48
 */
angular
    .module('cmsDirective')
    .directive('ryStar', ryStar);

/**
 * [ryStar 红色星星]
 * @return {[type]} [description]
 */
function ryStar() {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            color: '@'
        },
        template: __inline('./ry-star.html'),
        controller: function($scope) {},
        link: function(scope, elem, attr) {}
    };
}