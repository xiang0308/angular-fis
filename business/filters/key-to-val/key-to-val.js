/*
* @Author: weijie
* @Date:   2017-08-23 11:54:14
 * @Last modified by:   weijie
 * @Last modified time: 2017-08-31T11:08:37+08:00
*/
angular.module('cmsDirective')
    .filter('keyToVal', keyToVal);

/**
 * [keyToVal 值变成val]
 * @return {[type]} [description]
 */
function keyToVal() {
    return function(id, map) {
        if ($.type(map) === 'object') {
            return map[id];
        } else if ($.type(map) === 'array') {
            for (var i = 0, len = map.length; i < len; i ++ ) {
                let item = map[i];
                if (item.id === id) {
                    return item.label;
                }
            }
        }
        return '';
    };
}
