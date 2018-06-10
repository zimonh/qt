<?php
include '../connect/insert.php';

$id = $_POST["id"];
if($_POST["save"] == 0){
	$stmt = $pdo->prepare("
		SELECT html_blob
		FROM html_tbl
		WHERE `id` = :id
		ORDER BY id ASC");
	$stmt->bindParam(':id',$id, PDO::PARAM_INT);
	$stmt->execute();
	if ($stmt->rowCount() > 0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $encoded) {
			$output .= $encoded["html_blob"];
		}
	}
}else{
	$stmt = $pdo->prepare("
		SELECT html_blob
		FROM save_tbl
		WHERE `id` = :id
		ORDER BY last_updated DESC LIMIT 1");
	$stmt->bindParam(':id',$id, PDO::PARAM_INT);
	$stmt->execute();
	if ($stmt->rowCount() > 0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $encoded) {
			$output .= $encoded["html_blob"];
		}
	}
}
	echo $output;

?>