/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:49:26
 */
angular.module('cms')
	.factory('getAjaxService', getAjaxService);

/**
 * [getAjaxService 简单封装ajax请求]
 * @param  {[type]} $http   [description]
 * @param  {[type]} loading [description]
 * @return {[type]}         [description]
 */
function getAjaxService($http, loading) {
	let ajaxCount = 0;

	return {
		load: load
	};

	/**
	 * [loadStart 所有加载请求开启]
	 * @return {[type]} [description]
	 */
	function loadStart() {
		if (ajaxCount == 0) {
			loading.show();
		}

		ajaxCount ++;
	}

	/**
	 * [loadEnd 所有加载请求结束]
	 * @return {[type]} [description]
	 */
	function loadEnd() {
		ajaxCount --;
		if (ajaxCount <= 0) {
			loading.hide();
		}
	}
	/**
	 * [load 通过配置来加载]
	 * @param  {[type]} obj [description]
	 * @return {[type]}     [description]
	 */
	function load(obj, hideLoad) {
		let rtv = {};

		$.each(obj, function(key, item) {
			rtv[key] = function(params, showError) {
				let sendParams = {};
				let args = arguments;
				let type = $.type(item.params);

				if (!hideLoad) {
					loadStart();
				}

				if (type === 'object') {
					sendParams = angular.extend({}, item.params, params || {});
				} else if (type === 'array') {
					item.args.forEach(function(item, i) {
						sendParams[item] = args[i];
					});
				}

				return $http[params && params.type === 'get' ? 'get' : 'post'](item.url, sendParams)
					.success(function(res) {
						if (!hideLoad) {
							loadEnd();
						}

						return res;
					})
					.error(function(res) {
						if (!hideLoad) {
							loadEnd();
						}

						if (type === 'object' && showError) {
							if (res && res.meta && res.meta.msg) {
								console.error('[' + item.name + ']出现错误' + res.meta.msg);
							} else {
								console.error('[' + item.name + ']出现未知错误');
							}
						}

						return res;
					});
			}
		});

		return rtv;
	}
}
