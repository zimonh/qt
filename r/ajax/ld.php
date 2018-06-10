<?php
include '../connect/select.php';
if(isset($page)){
	$pages = explode(',',$page);
}else{
	$pages = explode(',',$_POST["page"]);
}

$qMarks = str_repeat('?,', count($pages) - 1) . '?';
$stmt = $pdo->prepare("SELECT last_updated, id FROM html_tbl WHERE `page_name` IN ($qMarks) ORDER BY id ASC");
$stmt->execute($pages);

if ($stmt->rowCount() > 0){

	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);

	foreach($check as $row) {

		$output .= substr($row["last_updated"],11,8).$row["id"].',';

	}
}
echo $output;
?>