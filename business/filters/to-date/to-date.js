/*
* @Author: weijie
* @Date:   2017-08-29 15:15:49
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T11:08:57+08:00
*/
angular.module('cmsDirective')
    .filter('toDate', toDate);

/**
 * [toDate 装换string日期]
 * @return {[type]} [description]
 */
function toDate() {
    return function(dateInt, dateFmt) {
        let rtv;

        if ((dateInt + '').length === 10) {
            dateInt = dateInt * 1000;
        }

        dateFmt = dateFmt || 'YYYY-MM-DD';
        rtv = moment(dateInt);


        return rtv.isValid() ? rtv.format(dateFmt) : '';
    };
}
