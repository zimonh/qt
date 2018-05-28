<?php 
include '../connect/token.php';
if($status === "1"){

	include '../connect/insert.php';	
	$id = $_POST["id"];

	if($_POST["destroy"] == 0){
		$stmt = $pdo->prepare("
			INSERT INTO tbl_safe
			SELECT ID, first_name, last_name, LastUpdated, @temp_var, @temp_var
			FROM tbl_sample
			WHERE id = :id");
		$stmt->bindParam(':id',$id, PDO::PARAM_INT);
		$stmt->execute();
	}

	$stmt = $pdo->prepare("DELETE FROM tbl_sample WHERE id = :id");
	$stmt->bindParam(':id',$id, PDO::PARAM_INT);
	$stmt->execute();


}
?>