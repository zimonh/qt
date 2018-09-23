<?php
	$s =parse_ini_file('C:/Users/zimon/z_server/qt_ini/insert.ini');
	$sn=$s['sn'];$un=$s['un'];$pw=$s['pw'];$db=$s['db'];
	try{$pdo = new PDO("mysql:host=localhost:3306;dbname=$db",'root','IungadIGNdaignIGNDs1d29879ads');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}catch(PDOException $e){echo 'User name, Password, or Database name in insert.ini does not match. Fix the database name, permissions or name of the user and make sure the password is the same.';}
	unset($s,$sn,$un,$pw,$db);
?>