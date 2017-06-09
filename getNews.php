<?php
header
("content-type:text/html;charset:utf-8");
error_reporting(0);

$arr=array(

array('title'=>'张高丽：推动世界清洁能源高效智能共享发展','date'=>'2017-06-08'),
array('title'=>'国务院:7月1日起，建筑领域工程质量保证金预留比例..','date'=>'2017-06-08'),
array('title'=>'央行等五部委发布“十三五”金融业标准化规划 数字货..','date'=>'2017-06-08'),
array('title'=>'恒大掐点撤退深铁精准集权 “谁的万科”定盘','date'=>'2017-06-08'),
array('title'=>'联合国报告：中国首次成为全球第二大投资国','date'=>'2017-06-08'),
array('title'=>'今年前5个月我国进出口总值10.76万亿元','date'=>'2017-06-08')
);
echo
json_encode($arr);
?>