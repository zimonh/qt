<?php
include '../connect/insert.php';
$date = $_POST["date"];
$name = $_POST["name"];
$stmt = $pdo->prepare("UPDATE save_tbl SET save_name = :name WHERE `last_updated` = :date");
$stmt->bindParam(':date',$date, PDO::PARAM_STR);
$stmt->bindParam(':name',$name, PDO::PARAM_STR);
$stmt->execute();
?>