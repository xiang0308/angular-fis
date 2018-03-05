/*
 * @Author: wangxiang
 * @Date:   2018-02-01 15:10:18
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2018-02-01 15:16:00
 */
angular.module('cmsDirective')
    .filter('numToPercent', numToPercent);

/**
 * [numToPercent 数值转为百分比]
 * @return {[type]} [description]
 */
function numToPercent() {
    return function(input, p) { // p为百分比保留几位小数
        let rtn = 0;
        let num = parseFloat(input);

        if (isNaN(num) || num <= 0) {
            rtn = '0.00%';
        } else {
            rtn = getInputPoint(Math.round(num * 10000) / 100, p || 2) + '%';
        }
        return rtn;
    };

    /**
     * [getInputPoint 保留小数几位]
     * @param  {[type]} input [输入值]
     * @param  {[type]} p     [控制保留几位]
     * @return {[type]}       [description]
     */
    function getInputPoint(input, p) {
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
    }
}