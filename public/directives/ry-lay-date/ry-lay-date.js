/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:53:57
 */
angular.module('cmsDirective')
    .directive('ryLayDate', ryLayDate);

function ryLayDate() {
    return {
        restrict: 'EA',
        scope: {
            config: '='
        },
        template: __inline('./ry_lay_date.html'),
        transclude: true,
        replace: true,
        controller: ryLayDateCtrl,
        controllerAs: 'vm'
    };

    function ryLayDateCtrl($scope, $element) {
        let config = $scope.config;
        let options = config.options;

        if (typeof options.done !== 'function') {
            options.done = function(value, date, endDate) { // 控件选择完毕后的回调
                if (config.changeDate) {
                    config.changeDate(value, date, endDate);
                }
            }
        }

        // 执行一个laydate实例
        laydate.render(angular.extend({}, {
            elem: $element[0], //指定元素
            ready: function(date) { // 控件初始打开的回调
                // date: 得到初始的日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
            },
            change: function(value, date) { // 日期时间被切换后的回调
            },
            done: function(value, date, endDate) { // 控件选择完毕后的回调
                // value: 得到日期生成的值，如：2017-08-18
                // date: 得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                // endDate: 得到结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                if (config.changeDate) {
                    config.changeDate(value, date, endDate);
                }
            }
        }, options));
    }
}

// 调用：
// js:
// vm.test0 = '2010-08-10';
// function changeDate(key) {
//     return function(value, date) {
//         $scope.$apply(function() {
//             vm['test' + key] = value;
//         });
//     };
// }
// html:
// <ry-lay-date
//     class="form-control"
//     config="{
//         changeDate: vm.changeDate('0'),
//         options: {
//             type: 'date',
//             value: vm.test0,
//             done: null
//         }
//     }"
// >
// </ry-lay-date>