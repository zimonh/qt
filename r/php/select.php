<?php
$output =
'<all>';

$pages 	= explode(',',$page);
$qMarks = str_repeat('?,', count($pages) - 1) . '?';
$done   = array();

$stmt 	= $pdo->prepare("
	SELECT 	id, html_blob, page_name, last_updated
	FROM 	html_tbl
	WHERE 	`page_name`
	IN 		($qMarks)
	ORDER BY id ASC");
$stmt->execute($pages);
if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $encoded) {
		$decoded = str_replace($unreadable, $readable, $encoded);
		include 'r/php/items.php';
		$done[] = $encoded['id'];
	}
}
unset($encoded);unset($decoded);

if($save_mode){
	$output .= '
<allsave>';
$stmt = $pdo->prepare("
	SELECT reorder.*
	FROM (
		SELECT 		save_id, html_blob, page_name, last_updated
		FROM 		save_tbl
		ORDER BY 	last_updated DESC)
	AS reorder
	WHERE `page_name`
	IN ($qMarks)
	GROUP BY `save_id`
	ORDER BY save_id ASC LIMIT 100");

$stmt->execute($pages);
if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $encoded) {
		if(!in_array($encoded["save_id"], $done)){
			$decoded = str_replace($unreadable, $readable, $encoded);
			include 'r/php/items.php';
		}
	}
}

$output .= '
</allsave>';
}


$output .= '
</all>';
echo $output.'
<inmenu_result></inmenu_result>
<script>
const qt_buttons = "'.$output2.'";';
unset($output);
include 'r/php/recent.php';
?>