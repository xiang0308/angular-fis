/*
* @Author: weijie
* @Date:   2017-08-17 09:39:33
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T12:37:19+08:00
*/
angular.module('cmsDirective')
    .directive('ryUploadBtn', ryUploadBtn);

/**
 * [ryUploadBtn 上传按钮]
 * @return {[type]} [description]
 */
function ryUploadBtn() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry-upload-btn.html'),
        transclude: true,
        // replace: true,
        controller: ryUploadBtnCtrl,
        controllerAs: 'vm'
    };

    /**
     * [ryUploadBtnCtrl 上传按钮-控制器]
     * @param  {[type]} $scope        [description]
     * @param  {[type]} $element      [description]
     * @param  {[type]} UploadService [description]
     * @return {[type]}               [description]
     */
    function ryUploadBtnCtrl(
        $scope,
        $element,
        UploadService
    ) {
        let vm = this,
            isAttr = $element.attr('ry-upload-btn'),
            config = $scope.config;

        vm.config = config || {};
        vm.upload = upload;

        $scope
            .$watch(isAttr ? 'ryUploadBtn' : 'config', fnWatch, true);

        /**
         * [fnWatch 监控config]
         * @param  {[type]} newVal [description]
         * @return {[type]}        [description]
         */
        function fnWatch(newVal) {
            vm.config = newVal;
        }

        /**
         * [upload 上传]
         * @param  {[type]} $file         [description]
         * @param  {[type]} $invalidFiles [description]
         * @return {[type]}               [description]
         */
        function upload($file, $invalidFiles) {
            if ($invalidFiles && $invalidFiles.length && !UploadService.checkFileValidity($invalidFiles[0])) {
                return;
            }

            if (!($file && $file[0])) {
                return ;
            }

            UploadService.upload($file[0]).then(res => {
                // fnChange(res.data.result.url);
                $file[0].src = res.data.result.data[0];
            }, error => {
                if (vm.config.onError && error && error.data && error.data.mate) {
                    vm.config.onError(error.data.meta.msg);
                }
            }, evt => {
                let val = parseInt(90.0 * evt.loaded / evt.total);

                // if (val === 100) {
                //     val = 99;
                // }

                if (vm.config.onProgress) {
                    vm.config.onProgress({
                        show: true,
                        val
                    }, vm.config.index);
                }
            }).finally(() => {
                if (vm.config.onUpload) {
                    vm.config.onUpload($file[0], vm.config.index);
                }

                if (vm.config.onProgress) {
                    vm.config.onProgress({
                        show: false
                    }, vm.config.index);
                }
            });
        }
    }
}
