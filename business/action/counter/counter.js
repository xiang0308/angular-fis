/*
* @Author: weijie
* @Date:   2017-07-03 13:42:13
* @Last Modified by:   Wei Jie
* @Last Modified time: 2017-08-09 14:49:09
*/

'use strict';

import * as types from '../../constants/constants';

/**
 * 
 * [increment 自增]
 * @return {[type]} [description]
 */
export function increment() {
    return {
      type: types.INCREMENT
    };
}

/**
 * 
 * [decrement 自减]
 * @return {[type]} [description]
 */
export function decrement() {
  return {
    type: types.DECREMENT
  };
}
