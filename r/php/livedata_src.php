<?php
include '../connect/select.php';

if(isset($page)){		$pages = explode(',',$page);
}else{					$pages = explode(',',$_POST["page"]);}

$qMarks = str_repeat('?,', count($pages) - 1) . '?';
$stmt = $pdo->prepare("
	SELECT 	LastUpdated, id
	FROM 	tbl_sample
	WHERE 	`last_name`
	IN 		($qMarks)
	ORDER BY id ASC");

$stmt->execute($pages);
if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $row) {
		$output .= '
	<ld title="'.$row["id"].'">'.substr($row["LastUpdated"],11,8).'</ld>';
	}
}
?>