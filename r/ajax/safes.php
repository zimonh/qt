<?php
if(isset($encoded["ID"])){
	$safeid = $encoded["ID"];

}else{
	if(isset($encoded["id"])){
		$safeid = $encoded["id"];
	}else{
		$safeid = $_POST["id"];
	}
}

	include '../connect/insert.php';
	$stmt = $pdo->prepare("SELECT LastUpdated, SafeName FROM tbl_safe WHERE `ID` = :id ORDER BY LastUpdated DESC");
	$stmt->bindParam(':id',$safeid, PDO::PARAM_INT);
	$stmt->execute();

	$safe = '';
	if($stmt->rowCount()>0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $safes){ $safe .= $safes["LastUpdated"].$safes["SafeName"]."~";}
		$history = '<button title="History" class="btn_safess">		<img src="r/svg/safes.svg" alt="History"></button>';
	}else{$history ='';}
	
	if(isset($_POST["id"])){echo $safe;}
?>