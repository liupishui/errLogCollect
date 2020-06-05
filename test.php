<?php
header('Content-Type: text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin');
$fs = fopen('test.txt','ab');
if(!empty($GLOBALS['_POST'])){
    fwrite($fs,json_encode($GLOBALS['_POST'])."\r\n");
}else{
    fwrite($fs,json_encode($_POST)."\r\n");
};
fclose($fs);
