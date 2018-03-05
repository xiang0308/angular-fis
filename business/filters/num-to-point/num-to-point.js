/*
 * @Author: wangxiang
 * @Date:   2018-02-01 15:09:26
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2018-02-01 15:13:03
 */
angular.module('cmsDirective')
    .filter('numToPoint', numToPoint);

/**
 * [numToPoint 数值保留几位小数点]
 * @return {[type]} [description]
 */
function numToPoint() {
    return function(input, p) {
        let num = parseFloat(input);
        let rtn = '0.0';

        p = p ? p : 0;

        if (isNaN(num) || num === 0) {
            return '0';
        }
        if (('' + num).indexOf('.') > -1) {
            rtn = num.toFixed(p);
        } else {
            let point = '';
            for (let i = 0; i < p; i++) {
                point += '0';
            }
            point = point === '' ? '' : `.${point}`;
            rtn = `${num}${point}`;
        }

        return rtn;
    };
}