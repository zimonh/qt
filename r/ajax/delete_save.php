<?php

include '../connect/users.php';

if($status === "1"){

	include '../connect/insert.php';

	$id = $_POST["id"];

	if($_POST["date"] == 0){
		$last_updated = '';
		$date = $pdo->prepare("SELECT last_updated FROM save_tbl WHERE `save_id` = :id ORDER BY last_updated DESC LIMIT 1");
		$date->bindParam(':id',$id, PDO::PARAM_INT);
		$date->execute();
		if ($date->rowCount() > 0){
			$check = $date->fetchAll(PDO::FETCH_ASSOC);
			foreach($check as $encoded){$last_updated .= $encoded["last_updated"];}
		}
	}else{
		$last_updated = $_POST["date"];
	}

	$delete = $pdo->prepare("DELETE FROM save_tbl WHERE `last_updated` = :last_updated");
	$delete->bindParam(':last_updated',$last_updated, PDO::PARAM_STR);
	$delete->execute();
	echo $last_updated;



}


?>