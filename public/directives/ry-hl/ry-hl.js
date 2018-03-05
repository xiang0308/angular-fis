/*
* @Author: weijie
* @Date:   2017-06-22 16:26:32
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:29:25+08:00
*/

'use strict';

angular.module('cmsDirective')
    .directive('ryHl', ryHl);

/**
 * [ryHl 高亮form-group]
 * @return {[type]} [description]
 */
function ryHl() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry-hl.html'),
        transclude: true,
        replace: true,
        controller: ryHlCtrl,
        controllerAs: 'vm'
    };

    function ryHlCtrl($scope) {
        let vm = this,
            unWatchConfig;

        $scope.mouseover = mouseover;
        unWatchConfig = $scope.$watch('config', fnWatchConfig, true);
        $scope.$on('$destroy', fnDestroy);

        function fnDestroy() {
            unWatchConfig();
        }

        function fnWatchConfig(newVal) {
            vm.config = newVal;
            $scope.isHl = newVal.isHl;
        }

        function mouseover() {
            if ($scope.isHl) {
                vm.config.mouseover();
            }
        }
    }
}
