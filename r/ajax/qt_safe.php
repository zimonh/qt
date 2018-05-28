<?php
include '../connect/insert.php';
$date = $_POST["date"];
$stmt = $pdo->prepare("SELECT first_name, LastUpdated FROM tbl_safe WHERE `LastUpdated` = :date ORDER BY id ASC");
$stmt->bindParam(':date',$date, PDO::PARAM_STR);
$stmt->execute();
if($stmt->rowCount()>0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $encoded){		
		$output .= $encoded["first_name"];
	}
}
echo $output;
?>