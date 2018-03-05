/*
* @Author: weijie
* @Date:   2017-06-27 18:02:15
 * @Last modified by:   weijie
 * @Last modified time: 2017-09-08T14:50:38+08:00
*/

'use strict';

angular.module('cmsDirective')
    .directive('ryUploadPreview', ryUploadPreview);

/**
 * [ryUploadPreview 上传预览]
 * @return {[type]} [description]
 */
function ryUploadPreview() {
    return {
        restrict: 'EA',
        scope: {
            config: '=',
            ryUploadPreview: '='
        },
        template: __inline('./ry-upload-preview.html'),
        transclude: true,
        replace: true,
        controller: ryUploadPreviewCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryUploadPreviewCtrl 上传预览-控制器]
     * @param  {[type]} $scope   [description]
     * @param  {[type]} $element [description]
     * @return {[type]}          [description]
     */
    function ryUploadPreviewCtrl($scope, $element) {
        let vm = this,
            $el = $($element),
            $parent = $el.parent(),
            $win = $(window),
            $body = $('body'),
            isAttr = $element.attr('ry-upload-preview'),
            unWatchConfig,
            isAniamed = false;

        unWatchConfig = $scope.$watch(isAttr ? 'ryUploadPreview' : 'config', fnWatchConfig, true);
        $scope.$on('$destroy', fnDestroy);
        vm.click = click;
        vm.close = close;
        vm.native = {};

        function close() {
            vm.showSmall = true;
        }

        function getImgNaturalDimensions(src, callback) {
            var image = new Image();
            image.src = src;
            image.onload = function() {
                callback(image.width, image.height)
            }
        }

        function click(index, list) {
            if (vm.config.index === null || vm.config.index === undefined) {
                return;
            }
            let $elSmall = $el.find('.ui-item'),
                $elSmallClone = $elSmall.clone(),
                fromOffset = $elSmall.offset(),
                fromCss = {
                    position: 'absolute',
                    top: fromOffset.top,
                    left: fromOffset.left,
                    width: $elSmallClone.width(),
                    height: $elSmallClone.height(),
                    zIndex: 9999
                },
                $winWidth = $win.width(),
                $winHeight = $win.height(),
                maxWidth = vm.native.width, // Math.min($win.width(), vm.native.width),
                maxHeight = vm.native.height, // Math.min($win.height(), vm.native.height),
                toCss;

            if (isAniamed) {
                return;
            }

            isAniamed = true;

            if (maxWidth > $winWidth || maxHeight > $winHeight) {
                if (maxWidth / maxHeight > $winWidth / $winHeight) {
                    maxHeight = $winWidth * (maxHeight / maxWidth);
                    maxWidth = $winWidth;
                } else {
                    maxWidth = $winHeight * (maxWidth / maxHeight);
                    maxHeight = $winHeight;
                }
            }

            toCss = {
                top: $body.scrollTop() + ($winHeight - maxHeight) / 2,
                left: $body.scrollLeft() + ($winWidth - maxWidth) / 2,
                width: maxWidth,
                height: maxHeight
            };

            $elSmallClone
                .css(fromCss)
                .appendTo($('body'))
                .animate(toCss, function() {
                    isAniamed = false;
                    let $bg = $('<div class="ry-upload-preview-album-bg"></div>'),
                        $toolbar = $('<div class="ry-upload-preview-album-toolbar"></div>'),
                        $close = $('<a class="fa fa-times">').css({
                            fontSize: '30px',
                            backgroundColor: '#fff',
                            margin: '1px',
                            width: '50px',
                            height: '50px',
                            textAlign: 'center',
                            lineHeight: '50px'
                        }),
                        $prev = $('<a class="fa fa-angle-left">').css({
                            fontSize: '30px',
                            backgroundColor: '#fff',
                            margin: '1px',
                            width: '50px',
                            height: '50px',
                            textAlign: 'center',
                            lineHeight: '50px'
                        }),
                        $next = $('<a class="fa fa-angle-right">').css({
                            fontSize: '30px',
                            backgroundColor: '#fff',
                            margin: '1px',
                            width: '50px',
                            height: '50px',
                            textAlign: 'center',
                            lineHeight: '50px'
                        });

                    $elSmallClone
                        .css({
                            top: '50%',
                            left: '50%',
                            width: 'auto',
                            height: 'auto',
                            position: 'fixed',
                            transform: 'translateX(-50%) translateY(-50%)',
                            maxWidth: '100%',
                            maxHeight: '100%'
                        });

                    $prev.click(function() {
                        index -= 1;

                        if (index < 0) {
                            index = list.length - 1;
                        }

                        $elSmallClone.attr('src', list[index]);
                        return false;
                    });

                    $next.click(function() {
                        index += 1;

                        if (index > list.length - 1) {
                            index = 0;
                        }

                        $elSmallClone.attr('src', list[index]);

                        return false;
                    });

                    $close.click(fnClose);
                    $bg.click(fnClose);

                    $toolbar
                        .append($close)
                        .append($prev)
                        .append($next);
                    $('body')
                        .append($bg)
                        .append($toolbar);

                    function fnClose() {
                        let offset = $elSmallClone.offset(),
                            width = $elSmallClone.width(),
                            height = $elSmallClone.height(),
                            fromCss = {
                                position: 'absolute',
                                top: offset.top,
                                left: offset.left,
                                width: width,
                                height: height,
                                transform: 'translateX(0) translateY(0)'
                            },
                            $toImg = $parent.find('.ry-upload-preview').eq(index).find('img'),
                            toOffset = $toImg.offset(),
                            toCss = {
                                top: toOffset.top,
                                left: toOffset.left,
                                width: $toImg.width(),
                                height: $toImg.height()
                            };

                        $elSmallClone
                            .css(fromCss)
                            .animate(toCss, function() {
                                $elSmallClone.remove();
                                $bg.remove();
                                $toolbar.remove();
                            });
                    }
                });
        }
        /**
         * [fnWatchConfig 监控config]
         * @param  {[type]} newVal [description]
         * @return {[type]}        [description]
         */
        function fnWatchConfig(newVal) {
            vm.config = newVal;

            getImgNaturalDimensions(vm.config.src, function(width, height) {
                vm.native = {
                    width,
                    height
                }
            });
        }

        /**
         * [fnDestroy 页面销毁]
         * @return {[type]} [description]
         */
        function fnDestroy() {
            unWatchConfig();
        }
    }
}
