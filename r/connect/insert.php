<?php
	$s =parse_ini_file('/home/zimonh53/secure_connect/insert.ini'); 
	$sn=$s['sn'];$un=$s['un'];$pw=$s['pw'];$db=$s['db'];
	try{$pdo = new PDO("mysql:host=$sn;dbname=$db",$un,$pw);
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}catch(PDOException $e){echo 'Connection failed';}	
	unset($s,$sn,$un,$pw,$db);
?>