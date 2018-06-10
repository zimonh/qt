<?php
include '../connect/users.php';
if($status === "1"){

	include '../connect/insert.php';
	$id = $_POST["id"];

	if($_POST["destroy"] == 0){
		$stmt = $pdo->prepare("
			INSERT INTO save_tbl
			SELECT save_id, html_blob, page_name, last_updated, @temp_var, @temp_var
			FROM html_tbl
			WHERE id = :id");
		$stmt->bindParam(':id',$id, PDO::PARAM_INT);
		$stmt->execute();
	}

	$stmt = $pdo->prepare("DELETE FROM html_tbl WHERE id = :id");
	$stmt->bindParam(':id',$id, PDO::PARAM_INT);
	$stmt->execute();


}
?>