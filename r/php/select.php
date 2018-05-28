<?php
$output =
'<all>';

$pages 	= explode(',',$page);
$qMarks = str_repeat('?,', count($pages) - 1) . '?';
$done   = array();

$stmt 	= $pdo->prepare("
	SELECT 	id, first_name, last_name, LastUpdated
	FROM 	tbl_sample
	WHERE 	`last_name`
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
		SELECT 		ID, first_name, last_name, LastUpdated
		FROM 		tbl_safe
		ORDER BY 	LastUpdated DESC)
	AS reorder
	WHERE `last_name`
	IN ($qMarks)
	GROUP BY `ID`
	ORDER BY ID ASC LIMIT 100");

$stmt->execute($pages);
if ($stmt->rowCount() > 0){
	$check = $stmt->fetchAll(PDO::FETCH_ASSOC);
	foreach($check as $encoded) {
		if(!in_array($encoded["ID"], $done)){
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