<?php
$user_key = $_POST["user_key"];
$s = parse_ini_file('/home/zimonh53/secure_connect/users.ini');
$sn=$s['sn'];$un=$s['un'];$pw=$s['pw'];$db=$s['db'];
try{$pdo = new PDO("mysql:host=$sn;dbname=$db",$un,$pw);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){echo 'User name, Password, or Database name in users.ini does not match. Fix the database name, permissions or name of the user and make sure the password is the same.';}
unset($s,$sn,$un,$pw,$db);
$stmt = $pdo->prepare("SELECT status FROM users_tbl WHERE user_key = :user_key");
$stmt->bindParam(':user_key', $user_key, PDO::PARAM_STR);
$stmt->execute();
if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $row){
		$status = $row["status"];
	}
}else{$status = '0';}
?>