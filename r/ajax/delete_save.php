<?php 

include '../connect/token.php';

if($status === "1"){

	include '../connect/insert.php';

	$id = $_POST["id"];

	if($_POST["date"] == 0){
		$LastUpdated = '';
		$date = $pdo->prepare("SELECT LastUpdated FROM tbl_safe WHERE `ID` = :id ORDER BY LastUpdated DESC LIMIT 1");
		$date->bindParam(':id',$id, PDO::PARAM_INT);
		$date->execute();
		if ($date->rowCount() > 0){
			$check = $date->fetchAll(PDO::FETCH_ASSOC);
			foreach($check as $encoded){$LastUpdated .= $encoded["LastUpdated"];}
		}
	}else{
		$LastUpdated = $_POST["date"];
	}

	$delete = $pdo->prepare("DELETE FROM tbl_safe WHERE `LastUpdated` = :LastUpdated");
	$delete->bindParam(':LastUpdated',$LastUpdated, PDO::PARAM_STR);
	$delete->execute();
	echo $LastUpdated;



}


?>