/*
 * @Author: wangxiang
 * @Date:   2017-08-25 15:25:33
 * @Last Modified by:   wangxiang
 * @Last Modified time: 2017-08-25 16:29:47
 */

fis.config.merge({
    replace: {
        online: {
            from: new RegExp([
                'html5Mode\\([^\)]+\\)'
            ].join('|'), 'g'),

            to: function(m) {
                var ouji = '';
                switch (m) {
                    case 'html5Mode(!1)':
                        ouji = 'html5Mode(!!1)';
                        break;
                }
                return ouji;
            }
        },
        pre_online: {
            from: new RegExp([
                'html5Mode\\([^\)]+\\)',
                'b\\.rongyi\\.com',
                'c\\.rongyi\\.com',
                'b\\.hdp\\.rongyi\\.com'
            ].join('|'), 'g'),

            to: function(m) {
                var ouji = '';
                switch (m) {
                    case 'html5Mode(!1)':
                        ouji = 'html5Mode(!!1)';
                        break;
                }
                return ouji;
            }
        },
        qa: {
            from: new RegExp([
                'html5Mode\\([^\)]+\\)'
            ].join('|'), 'g'),
            to: function(m) {
                var ouji = '';
                switch (m) {
                    case 'html5Mode(!1)':
                        ouji = 'html5Mode(!!1)';
                        break;
                }
                return ouji;
            }
        },
        rd: {
            from: new RegExp([
                'html5Mode\\([^\)]+\\)'
            ].join('|'), 'g'),
            to: function(m) {
                var ouji = '';
                switch (m) {
                    case 'html5Mode(false)':
                        ouji = 'html5Mode(true)';
                        break;
                }
                return ouji;
            }
        }
    }
});

fis.config.merge({
    staticModule: 'mirror_static',
    pack: {
        '/pkg/vendor.js': [
            '/public/lib/mod.js',
            '/public/bower_components/jquery/dist/jquery.js',
            '/public/bower_components/angular/angular.js'
        ],
        'pkg/vendor2.js': [
            '/public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            '/public/bower_components/angular-cookies/angular-cookies.js',
            '/public/bower_components/angular-sanitize/angular-sanitize.js',
            '/public/bower_components/angular-animate/angular-animate.js',
            '/public/bower_components/ui-router/release/angular-ui-router.js',
            '/public/bower_components/angular-i18n/angular-locale_zh-cn.js',
            '/public/bower_components/ng-elif/src/elif.js',
            '/public/bower_components/ng-file-upload/ng-file-upload-all.js',
            '/public/bower_components/moment/moment.js',
            '/public/bower_components/bootstrap-daterangepicker/daterangepicker.js',
            '/public/bower_components/angular-daterangepicker/js/angular-daterangepicker.js'
        ],
        '/pkg/vendor.css': [
            '/public/bower_components/bootstrap/dist/css/bootstrap.css',
            '/public/bower_components/font-awesome/css/font-awesome.css',
            '/public/bower_components/textAngular/dist/textAngular.css',
            '/public/bower_components/bootstrap-daterangepicker/daterangepicker-bs3.css',
            '/public/styles/site.less'
        ]
    },
    deploy: {
        online: [{
            from: '/mirror_static',
            to: './output',
            replace: fis.config.get('replace').online
        }],
        pre_online: [{
            from: '/mirror_static',
            to: './output',
            replace: fis.config.get('replace').pre_online
        }],
        qa: [{
            from: '/mirror_static',
            to: './output',
            replace: fis.config.get('replace').qa
        }],
        rd: [{
            receiver: 'http://192.168.1.222:8999/receiver',
            from: '/mirror_static',
            to: '/home/rongyi/cmsfrontend/webroot',
            replace: fis.config.get('replace').rd
        }]
    }
});

fis.config.get('roadmap.path').unshift({
    reg: /.*business\/index\.html$/i,
    isMod: false,
    useHash: false,
    release: '${staticModule}/$&'
}, {

    reg: /.*\.html$/i,
    isMod: false,
    useHash: true,
    useMap: true,
    release: '${staticModule}/$&'
}, {
    reg: /.*\.ogg$/i,
    release: '${staticModule}/$&'
});

fis.config.set('modules.prepackager', function(ret, conf, settings, opt) {

    function modJsCodeGen(map) {
        var indent = opt.optimize && !settings.beautyResourceMap ? null : 4;
        return 'var resourceMap = ' + JSON.stringify(map, null, indent) + ';';
    }

    var res = ret.map.res;
    var map = {};

    fis.util.map(res, function(key, value) {
        if (/business\/modules\/.*\.html$/i.test(key)) {
            map[key] = {
                uri: res[key].uri
            };
        }
    });

    var code = modJsCodeGen(map);
    var mapScript = '<script type="text/javascript" >\r\n' + code + '\r\n</script>';

    fis.util.map(ret.src, function(subpath, file) {
        if (file.isHtmlLike) {
            var content = file.getContent();
            content = content.replace(/<\/head>/, mapScript + '\n$&');
            file.setContent(content);
        }
    });
});