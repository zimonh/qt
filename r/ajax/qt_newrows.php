<?php

include '../connect/select.php';

$page = $_POST["page"];
$pages = explode(',',$page);
$qMarks = str_repeat('?,',count($pages)-1).'?';

$id = $_POST["ids"];
$ids = explode(',',$id);

$stmt = $pdo->prepare("SELECT id, html_blob, last_updated FROM html_tbl  WHERE `page_name` IN ($qMarks) ORDER BY id ASC");

$stmt->execute($pages);

if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $encoded) {
		if(!in_array($encoded["id"], $ids)){
			$output .= $encoded["id"].'$'.substr($encoded["last_updated"],11,8).'$'.$encoded["html_blob"].'*';
		}
	}
}

	echo $output;

?>