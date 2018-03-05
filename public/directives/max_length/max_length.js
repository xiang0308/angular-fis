/**
 * @file 扩展 max-length 属性，汉字识别为两个字符
 * @author zhaoran
 * @date 2015-06-29
 */

angular.module('cmsDirective').directive('maxLength', function(){

    return {
        restrict: 'A',
        replace: false,
        require: '?ngModel',
        link: function(scope, element, attrs, ngModel){
            // console.log(arguments);
            var maxLength = attrs.maxLength; // max-length 属性设置为英文字符个数

            // scope.$watch(function(){
            //     return ngModel.$modelValue;
            // }, function(newValue, oldValue){
            //     console.log('modelValue:' + newValue);

            //     if(newValue.replace(/[^\x00-\xff]/g,"01").length > maxLength){
            //         // element.val(element.val().slice);
            //         // element.val(oldValue);
            //         // 
            //         ngModel.$modelValue = oldValue;
            //     }
            // });
    

            function subStr(input, len){

                var a = 0;
                var temp = '';

                for(var i = 0; i < input.length; i++){

                    if(input.charCodeAt(i) > 255){
                        a+= 2;
                    }else{
                        a++;
                    }

                    if(a > len){
                        return temp;
                    }

                    temp += input.charAt(i);
                }

                return input;
            }

            var isComposition = false;

            element.on('compositionstart', function(){
                isComposition = true;
                // console.log('compositionstart');
            });

            // element.on('compositionupdate', function(){
            //     console.log('compositionupdate');
            // })

            element.on('compositionend', function(){
                isComposition = false;
                // console.log('compositionend');
            });

            scope.$watch(attrs.ngModel, function(newValue, oldValue){

                // console.log(newValue);

                if(newValue && !isComposition){
                    ngModel.$setViewValue(subStr(newValue, maxLength));
                    ngModel.$render();
                }     
            });

            element.on('blur', function(){
                var val = element.val();
                ngModel.$setViewValue(subStr(val, maxLength));
                ngModel.$render();
            });

        }
    };
});