<?php
if($page ==''){$t = 'QT - Home';}else{$t = $page;}
if($save_mode){$pre = $page;}else{$pre = $page.'?!';}// /'.$pre.'
echo '<!DOCTYPE html>
<html>
<head>
	<title>'.$t.'</title>
	<meta charset="UTF-8">
	<meta name=viewport  content="width=device-width, initial-scale=1">
	<link rel="icon" type="image/png" href="zh.ico'.$d.'">
	<link rel="stylesheet" href="r/top.css'.$d.'">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js" 		integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js" 					integrity="sha256-NLPE2EQpOtxTAUB/jxjM97jsGmVQopiX8ceHySHhXs8=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ext-language_tools.js" 	integrity="sha256-kb+/UeeIJQwoiinEYqlY7FqMXtgKpULdLvQ560OE3i4=" crossorigin="anonymous"></script>
	'.//'<script src="src/ace.js'.$d.'"></script><script src="src/ext-language_tools.js"></script>''<script src="r/js/crypto_and_replace.js"></script>.
	'<script src="r/js/top.js'.$d.'"></script>
</head>
<body style="margin-bottom:40px;">
<inmenu></inmenu>
';
?>