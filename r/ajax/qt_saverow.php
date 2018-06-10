<?php
include '../connect/insert.php';
$id = $_POST["id"];
$stmt = $pdo->prepare("SELECT html_blob FROM save_tbl WHERE `save_id` = :id ORDER BY last_updated DESC LIMIT 1");
$stmt->bindParam(':id',$id, PDO::PARAM_INT);
$stmt->execute();
if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $encoded) {
		$output .= $encoded["html_blob"];
	}
}

	echo $output;
?>