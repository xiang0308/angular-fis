/**
 * @file stepmark js
 * @author wangzhenfeng
 * @date 2015-06-09
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

            // console.log($state);

            // $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            //       console.log(arguments)


            //  });

            var marks = scope.marks instanceof Array ? scope.marks : [scope.marks];

            scope.isActive = function(mark) {
                var keys = mark.keys instanceof Array ? mark.keys : [mark.keys];
                return $.inArray($state.current.name, keys) > -1;
            };

        }

    };
});
