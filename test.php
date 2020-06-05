<?php

// include $_SERVER['DOCUMENT_ROOT'].'/core/init.php';
// //$wolonglist = new \core\lib\weiyuanchuang;
// //$srhInf = $wolonglist->replace("黎明前夕，繁忙依达共和国某处海边沙滩，叛军正准备处决亚裔记者李维维，她在叛军突袭村庄之际用镜头拍下了叛军惨无人道的暴行，并准备将其公之于众。与此同时，受李维维公司委托的，由五名亚裔面孔组成的小分队正在展开救援，叛军们被队员们悄无声息地解决。 在准备撤离之时，由于叛军攻势迅猛，撤离地点已被叛军占领。队员们需要带着李维维穿过被叛军控制的里尔城，前往保罗港等待接应。由于战事瞬息万变，队员们一路躲避叛军追缴，与叛军发生激烈的枪战，只为及时赶到接应港口。 在前往撤离地点的路上，维维与队员们相互间彼此了解、熟悉。国家的战火使他们团结一心，尽其所能，解救在战火中的灾民，不屈不挠，不断抗争，争取每一丝的希望与可能。");
// //echo $srhInf;
// $qk6080 = new \core\lib\qk6080;
// echo '<pre>';
// var_dump($qk6080->getRelativeMovies(444));
// var_dump($qk6080->updateRelativeMovies([22222,2232,666]));

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
