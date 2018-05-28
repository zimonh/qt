<?php
$tokenoflove = $_POST["tokenoflove"];	
$s = parse_ini_file('/home/zimonh53/secure_connect/token.ini'); 
$sn=$s['sn'];$un=$s['un'];$pw=$s['pw'];$db=$s['db'];
try{$pdo = new PDO("mysql:host=$sn;dbname=$db",$un,$pw);
	$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}catch(PDOException $e){echo 'Connection failed';}
unset($s,$sn,$un,$pw,$db);
$stmt = $pdo->prepare("SELECT status FROM tokens WHERE tokenoflove = :tokenoflove");
$stmt->bindParam(':tokenoflove', $tokenoflove, PDO::PARAM_STR);
$stmt->execute();
if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $row){
		$status = $row["status"];
	}	
}else{$status = '0';}
?>