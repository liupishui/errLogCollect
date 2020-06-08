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

## 使用方法1

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

## 使用方法2

using npm

```bash
npm install errLogCollect --save
```

## 使用方法3

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

## php接收消息

```php

header('Content-Type: text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin');
$fs = fopen('test.txt','ab');
if(!empty($GLOBALS['_POST'])){
    //接收navigator.sendBeacon
    fwrite($fs,json_encode($GLOBALS['_POST'])."\r\n");
}else{
    //接收xhr
    fwrite($fs,json_encode($_POST)."\r\n");
};
fclose($fs);

```

接收到的一个demo

```html

{"rate":"1","ua":"Mozilla\/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident\/6.0)","browser":"IE","os":"PC","osVersion":"other","errUrl":"http:\/\/localhost:3134\/test.html","host":"localhost:3134","time":"1591370987789","msg":"[{\"type\":\"resourceError\",\"jsErrorType\":\"script\",\"message\":\"<script src='test.js'><\/script>\",\"col\":\"0\",\"line\":\"0\",\"filename\":\"http:\/\/localhost:3134\/test.js\"}]|[{\"type\":\"resourceError\",\"jsErrorType\":\"img\",\"message\":\"<img alt='' src='\/images\/jj.jpg'>\",\"col\":\"0\",\"line\":\"0\",\"filename\":\"http:\/\/localhost:3134\/images\/jj.jpg\"}]|[{\"type\":\"resourceError\",\"jsErrorType\":\"script\",\"message\":\"<script src='\/ss.js'><\/script>\",\"col\":\"0\",\"line\":\"0\",\"filename\":\"http:\/\/localhost:3134\/ss.js\"}]|[{\"type\":\"runtimeErrors\",\"jsErrorType\":\"\u8bed\u6cd5\u9519\u8bef\",\"message\":\"\u8bed\u6cd5\u9519\u8bef\",\"col\":\"0\",\"line\":\"0\",\"filename\":\"http:\/\/localhost:3134\/test.html\"}]|[{\"type\":\"runtimeErrors\",\"jsErrorType\":\"\u201cgg\u201d\u672a\u5b9a\u4e49\",\"message\":\"\u201cgg\u201d\u672a\u5b9a\u4e49\",\"col\":\"0\",\"line\":\"0\",\"filename\":\"http:\/\/localhost:3134\/test.html\"}]","productname":"test","url":"http:\/\/localhost:8416\/test.php","renderTime":"120","v":"07281922533463457"}`

```
## 常见js错误

1. SyntaxError：语法错误

2. Uncaught ReferenceError：引用错误

3. RangeError：范围错误

4. TypeError类型错误

5. URIError，URL错误

6. EvalError eval()函数执行错误


# 参考文档

参考：[https://zhuanlan.zhihu.com/p/32709628](https://zhuanlan.zhihu.com/p/32709628)[https://github.com/ecitlm/js-log-report](https://github.com/ecitlm/js-log-report)[https://www.jianshu.com/p/04e88271a8f2](https://www.jianshu.com/p/04e88271a8f2)[https://www.cnblogs.com/yanze/p/5997489.html](https://www.cnblogs.com/yanze/p/5997489.html)[https://www.jb51.net/article/124210.htm](https://www.jb51.net/article/124210.htm)[https://www.jianshu.com/p/f3986ad5f8f6](https://www.jianshu.com/p/f3986ad5f8f6)[https://github.com/BetterJS/badjs-report](https://github.com/BetterJS/badjs-report)
