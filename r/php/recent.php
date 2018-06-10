<?php

$output .= '
const recenty = "';

if($save_mode){

	include 'r/connect/insert.php';

	$stmt = $pdo->prepare("
		SELECT DISTINCT page_name
		FROM html_tbl
		WHERE `page_name`
		NOT LIKE '%Secret%'
		ORDER BY last_updated DESC");
	$stmt->execute();

	$live   = array();
	if ($stmt->rowCount() > 0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $row) {
			$live[] = $row["page_name"];
		}
	}

	$stmt = $pdo->prepare("
		SELECT DISTINCT	page_name
		FROM save_tbl
		WHERE `page_name`
		NOT LIKE '%Secret%'
		ORDER BY last_updated DESC");
	$stmt->execute();

	if ($stmt->rowCount() > 0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $row) {
			if(!in_array($row["page_name"],$live)){
				$output .= $row["page_name"].',';
			}


		}
	}


}else{

	include 'r/connect/select.php';

	$stmt = $pdo->prepare("
		SELECT DISTINCT page_name
		FROM html_tbl
		WHERE `page_name`
		NOT LIKE '%Secret%'
		ORDER BY last_updated DESC");

	$stmt->execute();

	if ($stmt->rowCount() > 0){
		$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
		foreach($check as $row) {
			$output .= $row["page_name"].',';
		}
	}
}



$output .= '";
</script>';
echo $output;
?>