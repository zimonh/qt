<?php

include '../connect/users.php';

if($status === "1"){

	include '../connect/insert.php';

	$id = $_POST["id"];
	$page = $_POST["page"];
	$html = $_POST["html"];

	include '../translation.php';
	$encoded = str_replace($readable, $unreadable, $html);

	$page = preg_replace("/[^A-Za-z0-9_?! ]/","",$page);
	$page = preg_replace("/( )/","_",$page);


	$stmt = $pdo->prepare("INSERT INTO save_tbl SELECT id, html_blob, page_name, last_updated, @temp_var, @temp_var FROM html_tbl WHERE id = :id");
	$stmt->bindParam(':id',$id, PDO::PARAM_INT);
	$stmt->execute();


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
