/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 15:29:04
 */

function formatInput(input, arr) {

    input = parseInt(input);

    if (isNaN(input) || input > arr.length - 1) {
        input = 0;
    }

    return arr[input];
}

angular.module('cmsService')
    .filter('subStr', function() {

        return function(input, len) {
            function subStr(input, len) {

                var a = 0;
                var temp = '';

                for (var i = 0; i < input.length; i++) {

                    if (input.charCodeAt(i) > 255) {
                        a += 2;
                    } else {
                        a++;
                    }

                    if (a > len) {
                        return temp;
                    }

                    temp += input.charAt(i);
                }

                return input;
            }

            return subStr(input, len);
        }
    })
    .filter('getMenuLevelText', function() {

        return function(input) {

            var arr = ['-', '一级菜单', '二级菜单'];

            return formatInput(input, arr);
        };
    })
    .filter('getLevelText', function() {

        return function(input) {

            var arr = ['-', '普通用户', '管理员'];

            return formatInput(input, arr);
        };
    })
    .filter('getStatusText', function() {

        return function(input) {

            // console.log(input);

            var arr = ['-', '未发布', '待审核', '已通过', '已驳回'];

            return formatInput(input, arr);
        };
    })
    .filter('getShownStatusText', function() {

        return function(status, assStatus) {

            if (!assStatus) {
                assStatus = '0';
            }

            var shownStatus = 0;

            if (assStatus == '0') {
                shownStatus = 3;

            } else if (assStatus == '1' && status == '3') {
                shownStatus = 2;

            } else if (assStatus == '1' && status != '3') {
                shownStatus = 1;
            } else {

                shownStatus = 0;
            }

            var arr = ['-', '隐藏中', '显示中', '已失效'];

            return arr[shownStatus];
        };
    })
    .filter('getActivityStatusText', function() {

        return function(input) {

            var arr = ['-', '未发布', '待审核', '已通过', '已驳回', '进行中', '已结束'];

            return formatInput(input, arr);
        };
    })
    .filter('getActivityShownStatusText', function() {

        return function(status, assStatus, newStatus) {

            var shownStatus = 0;

            if (status == '6') {

                shownStatus = 3;
            } else if (assStatus == '1' && status == '5' && newStatus) {

                shownStatus = 2;
            } else if ((status == '5' && !newStatus) || (status == '5' && newStatus && assStatus == '0') || status == '3') {

                shownStatus = 1;
            } else {

                shownStatus = 0;
            }

            var arr = ['-', '隐藏中', '显示中', '已失效'];

            return arr[shownStatus];
        };
    })
    .filter('getActivityTypeText', function() {

        return function(input) {
            var arr = ['-', '签到'];

            return formatInput(input, arr);
        };
    })
    .filter('getDateText', function($filter) {

        return function(input) {

            if (!input) {
                return '-';
            }

            return $filter('date')(input, 'yyyy-MM-dd');
        };
    })
    .filter('getDateTimeText', function($filter) {

        return function(input) {

            if (!input) {
                return '-';
            }

            return $filter('date')(input, 'yyyy-MM-dd HH:mm:ss');
        };
    }).filter('getTypeName', function() {

        return function(input) {

            var arr = ['通用类', '满减类', '满赠类'];

            return formatInput(input - 1, arr);
        };
    }).filter('getTemplateStatusText', function() {

        return function(input) {

            var arr = ['未关联', '已关联', '已发布'];
            arr = ['', '未发布', '已发布', '已关联'];

            return formatInput(input, arr);
        };
    }).filter('getAwards', function() {

        return function(arr) {
            return arr['filter'](function(award) {
                return award.isDelete !== 1;
            });
        };
    }).filter('getAwardsLen', function() {

        return function(arr) {
            return arr['filter'](function(award) {
                return award.isDelete !== 1;
            }).length + 1;
        };
    }).filter('getLotteryStatusText', function() {

        return function(input) {

            var arr = ['待审核', '不通过 ', '未开始', '进行中', '已结束', '已下线'];

            return formatInput(input, arr);
        };
    }).filter('getTemplateTypeText', function() {

        return function(input) {

            var arr = ['--', '翻盘购', '转盘抽奖'];

            return formatInput(input, arr);
        };
    }).filter('getActivityText', function() {

        return function(input) {

            var arr = ['--', '卡券类型活动', '抽奖类型活动'];

            return formatInput(input, arr);
        };
    }).filter('range', function() {
        return function(input, total) {
            total = parseInt(total, 10);

            for (var i = 0; i < total; ++i) {
                input.push(i);
            }

            return input;
        };
    }).filter('range_time', function() {
        return function(input) {
            var total = parseInt(input, 10);
            var arr = [];

            for (var i = 0; i < total; ++i) {
                if (i <= 9) {
                    i = '0' + i;
                }
                arr.push({
                    value: i + ''
                });
            }

            return arr;
        };
    }).filter('range_time', function() {
        return function(input, total) {
            total = parseInt(total, 10);

            for (var i = 0; i < total; ++i) {
                if (i <= 9) {
                    i = '0' + i;
                }
                input.push({
                    value: i + ''
                });
            }

            return input;
        };
    }).filter('sortFloorFilter', function() {
        return function(floors) {
            var floorArr = _.values(floors);
            return _.sortBy(floorArr, function(floor) {
                return floor.id;
            });
        }
    }).filter('getText', function() {
        return function(input) {
            return input.replace('page', '内页广告')
                .replace('activity', '精彩活动')
                .replace('brand', '品牌导购')
                .replace('coupon', '优惠券')
                .replace('floor', '楼层导航')
                .replace('member', '会员中心');
        };
    }).filter('getGM', function() {
        return function(input) {
            switch (input) {
                case 'gmsb':
                    input = '国贸竖版';
                    break;
                case 'gmhb':
                    input = '国贸横版';
                    break;
                case 'rystation':
                    input = '容易小站';
                    break;
                case 'capitaland':
                    input = '哈尔滨凯德';
                    break;
                case 'ginza':
                    input = '青岛银座';
                    break;
                case 'sasseur':
                    input = '砂之船';
                    break
                case 'global':
                    input = "环球港";
                    break;
                case 'dgdynacity':
                    input = '星河城';
                    break;
                case 'mechb':
                    input = '摩尔城横版';
                    break;
                case 'mecsb':
                    input = '摩尔城竖版';
                    break;
                case 'xajy':
                    input = '西安金鹰';
                    break;
                case 'xacosb':
                    input = '西安CityOn';
                    break;
                case 'zzcosb':
                    input = '郑州CityOn';
                    break;
                case 'advplayer':
                    input = '广告播放器';
                    break;
                case 'xzsn':
                    input = '徐州苏宁';
                    break;
                case 'xajdsb':
                    input = '西安金地竖版';
                    break;
                case 'xajdhb':
                    input = '西安金地横版';
                    break;
                default:
                    break;
            }
            return input;
        }
    }).filter("trustUrl", ['$sce', function($sce) {
        return function(recordingUrl) {
            return $sce.trustAsResourceUrl(recordingUrl);
        };
    }]);
