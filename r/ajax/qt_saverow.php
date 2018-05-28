<?php
include '../connect/insert.php';
$id = $_POST["id"];
$stmt = $pdo->prepare("SELECT first_name FROM tbl_safe WHERE `ID` = :id ORDER BY LastUpdated DESC LIMIT 1");
$stmt->bindParam(':id',$id, PDO::PARAM_INT);
$stmt->execute();
if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $encoded) {		
		$output .= $encoded["first_name"];
	}
}

	echo $output;
?>