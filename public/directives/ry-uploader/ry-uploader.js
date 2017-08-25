/*
 * @Author: wangxiang
 * @Date:   2017-06-09 11:35:26
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-09 18:50:31
 */

angular.module('cmsDirective')
    .directive('ryUploader', ryUploader);

/**
 * [ryUploader description]
 * @return {[type]} [description]
 */
function ryUploader() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            options: "=",
            source: "=",
            fileKey: "@",
            mallId: "@",
            uploadingEvent: "=",
            completeEvent: "="
        },
        template: __inline('./ry-uploader.html'),
        controllerAs: 'vm',
        controller: ryUploaderCtrl
    };

    /**
     * [ryCustomUploadCtrl description]
     * @param  {[type]} $scope        [description]
     * @param  {[type]} UploadService [description]
     * @param  {[type]} ryModal        [description]
     * @param  {[type]} EventService  [description]
     * @return {[type]}               [description]
     */
    function ryUploaderCtrl($scope, UploadService, ryModal, EventService) {
        let vm = this;
        let options = $scope.options;
        let mallId = $scope.mallId;
        vm.upload = upload;
        vm.deleteFile = deleteFile;
        vm.completeEvent = $scope.completeEvent || 'ryUploader.uploaded';
        $scope.$watch('source', newVal => {
            vm.fileUrl = newVal;
        });

        /**
         * [upload description]
         * @param  {[type]} $file [description]
         * @return {[type]}       [description]
         */
        function upload() {
            UploadService.upload(options, mallId).then(res => {
                vm.fileUrl = res[0].url;
            }).finally(() => {
                sendData();
            });
        }

        /**
         * [deleteFile description]
         * @return {[type]} [description]
         */
        function deleteFile() {
            vm.fileUrl = '';
            sendData();
        }

        /**
         * [sendData description]
         * @return {[type]} [description]
         */
        function sendData() {
            let params = {
                key: $scope.fileKey,
                val: vm.fileUrl
            };
            let completeEvent = $scope.completeEvent || 'ryUploader.uploaded';
            EventService.fire(completeEvent, params);
        }
    }
}