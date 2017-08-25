/*
 * @Author: wangxiang
 * @Date:   2017-06-09 11:35:26
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-06-09 18:43:36
 */

angular.module('cmsService')
    .factory('UploadService', UploadService);

function UploadService($http, $q, ryModal, ryUpload) {
    return {
        upload: function(params, mallId) { //上传
            let options = angular.copy(ryUpload.defaultOptions);
            options = angular.extend(options, {
                uploadUrl: '/merchant/api/upload/front',
                uploadData: {
                    mall_id: mallId
                },
                uploadFileFieldName: 'file'
            }, params);
            return ryUpload.open(options).result;
        }
    };
}