<?php
header
('content-type:text/html:charset:"UTF-8"');
error_reporting(0);
$username=$_GET['username'];
$age=$_GET['age'];
echo
"你的名字是:{$username},你的年龄是：{$age}";