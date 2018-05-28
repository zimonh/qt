<?php
include '../connect/insert.php';
$date = $_POST["date"];
$name = $_POST["name"];
$stmt = $pdo->prepare("UPDATE tbl_safe SET SafeName = :name WHERE `LastUpdated` = :date");
$stmt->bindParam(':date',$date, PDO::PARAM_STR);
$stmt->bindParam(':name',$name, PDO::PARAM_STR);
$stmt->execute();
?>