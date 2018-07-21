<?php
	//block the grabber script from cross origin
	session_start(['cookie_lifetime' => 600,]);
	$_SESSION["origin"] = true;

	//developer mode
	$d = '';
	$d = '?'.date("Y.m.d.h.m.s");

	$page = (isset($_GET['p']) ? $_GET['p'] : null); //uses .htacces to redirect and set page variable

	if(isset($_GET['!'])){$save_mode = true;}else{$save_mode = false;}; //triggerd with ?! at the end of url
	if(isset($_GET['@'])){$clean_mode = true;}else{$clean_mode = false;}; //triggerd with ?$ at the end of url

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
	if($clean_mode){echo "</body>\n</html>";}else{include 'r/php/bottom.php';}



?>