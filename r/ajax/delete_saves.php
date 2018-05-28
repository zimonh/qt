<?php 

include '../connect/token.php';

if($status === "1"){

	include '../connect/insert.php';

	$id = $_POST["id"];

	$delete = $pdo->prepare("DELETE FROM tbl_safe WHERE `ID` = :id");
	$delete->bindParam(':id',$id, PDO::PARAM_INT);
	$delete->execute();

echo $id;

}


?>