<?php
$output = '
<alivedata>';
include 'r/php/livedata_src.php';
$output .= '
</alivedata>';
$output .= '
<blivedata>';
include 'r/php/livedata_src.php';
$output .= '
</blivedata>';
echo $output;
?>