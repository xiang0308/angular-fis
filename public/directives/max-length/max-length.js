/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:59:11
 */

angular.module('cmsDirective').directive('maxLength', function() {
    return {
        restrict: 'A',
        replace: false,
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel) {
            var maxLength = Number(attrs.maxLength); // max-length 属性设置为英文字符个数

            function subStr(input, len) {
                var a = 0;
                var temp = '';

                for (var i = 0; i < input.length; i++) {

                    if (input.charCodeAt(i) > 255) {
                        a += 2;
                    } else {
                        a++;
                    }

                    if (a > len) {
                        return temp;
                    }

                    temp += input.charAt(i);
                }

                return input;
            }

            var isComposition = false;

            element.on('compositionstart', function() {
                isComposition = true;
                // console.log('compositionstart');
            });

            element.on('compositionupdate', function() {
                // console.log('compositionupdate');
            })

            element.on('compositionend', function() {
                isComposition = false;
                // console.log('compositionend');
            });

            ngModel.$parsers.push(function(text) {
                var _str = text ? subStr(text, maxLength) : '';
                ngModel.$setViewValue(_str);
                ngModel.$render();

                return _str;
            });

            ngModel.$formatters.push(function(text) {
                var _str = text ? subStr(text, maxLength) : '';
                return _str;
            });
        }
    };
});