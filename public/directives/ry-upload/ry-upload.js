/*
* @Author: weijie
* @Date:   2017-08-17 09:08:49
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T14:11:28+08:00
*/
angular.module('cmsDirective')
    .directive('ryUpload', ryUpload);

/**
 * [ryUpload 上传]
 * @return {[type]} [description]
 */
function ryUpload() {
    return {
        restrict: 'EA',
        scope: {
            config: '=',
            index: '=',
            readOnly: '='
        },
        template: __inline('./ry-upload.html'),
        transclude: true,
        replace: true,
        controller: function($scope, $element) {
            let vm = this,
                isAttr = $element.attr('ry-upload');

            vm.removePic = removePic;
            vm.onUpload = onUpload;
            vm.onProgress = onProgress;
            vm.progress = {
                show: false,
                val: 0
            };

            $scope
                .$watch(isAttr ? 'ryUpload' : 'config', fnWatch, true);

            /**
             * [fnWatch 监控config]
             * @param  {[type]} newVal [description]
             * @return {[type]}        [description]
             */
            function fnWatch(newVal) {
                vm.config = newVal;
            }

            /**
             * [removePic 删除图片]
             * @return {[type]} [description]
             */
            function removePic() {
                vm.config.changeFileSrc('', vm.config.index);
            }

            /**
             * [onUpload 当上传成功]
             * @param  {[type]} $file [description]
             * @return {[type]}       [description]
             */
            function onUpload($file) {
                vm.config.changeFileSrc($file.src, vm.config.index);
            }

            /**
             * [onProgress 进度条]
             * @param  {[type]} progress [description]
             * @return {[type]}          [description]
             */
            function onProgress(progress) {
                vm.progress = progress;
            }
        },
        controllerAs: 'vm'
    };
}
