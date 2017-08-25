/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:28:45
 */
angular.module('cmsService').constant('_', _);

angular.module('cmsService').constant('Constant', {
    pageSize: 10,
    maxSize: 5,
    CASE_STATUS_UNUSED: 0,
    CASE_STATUS_RELEASING: 1,
    CASE_STATUS_USED: 2,
    STICK_SHOP_COUNT: 6,
    COUPON_DATE_PICKER_OPTIONS: {
        "singleDatePicker": true,
        "timePicker": true,
        "autoUpdateInput": false,
        "timePicker24Hour": true,
        "autoApply": false,
        "timePickerIncrement": 1,
        "timePickerSeconds": true,
        "locale": {
            "format": "YYYY-MM-DD HH:mm",
            "applyLabel": "确定",
            "cancelLabel": "取消",
            "daysOfWeek": [
                "日",
                "一",
                "二",
                "三",
                "四",
                "五",
                "六"
            ],
            "monthNames": [
                "一月",
                "二月",
                "三月",
                "四月",
                "五月",
                "六月",
                "七月",
                "八月",
                "九月",
                "十月",
                "十一月",
                "十二月"
            ],
            "firstDay": 1
        }
    },
    // 后台线上地址
    backstageOnlineUrl: 'http://b.hdp.rongyi.com',
    // 商家系统为 merchant 运营系统为 marketing
    // 如果后端是php接口，ajax请求会加上前缀用于区分不同系统
    systemType: 'merchant',
    // 大运营系统和商家系统的登录页
    systemLoginHref: {
        'merchant': 'http://b.rongyi.com/bsoms/user/login',
        'marketing': 'http://c.rongyi.com/ryoms/user/login'
    },
    getUserUrl: {
        'merchant': '/easy-roa/v1/user/getBsUser',
        'marketing': '/easy-roa/v1/user/getRyUser'
    },
    title: {
        'merchant': '商家后台管理系统',
        'marketing': '容易网大运营管理系统'
    },
    // 渠道号
    channel: '002'
});