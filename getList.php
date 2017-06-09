<?php
header
('content-type:text/html;charset:UTF-8');
error_reporting(0);

$arr1
=array
('leo',
'momo',
'zhuangshen');

echo
json_encode($arr1);

?>