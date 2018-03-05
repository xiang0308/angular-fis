/**
 * @file 弹框
 * @author zhaoran
 * @date 2015-07-20
 */


angular.module('cmsDirective').factory('Dialog', function($uibModal){

    return {
        open: function(){},
        confirm: function(title, content, btns){

            return $uibModal.open({
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

                        $scope.btns = angular.merge({}, defaultBtns, [{
                            clickFn: btns
                        }]);
                    }else if(btns instanceof Array){
                        $scope.btns = btns;
                    }else{
                        $scope.btns = angular.merge({}, defaultBtns);
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
        },
        alert: function(title, content, btns){

            return $uibModal.open({
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

                        $scope.btns = angular.merge({}, defaultBtns, [{
                            clickFn: btns
                        }]);
                    }else if(btns instanceof Array){
                        $scope.btns = btns;
                    }else{
                        $scope.btns = angular.merge({}, defaultBtns);
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