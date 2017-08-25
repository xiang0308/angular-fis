/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:59:25
 */
angular.module('cmsDirective').factory('Login', function($http, $q, $modal, loginService){

    return {
        popup: function(){

            return $modal.open({
                templateUrl: __uri('./login.html'),
                backdrop: 'static',
                keyboard: false,
                backdropClass: 'backdrop-login-dialog',
                windowClass: 'window-login-dialog',
                controller: function($scope){


                    var lastUserName = window.localStorage.getItem('cms_frontend.userName');
                    lastUserName = lastUserName ? lastUserName : '';
                    var lastRememberMe = window.localStorage.getItem('cms_frontend.rememberMe');
                    lastRememberMe = lastRememberMe ? lastRememberMe : '1';
                    var lastPersistence = window.localStorage.getItem('cms_frontend.isPersistence');

                    $scope.params = {
                        userName: lastUserName,
                        isPersistence: lastPersistence
                    };

                    $scope.rememberMe = lastRememberMe;

                    var $defaultForm = {
                        valid: true,
                        userName: {
                            require: false
                        },
                        password: {
                            require: false
                        }
                    };

                    function checkValidate(){

                        $scope.$form = angular.copy($defaultForm);

                        // $scope.$form.valid = false;

                        $('.login-area input[type="text"]').removeClass('border-blink');
                        $('.login-area input[type="password"]').removeClass('border-blink');

                        if(!$scope.params.userName){

                            setTimeout(function(){
                                $('.login-area input[type="text"]').addClass('border-blink');
                            }, 0);

                            $scope.$form.valid = false;

                        }

                        if(!$scope.params.password){

                            // $scope.$form.password.require = true;
                            setTimeout(function(){
                                $('.login-area input[type="password"]').addClass('border-blink');
                            }, 0);

                            $scope.$form.valid = false;
                        }

                    }

                    function login(){

                        checkValidate();

                        if(!$scope.$form.valid){
                            return;
                        }

                        if($scope.rememberMe){
                            window.localStorage.setItem('cms_frontend.userName', $scope.params.userName);
                        }


                        loginService.post($scope.params)
                            .success(function(json){
                                $scope.$close(json);
                            });
                    }

                    $scope.rememberMeChange = function(){
                        window.localStorage.setItem('cms_frontend.rememberMe', $scope.rememberMe);
                    }

                    $scope.persistenceChange = function(){
                        window.localStorage.setItem('cms_frontend.isPersistence', $scope.params.isPersistence);
                    }

                    $scope.login = function(){

                        login();
                    };

                    function keydownHandler(e){

                        // console.log(e);

                        if(e.keyCode == 13){
                            login();
                        }
                    }

                    $(document).on('keydown', keydownHandler);

                    $scope.$on('modal.closing', function(){
                        $(document).off('keydown', keydownHandler)
                    })

                    // $scope.keydown = function(e){

                    //     console.log(e);
                    // };
                }
            }).result;
        }
    };
});