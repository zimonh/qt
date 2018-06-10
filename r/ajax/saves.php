<?php
if(isset($encoded["save_id"])){
	$saveid = $encoded["save_id"];

}else{
	if(isset($encoded["id"])){
		$saveid = $encoded["id"];
	}else{
		$saveid = $_POST["id"];
	}
}

	include '../connect/insert.php';
	$stmt = $pdo->prepare("SELECT last_updated, save_name FROM save_tbl WHERE `save_id` = :id ORDER BY last_updated DESC");
	$stmt->bindParam(':id',$saveid, PDO::PARAM_INT);
	$stmt->execute();

	$save = '';
	if($stmt->rowCount()>0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $saves){ $save .= $saves["last_updated"].$saves["save_name"]."~";}
		$history = '<button title="History" class="btn_savess">		<img src="r/svg/saves.svg" alt="History"></button>';
	}else{$history ='';}

	if(isset($_POST["id"])){echo $save;}
?>