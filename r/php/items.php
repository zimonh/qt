<?php

if($save_mode){					$decoded = str_replace($readable, $unreadable, $encoded["first_name"]);
								$dec = '<code>'.$decoded.'</code>';
								$hide=' style="display:none;"';
}else{							$dec = $decoded["first_name"]; $hide = '';}

if(isset($encoded["id"])){		$id = $encoded["id"];
}else{							$id = $encoded["ID"];}

include 'r/ajax/safes.php';

$output .= '
<qt><tq id="html'.$id.'"'.$hide.'>


'.$dec.'


</tq><button id="bu'.$id.'" class="qt_btn" title="'.$encoded["LastUpdated"].'">'.$id.'</button></qt>';

$output2 .= $id.'$'.$encoded["last_name"].'$'.$safe.'$'.$encoded["LastUpdated"].'*';

?>