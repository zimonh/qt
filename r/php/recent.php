<?php

$output .= '
const recenty = "';

if($save_mode){

	include 'r/connect/insert.php';

	$stmt = $pdo->prepare("
		SELECT DISTINCT last_name
		FROM tbl_sample
		WHERE `last_name`
		NOT LIKE '%Secret%'
		ORDER BY LastUpdated DESC");
	$stmt->execute();

	$live   = array();
	if ($stmt->rowCount() > 0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $row) {
			$live[] = $row["last_name"];
		}
	}

	$stmt = $pdo->prepare("
		SELECT DISTINCT	last_name
		FROM tbl_safe
		WHERE `last_name`
		NOT LIKE '%Secret%'
		ORDER BY LastUpdated DESC");
	$stmt->execute();

	if ($stmt->rowCount() > 0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $row) {
			if(!in_array($row["last_name"],$live)){
				$output .= $row["last_name"].',';
			}


		}
	}


}else{

	include 'r/connect/select.php';

	$stmt = $pdo->prepare("
		SELECT DISTINCT last_name
		FROM tbl_sample
		WHERE `last_name`
		NOT LIKE '%Secret%'
		ORDER BY LastUpdated DESC");

	$stmt->execute();

	if ($stmt->rowCount() > 0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $row) {
			$output .= $row["last_name"].',';
		}
	}
}



$output .= '";
</script>';
echo $output;
?>