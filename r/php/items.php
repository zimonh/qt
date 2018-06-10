<?php

if($save_mode){					$decoded = str_replace($readable, $unreadable, $encoded["html_blob"]);
								$dec = '<code>'.$decoded.'</code>';
								$hide=' style="display:none;"';
}else{							$dec = $decoded["html_blob"]; $hide = '';}

if(isset($encoded["id"])){		$id = $encoded["id"];
}else{							$id = $encoded["save_id"];}

include 'r/ajax/saves.php';

$output .= '
<qt><tq id="html'.$id.'"'.$hide.'>


'.$dec.'


</tq><button id="bu'.$id.'" class="qt_btn" title="'.$encoded["last_updated"].'">'.$id.'</button></qt>';

$output2 .= $id.'$'.$encoded["page_name"].'$'.$save.'$'.$encoded["last_updated"].'*';

?>