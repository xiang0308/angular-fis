/*
* @Author: weijie
* @Date:   2017-06-22 17:49:14
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:32:23+08:00
*/

'use strict';

angular.module('cmsDirective').directive('ryObserveSrc', ryObserveSrc);

/**
 * [ryObserveSrc 监控src变化]
 * @return {[type]} [description]
 */
function ryObserveSrc() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            let isEmber = $(element).is('embed');
            attrs.$observe('ngSrc', function(newSrc) {
                attrs.$set('src', newSrc);
                if (isEmber) {
                    // $(element).load(function() {
                    //     debugger;
                    //     this.autostart = true;
                    //     this.load();
                    // })
                    // element[0].autostart = true;
                    // element[0].load();
                }
            });
        }
    }
}
