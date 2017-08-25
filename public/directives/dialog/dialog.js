/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:59:30
 */
angular.module('cmsDirective').factory('Dialog', function($modal){

    return {
        open: function(){},
        toaster: function(content) {
            return $modal.open({
                templateUrl: __uri('./dialog.html'),
                windowClass: 'window-dialog-toaster',
                controller: function($scope, $timeout, content){
                    $scope.content = content;
                    $scope.isToaster = true;
                    $timeout(function() {
                        $scope.$close();
                    }, 3000);
                },
                resolve: {
                    content: function(){
                        return content || '提示';
                    }
                }
            }).result;
        },
        confirm: function(title, content, btns){

            $modal.open({
                templateUrl: __uri('./dialog.html'),
                windowClass: 'window-dialog-confirm',
                controller: function($scope, title, content, btns){
                    $scope.title = title;
                    $scope.content = content;

                    var defaultBtns = [
                        {
                            text: '确认',
                            isImportant: false,
                            isAsync: false,
                            clickFn: function(){}
                        },
                        {
                            text: '取消',
                            isImportant: true,
                            isAsync: false,
                            clickFn: function(){}
                        }
                    ];

                    if(typeof btns == 'function'){

                        $scope.btns = angular.extend({}, defaultBtns, [{
                            text: '确认',
                            isImportant: false,
                            isAsync: false,
                            clickFn: btns
                        }]);
                    }else if(btns instanceof Array){
                        $scope.btns = btns;
                    }else{
                        $scope.btns = angular.extend({}, defaultBtns);
                    }

                    $scope.btnClick = function(index){

                        var btn = $scope.btns[index];

                        if(btn.isAsync){

                            btn.clickFn && btn.clickFn(function(){
                                $scope.$close();
                            })
                        }else{
                            if(btn.clickFn && btn.clickFn() === false){
                                return;
                            }
                            $scope.$close();
                        }
                    };
                },
                resolve: {
                    title: function(){
                        return title || '提示';
                    },
                    content: function(){
                        return content || '提示';
                    },
                    btns: function(){
                        return btns;
                    }
                }
            });
        },
        alert: function(title, content, btns){

            return $modal.open({
                templateUrl: __uri('./dialog.html'),
                windowClass: 'window-dialog-confirm',
                controller: function($scope, title, content, btns){
                    $scope.title = title;
                    $scope.content = content;

                    var defaultBtns = [
                        {
                            text: '确认',
                            isImportant: true,
                            isAsync: false,
                            clickFn: function(){}
                        }
                    ];

                    if(typeof btns == 'function'){

                        $scope.btns = angular.extend({}, defaultBtns, [{
                            clickFn: btns
                        }]);
                    }else if(btns instanceof Array){
                        $scope.btns = btns;
                    }else{
                        $scope.btns = angular.extend({}, defaultBtns);
                    }

                    $scope.btnClick = function(index){

                        var btn = $scope.btns[index];

                        if(btn.isAsync){

                            btn.clickFn && btn.clickFn(function(){
                                $scope.$close();
                            })
                        }else{
                            if(btn.clickFn && btn.clickFn() === false){
                                return;
                            }
                            $scope.$close();
                        }
                    };
                },
                resolve: {
                    title: function(){
                        return title || '提示';
                    },
                    content: function(){
                        return content || '提示';
                    },
                    btns: function(){
                        return btns;
                    }
                }
            }).result;
        }
    };
});
