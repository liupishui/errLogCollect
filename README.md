# errLogCollect

实现js错误，资源加载错误日志收集上报和页面渲染用时的上报;

js错误上报：在window `beforeunload` 时，先进浏览器使用`navigator.sendBeacon`的方式上报，不支持此方法的使用xhr合并进行上报

页面渲染时间：计算页面开始渲染到window.onload所使用的时间

默认上报信息，可以任意扩展，value为string格式

```Javascript
    defaults={//默认上报信息和配置
            rate: 1,//上报率,可设置范围[0,1];//默认1，全部上报,0为不上报,0.3默认上报30%
            ua: window.navigator.userAgent,
            browser: this.getBrowserName(),//浏览器名字
            os: this.getDevices(),//操作系统
            osVersion: this.getSystemVersion(),//操作系统版本号
            errUrl: window.location.href,//发生错误的页面地址
            host: window.location.host,//发生错误的主机
            time: new Date().getTime(),//上报时间
            msg: ''//错我日志
        }
```

##使用方法1

直接引入

```html
    <script src="lib/errLogCollect.js"></script>
    <script>
        var errLogCollect = new errLogCollect({
                productname: 'test', //产品名称
                url: 'http://localhost:8416/test.php' //接收日志上报地址
            });
    </script>
```

##使用方法2

using npm

```bash
npm install errLogCollect --save
```

##使用方法3

using require.js

```html
    <script src="https://cdn.staticfile.org/require.js/2.3.6/require.js"></script>
    <script>
            require(['/lib/errLogCollect.js'], function (errLogCollect) {
                new new errLogCollect({
                    productname: 'test', //产品名称
                    url: 'http://localhost:8416/test.php' //上报地址
                })
            });
    </script>
```

#参考文档

    https://zhuanlan.zhihu.com/p/32709628[https://zhuanlan.zhihu.com/p/32709628]
    https://github.com/ecitlm/js-log-report[https://github.com/ecitlm/js-log-report]
    https://www.jianshu.com/p/04e88271a8f2[https://www.jianshu.com/p/04e88271a8f2]
    https://www.cnblogs.com/yanze/p/5997489.html[https://www.cnblogs.com/yanze/p/5997489.html]
    https://www.jb51.net/article/124210.htm[https://www.jb51.net/article/124210.htm]
    https://www.jb51.net/article/124210.htm[https://www.jianshu.com/p/f3986ad5f8f6]
    https://www.jb51.net/article/124210.htm[https://github.com/BetterJS/badjs-report]