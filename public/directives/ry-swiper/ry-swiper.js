/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:52:32
 */
// ================================================================
/*
使用方法:
    js:
       $scope.ngSwiperConfig = {
            pagination: '.swiper1 .swiper-pagination',
            paginationClickable: '.swiper1 .swiper-pagination',
            nextButton: '.swiper1 .swiper-button-next',
            prevButton: '.swiper1 .swiper-button-prev',
            spaceBetween: 30
        };
    html:
        <ry-swiper-container ng-model="ngSwiperConfig" class="swiper1">
        <div class="swiper-wrapper">
            <ry-swiper-slide ng-repeat="item in [1,2,3,4,5,6] track by $index">
                {{item}}
            </ry-swiper-slide>
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
    </ry-swiper-container>
 */
// ================================================================

angular.module('cmsDirective')
    .directive('rySwiperContainer', rySwiperContainer)
    .directive('rySwiperSlide', rySwiperSlide);
/**
 * [rySwiperContainer Swiper Container]
 * @return {[type]} [description]
 */
function rySwiperContainer() {
    return {
        restrict: "EA",
        transclude: true,
        template: '<div class="swiper-container" ng-transclude></div>',
        scope: {
            ngModel: '=',
            swiper: '=',
            build: '&'
        },
        controller: function($scope, $element) {
            this.buildSwiper = function() {
                var swiper,
                    params = $scope.ngModel || {};

                if (angular.isObject($scope.swiper)) {
                    $scope.swiper = new Swiper($element[0].firstChild, params);
                    swiper = $scope.swiper;
                } else {
                    swiper = new Swiper($element[0].firstChild, params);
                }

                if ($scope.onReady !== undefined)
                    $scope.onReady({
                        swiper: swiper
                    });
            };
        },
        link: function(scope, elem, attr) {}
    }
}

/**
 * [rySwiperSlide Swiper Slide]
 * @param  {[type]} $timeout [description]
 * @return {[type]}          [description]
 */
function rySwiperSlide($timeout) {
    return {
        restrict: 'E',
        require: '^rySwiperContainer',
        transclude: true,
        template: '<div class="swiper-slide" ng-transclude></div>',
        replace: true,
        link: function(scope, element, attrs, containerController) {
            if (scope.$last === true) {
                $timeout(function() {
                    containerController.buildSwiper();
                    if (scope.build) {
                        scope.build();
                    }
                }, 0);
            }
        }
    };
}