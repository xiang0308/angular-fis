/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:28:55
 */

 angular.module('cms')
	.factory('EventService', EventService);

// 组件间通信
function EventService() {
	return {
		__events: {},
		__waitFire: {},
		on: function fnOn(key, listener, $scope) {
			let self = this;

			if (!key) {
				return this;
			}

			if (!this.__events[key]) {
				this.__events[key] = [];
			}

			if (_indexOf(this.__events,listener) === -1 && typeof listener === 'function') {
				this.__events[key].push(listener);
			}

			if ($scope) {
				$scope.$on('$destroy', fnDestroy);
			}

			if (this.__waitFire[key]) {
				this.fire.apply(this, this.__waitFire[key]);
				delete this.__waitFire[key];
			}

			return this;

			function fnDestroy() {
				self.off(key, listener);
			}
		},
		fire: function fnFire(key) {
			if (!key) {
				return this;
			}
			let allArgs = Array.prototype.slice.call(arguments);

			if (!this.__events || !this.__events[key] || this.__events[key].length === 0) {
				this.__waitFire[key] = allArgs;
				return this;
			}

			var args = Array.prototype.slice.call(arguments, 1) || [];
			var listeners = this.__events[key];
			var i = 0;
			var l = listeners.length;

			for (i; i < l; i++) {
				listeners[i].apply(this,args);
			}

			return this;
		},
		off: function fnOff(key, listener) {
			if (!key && !listener) {
				this.__events = {}
			}
			//不传监听函数，就去掉当前key下面的所有的监听函数
			if (key && !listener) {
				delete this.__events[key];
			}

			if (key && listener) {
				var listeners = this.__events[key];
				var index = _indexOf(listeners, listener);

				if (index > -1) {
					listeners.splice(index, 1);
				}
			}

			return this;
		}
	};

	function _indexOf(array, item) {
		if (array === null) return -1
		var i = 0, length = array.length
		for (; i < length; i++) if (array[i] === item) return i
		return -1
	}
}
