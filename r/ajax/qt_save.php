<?php
include '../connect/insert.php';
$date = $_POST["date"];
$stmt = $pdo->prepare("SELECT html_blob, last_updated FROM save_tbl WHERE `last_updated` = :date ORDER BY save_id ASC");
$stmt->bindParam(':date',$date, PDO::PARAM_STR);
$stmt->execute();
if($stmt->rowCount()>0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $encoded){
		$output .= $encoded["html_blob"];
	}
}
echo $output;
?>