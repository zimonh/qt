<?php

include '../connect/users.php';
echo $status;
if($status === "1"){

echo '123';



	$id = $_POST["id"];
	$page = $_POST["page"];
	$html = $_POST["html"];

	include '../translation.php';
	$encoded = str_replace($readable, $unreadable, $html);

	$page = preg_replace("/[^A-Za-z0-9_?! ]/","",$page);
	$page = preg_replace("/( )/","_",$page);

try {
	$s =parse_ini_file('/z_server/qt_ini/insert.ini');
	$sn=$s['sn'];$un=$s['un'];$pw=$s['pw'];$db=$s['db'];
	try{$pdo = new PDO("mysql:host=localhost:3306;dbname=qt_db",'root','IungadIGNdaignIGNDs1d29879ads');
		$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}catch(PDOException $e){echo 'User name, Password, or Database name in insert.ini does not match. Fix the database name, permissions or name of the user and make sure the password is the same.';}
	unset($s,$sn,$un,$pw,$db);


	$stmt = $pdo->prepare("INSERT INTO save_tbl SELECT id, html_blob, page_name, last_updated, @temp_var, @temp_var FROM html_tbl WHERE id = :id");
	$stmt->bindParam(':id',$id, PDO::PARAM_INT);
	$stmt->execute();
} catch (Exception $e) {
    die($e);
}

	$stmt = $pdo->prepare("UPDATE html_tbl SET html_blob = :html , page_name = :page  WHERE id = :id");
	$stmt->bindParam(':id',$id, PDO::PARAM_INT);
	$stmt->bindParam(':html',$html, PDO::PARAM_STR);
	$stmt->bindParam(':page',$page, PDO::PARAM_STR);
	$stmt->execute();
	date_default_timezone_set('CET');
 	$inserted_date = date('H:i:s');
	echo $inserted_date;


}

?>
