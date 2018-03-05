/**
 * @Author: zhaoran
 * @Date:   2017-08-16T19:10:13+08:00
 * @Last modified by:   Liao Hui
 * @Last modified time: 2017-09-13T17:01:33+08:00
 */

angular.module('cmsDirective').directive('sidebar', function($rootScope, $http, $state){

    return {
        restrict: 'A',
        replace: false,
        transclude: true,
        scope: {
            menu: '=',
            baseKey: '='
        },
        template: __inline('./sidebar.html'),
        link: function(scope, elem, attr){
            var clsExpanded = 'expanded';
            var clsActive = 'active';

            var lastExpandedLevel1Wrapper = null;

            lastExpandedLevel1Wrapper = $('.level1-wrapper').get(0);

            var $elem = $(elem);
            var clientHeight = $(window).height();
            var elemTop = $elem.offset().top;
            var elemHeight = $elem.height();

            // $elem.attr('min-height', clientHeight - elemTop);

            if(elemHeight + elemTop < clientHeight){
                $elem.css('min-height', clientHeight - elemTop);
            }

            $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);

            function onStateChangeSuccess(e, toState) {
                var $allLevel1s = $('.level1');
                var $allLevel2s = $('.level2');
                var menu = scope.menu;
                var parentIndex = -1;
                var childrenIndex = -1;
                var stateName = toState.name;

                if (!menu) {
                    return;
                }

                for (var i = 0, iLen = menu.length; i < iLen; i ++ ) {
                    for (var j = 0, jLen = menu[i].children.length; j < jLen; j ++) {
                        if (stateName.indexOf(menu[i].key + '.' + menu[i].children[j].key) >= 0) {
                            parentIndex = i;
                            childrenIndex = j;
                            break;
                        }
                    }
                    if (parentIndex >= 0) {
                        break;
                    }
                }

                if (parentIndex === -1) {
                    return;
                }

                $allLevel1s.removeClass('active');
                $allLevel2s.removeClass('active');

                let $levelWrap = $('.level1-wrapper').eq(parentIndex);

                $levelWrap.find('.level1').addClass('active');
                $levelWrap.find('.level2').eq(childrenIndex).addClass('active');

            }


            scope.level1ClickHandler = function(e, level1){
                var $tar = $(e.target);
                var $level1Wrapper = $tar.closest('.level1-wrapper');

                var $allLevel1s = $('.level1');
                var $allLevel2s = $('.level2');

                if(lastExpandedLevel1Wrapper === $level1Wrapper.get(0)){
                    // 再次点击当前选中项
                    $level1Wrapper.removeClass(clsExpanded);
                    $level1Wrapper.find('.level2-wrapper').slideUp('fast');
                    $level1Wrapper.find('.fa').css({
                        transform: "rotate(0)"
                    });
                    lastExpandedLevel1Wrapper = null;

                }else if(!lastExpandedLevel1Wrapper){
                    // 当前没有任何选中项
                    $level1Wrapper.addClass(clsExpanded);
                    $level1Wrapper.find('.level2-wrapper').slideDown('fast');
                    $level1Wrapper.find('.fa').css({
                        transform: "rotate(180deg)"
                    });
                    lastExpandedLevel1Wrapper = $level1Wrapper.get(0);
                }else{
                    //当前有选中项，点击另外一个选中项
                    $(lastExpandedLevel1Wrapper).removeClass(clsExpanded);
                    $(lastExpandedLevel1Wrapper).find('.level2-wrapper').slideUp('fast');
                    $(lastExpandedLevel1Wrapper).find('.fa').css({
                        transform: "rotate(0)"
                    });

                    $level1Wrapper.addClass(clsExpanded);
                    $level1Wrapper.find('.level2-wrapper').slideDown('fast');
                    $level1Wrapper.find('.fa').css({
                        transform: "rotate(180deg)"
                    });
                    lastExpandedLevel1Wrapper = $level1Wrapper.get(0);
                }

                // if($level1Wrapper.hasClass(clsExpanded)){
                //     $level1Wrapper.removeClass(clsExpanded);
                //     $level1Wrapper.find('.level2-wrapper').slideUp();
                // }else{
                //     $level1Wrapper.addClass(clsExpanded);

                //     // $level1Wrapper.find('.level2-wrapper').addClass('animated slideInDown')
                //     // $level1Wrapper.find('.level2-wrapper').slideDown();
                //     $level1Wrapper.siblings().removeClass(clsExpanded);
                // }

                $allLevel1s.removeClass(clsActive);
                if($tar.hasClass('level1')) {
                    $tar.addClass(clsActive);
                } else {
                    $tar.parent().addClass(clsActive);
                }

                if(!(level1.children instanceof Array && level1.children.length > 0)){
                    // 没有子节点
                    $allLevel2s.removeClass(clsActive);
                    $state.go(scope.baseKey + '.' + level1.key);
                }


            };

            scope.level2ClickHandler = function(e, level1, level2){
                var $tar = $(e.target);
                var $level1Wrapper = $tar.parent().siblings();

                var $allLevel1s = $('.level1');
                var $allLevel2s = $('.level2');

                $allLevel1s.removeClass(clsActive);
                $allLevel2s.removeClass(clsActive);
                $level1Wrapper.addClass(clsActive);
                $tar.addClass(clsActive);

                $state.go(scope.baseKey + '.' + level1.key + '.' + level2.key);
            }


            scope.level1HasAuth = function(level1){
                var hasAuth = false;

                if(level1.auth){

                    hasAuth = $rootScope.hasAuth(level1.auth);
                }else{

                    for(var i = 0, len = level1.children.length; i < len; i++){
                        hasAuth = scope.level2HasAuth(level1.children[i]);

                        if(hasAuth){
                            break;
                        }
                    }
                }

                return hasAuth;
            };


            scope.level2HasAuth = function(level2){
                return !level2.auth || $rootScope.hasAuth(level2.auth);
            };


            // $http.get('/console/sidebar')
            //     .success(function(json){
            //         scope.menu = json.result.menu;

            //         lastExpandedLevel1Wrapper = $('.level1-wrapper').get(0);
            //     });

        }
    };
});
