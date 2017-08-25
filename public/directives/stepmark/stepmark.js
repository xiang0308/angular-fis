/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:52:07
 */
angular.module('cmsDirective').directive('stepmark', function($rootScope, $state) {
    return {
        restrict: 'E',
        replace: true,
        transclude: false,
        scope: {
            marks: '='
        },
        template: __inline('./stepmark.html'),
        link: function(scope, elem, attr) {
            let marks = scope.marks instanceof Array ? scope.marks : [scope.marks];
            scope.isActive = function(mark) {
                let keys = mark.keys instanceof Array ? mark.keys : [mark.keys];
                return $.inArray($state.current.name, keys) > -1;
            };
        }
    };
});