<?php
/********Set develop modus********/
$d = '';
$d = '?'.date("Y.m.d.h.m.s");

/********uses the .htacces file to redirect and set the page variable********/
$page = (isset($_GET['p']) ? $_GET['p'] : null);

//triggerd with ?! at the end of url
if(isset($_GET['!'])){$save_mode = true;}else{$save_mode = false;};

preg_match("/^[A-Za-z0-9,' .\-]+$/i", $page);

/*******Force that the page is fresh like a bleached asshole*****/
header("Cache-Control: no-cache, no-store, must-revalidate"); // HTTP 1.1.
header("Pragma: no-cache"); // HTTP 1.0.
header("Expires: 0"); // Proxies.

include 'r/connect/select.php';
include 'r/connect/insert.php';
include 'r/php/translation.php';
include 'r/php/top.php';
include 'r/php/select.php';
include 'r/php/bottom.php';
?>