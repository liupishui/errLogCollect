/*
* @Author: liupishui
* @Date:   2020-06-05 09:39:59
* @Last Modified by:   liupishui
* @Last Modified time: 2020-06-05 13:36:53
*/
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.errLogCollect = factory());
}(this, (function () {
    //参考文档
    //https://zhuanlan.zhihu.com/p/32709628
    //https://github.com/ecitlm/js-log-report
    //https://www.jianshu.com/p/04e88271a8f2
    //https://www.cnblogs.com/yanze/p/5997489.html
    //https://www.jb51.net/article/124210.htm
    //https://www.jianshu.com/p/f3986ad5f8f6
    //https://github.com/BetterJS/badjs-report
    //使用方法
    // <script type="text/javascript" src="errLogCollect.js"></script>
    //     <script>
    //         errLogCollect(
            //productname:'test',
    //       url: 'http://localhost:8416/test.php' //上报地址
    //     })
    //     var a = 1
    //     b = c
    // </script>

    //数据表结构
    //DROP TABLE IF EXISTS `j_log`;
    // CREATE TABLE`j_log`(
    //     `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id号',
    //     `os_version` char(10) DEFAULT NULL COMMENT '系统版本号',
    //     `msg` varchar(255) DEFAULT NULL COMMENT '错误信息',
    //     `error_url` varchar(255) DEFAULT NULL COMMENT '错误所在的url',
    //     `line` int(10) DEFAULT NULL COMMENT '错误所在的行',
    //     `col` int(10) DEFAULT NULL COMMENT '错误所在的列',
    //     `error` varchar(255) DEFAULT NULL COMMENT '具体的error对象',
    //     `url` varchar(255) DEFAULT NULL,
    //     `browser` varchar(255) DEFAULT NULL COMMENT '浏览器类型',
    //     `product_name` char(255) CHARACTER SET utf8 DEFAULT '' COMMENT '产品名称',
    //     `error_time` char(20) DEFAULT NULL COMMENT '时间戳',
    //     `os` char(10) DEFAULT NULL COMMENT '系统类型',
    //     `extend` varchar(255) DEFAULT NULL COMMENT '业务扩展字段、保存JSON字符串',
    //     `ua` varchar(255) DEFAULT NULL,
    //     PRIMARY KEY(`id`)
    // ) ENGINE = MyISAM AUTO_INCREMENT = 55 DEFAULT CHARSET = utf8;
    var renderTime = new Date().getTime();
    if (window.addEventListener) {
        window.addEventListener("load", function () {
            renderTime = new Date().getTime() - renderTime;
        }, true);
    } else if (window.attachEvent) {
        renderTime = new Date().getTime() - renderTime;
    }
    if (document.createElement.bind) {
        document.createElement = (function () {
            var fn = document.createElement.bind(document);
            return function (type) {
                var result = fn(type);
                if (type === 'script') {
                    result.crossOrigin = 'anonymous';
                }
                return result;
            }
        })();
    };
    var errLogCollect = function (options){
        if (!options.url) { return }

        this.getDevices = function () {
            var u = navigator.userAgent, app = navigator.appVersion
            if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
                if (window.location.href.indexOf('?mobile') < 0) {
                    try {
                        if (/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)) {
                            return 'iPhone'
                        } else {
                            return 'Android'
                        }
                    } catch (e) { }
                }
            } else if (u.indexOf('iPad') > -1) {
                return 'iPhone'
            } else {
                return 'PC'
            }
        }

        this.getBrowserName = function () {
            var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
            var isOpera = userAgent.indexOf('Opera') > -1
            if (isOpera) {
                return 'Opera'
            }; // 判断是否Opera浏览器
            if (userAgent.indexOf('Firefox') > -1) {
                return 'FF'
            } // 判断是否Firefox浏览器
            if (userAgent.indexOf('Chrome') > -1) {
                return 'Chrome'
            }
            if (userAgent.indexOf('Safari') > -1) {
                return 'Safari'
            } // 判断是否Safari浏览器
            if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
                return 'IE'
            }; // 判断是否IE浏览器
        }

        this.getSystemVersion = function () {
            var ua = window.navigator.userAgent
            if (ua.indexOf('CPU iPhone OS ') >= 0) {
                return ua.substring(ua.indexOf('CPU iPhone OS ') + 14, ua.indexOf(' like Mac OS X'))
            } else if (ua.indexOf('Android ') >= 0) {
                return ua.substr(ua.indexOf('Android ') + 8, 3)
            } else {
                var sUserAgent = navigator.userAgent;
                var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
                var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
                if (isMac) return "Mac";
                var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
                if (isUnix) return "Unix";
                var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
                if (isLinux) return "Linux";
                if (isWin) {
                    var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
                    if (isWin2K) return "Win2000";
                    var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
                    if (isWinXP) return "WinXP";
                    var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
                    if (isWin2003) return "Win2003";
                    var isWinVista = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
                    if (isWinVista) return "WinVista";
                    var isWin7 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
                    if (isWin7) return "Win7";
                    var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
                    if (isWin10) return "Win10";
                }
                return "other";
            }
        }

        this.defaults = {//默认上报信息
            rate: 1,//上报率,可设置范围[0,1];//默认1，全部上报,0为不上报
            ua: window.navigator.userAgent,
            browser: this.getBrowserName(),
            os: this.getDevices(),
            osVersion: this.getSystemVersion(),
            errUrl: window.location.href,
            host: window.location.host,
            time: new Date().getTime(),//上报时间
            msg: ''
        }

        for (var setting in options) {
            this.defaults[setting] = options[setting];
        }

        this.formatParams = function (data) {
            var arr = []
            for (var name in data) {
                arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
            }
            arr.push(('v=' + Math.random()).replace('.', ''))
            return arr.join('&')
        }
        this.ajax = function (options) {
            options.data.renderTime = renderTime;
            options = options || {}
            options.type = (options.type || 'GET').toUpperCase()
            options.dataType = options.dataType || 'json'
            if (navigator.sendBeacon) {
                var formDataCurr = new FormData();
                for (var setting in options.data) {
                    formDataCurr.append(setting, options.data[setting]);
                }
                navigator.sendBeacon(options.url, formDataCurr);
            } else {
                var params = this.formatParams(options.data)
                if (window.XMLHttpRequest) {
                    var xhr = new XMLHttpRequest()
                } else {
                    var xhr = new ActiveXObject('Microsoft.XMLHTTP')
                }
                if (options.type == 'GET') {
                    xhr.open('GET', options.url + '?' + params, false)//异步会导致页面卸载 xhr请求失败
                    xhr.send(null)
                } else if (options.type == 'POST') {
                    xhr.open('POST', options.url, false)//异步会导致页面卸载 xhr请求失败
                    // 设置表单提交时的内容类型
                    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                    xhr.send(params)
                }
            }
        }

        this.uploadErrors = function () {
            for (var item in this.resourcesErrors) {
                this.Errors.push(this.resourcesErrors[item]);
            };
            if (this.RuntimeErrorsEvent.length > 0) {
                for (var item in this.RuntimeErrorsEvent) {
                    this.Errors.push(this.RuntimeErrorsEvent[item]);
                }
            } else {
                for (var item in this.RuntimeErrors) {
                    this.Errors.push(this.RuntimeErrors[item]);
                }
            }
            var errorMsg = [];
            for (var item in this.Errors) {
                errorMsg.push('[{"type":"' + this.Errors[item].type + '","jsErrorType":"' + this.Errors[item].jsErrorType + '","message":"' + this.Errors[item].message + '","col":"0","line":"0","filename":"' + this.Errors[item].filename + '"}]');
            };
            this.defaults.msg = errorMsg.join('|');
            if (this.defaults.msg == '') {
                return;
            }
            if(this.defaults.msg!==''){
                this.ajax({
                    url: this.defaults.url, // 上报请求地址
                    type: 'POST', // 请求方式
                    data: this.defaults, // 请求参数
                    dataType: 'json'
                })
            }
        };

        //错误收集
        this.Errors = [];
        this.resourcesErrors = [];
        this.RuntimeErrors = [];
        this.RuntimeErrorsEvent = [];
        var __self = this;
        var errorsCollect = function (error) {
            if (Math.random() < __self.defaults.rate) {//调整上报比率;
                if (typeof (error) !== 'string') {
                    var errorCurrElment = error.srcElement ? error.srcElement : error.target;
                    if (errorCurrElment.tagName) {
                        __self.resourcesErrors.push({
                            type: "resourceError",
                            jsErrorType: errorCurrElment.tagName.toLowerCase(),
                            message: errorCurrElment.outerHTML.toString().replace(/"/g, "'"),
                            colno: 0,
                            line: 0,
                            filename: errorCurrElment.currentSrc || errorCurrElment.href || errorCurrElment.src || ''
                        });
                    }
                }
                if (typeof (error) === 'object') {
                    if (error.error) {
                        __self.RuntimeErrorsEvent.push({
                            type: "runtimeErrors",
                            jsErrorType: error.error.stack.split(':')[0],
                            message: error.error.stack.replace(/\n/g, '->'),
                            colno: error.colno,
                            lineno: error.lineno,
                            filename: error.filename
                        });
                    }
                }
            }
        };
        onerrorOld = window.onerror;
        window.onerror = function (error, url, line) {
            if (Math.random() < __self.defaults.rate) {//调整上报比率;
                __self.RuntimeErrors.push({
                    type: "runtimeErrors",
                    jsErrorType: error.split(':')[0],
                    message: error,
                    colno: 0,
                    lineno: line,
                    filename: url
                });
            }
            return onerrorOld;
        }
        if (window.addEventListener) {
            window.addEventListener("error", errorsCollect, true);
        } else if (window.attachEvent) {
            window.attachEvent("onerror", errorsCollect);
        }
        //错误上传
        //setTimeout(function () { __self.uploadErrors.call(__self)},2000);
        if (window.addEventListener) {
            window.addEventListener("beforeunload", function () { __self.uploadErrors.call(__self) }, true);
        } else if (window.attachEvent) {
            window.attachEvent("onbeforeunload", function () { __self.uploadErrors.call(__self) });
        }
    }
    return errLogCollect;
    })
))
