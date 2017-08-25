/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 16:01:17
 */

angular
    .module('cms')
    .factory('MirrorContentCopyService', MirrorContentCopyService);

/**
 * [MirrorContentCopyService 内容复制弹窗-服务]
 * @param {[type]} ryModal [description]
 */
function MirrorContentCopyService(ryModal) {
    return {
        open: function(params) {
            return ryModal.open({
                templateUrl: __uri('./mirror_content_copy.html'),
                size: ryModal.SIZE.LG,
                title: params.title || '复制内容',
                windowClass: 'window-content-copy',
                mask: 'static',
                hasCloseBtn: true,
                controller: MirrorContentCopyServiceCtrl,
                resolve: {
                    content: function() {
                        return params.content || {};
                    }
                }
            });
        }
    };

    /**
     * [MirrorContentCopyServiceCtrl 复制内容弹窗-控制器]
     * @param {[type]} $scope         [description]
     * @param {[type]} $modalInstance [description]
     * @param {[type]} EventService   [description]
     * @param {[type]} Dialog         [description]
     * @param {[type]} title          [description]
     * @param {[type]} templateData   [description]
     */
    function MirrorContentCopyServiceCtrl(scope, ryModalInstance, ryModal, EventService, content) {
        scope.content = content;
        scope.selectedData = [];
        scope.selectedAction = 'MirrorContentCopyServiceCtrl.selected';

        EventService
            .on(scope.selectedAction, onSelected, scope);

        scope.$on('ryModal.confirm', confirm);

        /**
         * [confirm 确认]
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        function confirm(e){
            e.preventDefault();

            if (scope.selectedData.length === 0) {
                ryModal.toast('请先选择复制的店铺哦！', 3000);
                return false;
            }

            let selectedData = JSON.stringify(formartJson(scope.selectedData));
            // TODO
            console.log(selectedData);
            scope.$close(scope.selectedData);
        }

        /**
         * [onSelected 选中关联的店铺]
         * @param  {[type]} selected [description]
         * @return {[type]}          [description]
         */
        function onSelected(selected) {
            scope.selectedData = selected;
        }

        /**
         * [formartJson 转换为json格式]
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        function formartJson(data) {
            let objArea = {};
            objArea[scope.content.id] = data;
            return objArea;
        }
    }
}