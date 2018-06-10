<?php

include '../connect/users.php';

if($status === "1"){

	include '../connect/insert.php';

	$id = $_POST["id"];

	$delete = $pdo->prepare("DELETE FROM save_tbl WHERE `save_id` = :id");
	$delete->bindParam(':id',$id, PDO::PARAM_INT);
	$delete->execute();

echo $id;

}


?>