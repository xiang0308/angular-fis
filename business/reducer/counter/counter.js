/*
* @Author: weijie
* @Date:   2017-07-03 13:59:41
* @Last Modified by:   Wei Jie
* @Last Modified time: 2017-08-09 14:46:03
*/

'use strict';

import * as types from '../../constants/constants';


/**
 * [counter 计数器]
 * @param  {[type]} state   [状态]
 * @param  {[type]} action  [行为]
 * @return {[type]}         [description]
*/
export function counter (state = 1, action) {
    // console.log('counter', state, action);
  switch (action.type) {
    case types.INCREMENT:
      return ++state;

    case types.DECREMENT:
      return --state;

    default:
      return state;
  }
}
