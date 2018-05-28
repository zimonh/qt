<?php  

	include '../connect/token.php';

	if($status === "1"){
		
		include '../connect/insert.php';

		$html = trim($_POST["html"]);
		$page = $_POST["page"];
		
		if(isset($html) && $html !== ''){
		 			
			include '../translation.php';
			$encoded = str_replace($readable, $unreadable, $html);

			$page = preg_replace("/[^A-Za-z0-9_ ]/","",$page);
			$page = preg_replace("/( )/","_",$page);

			$stmt = $pdo->prepare("INSERT INTO tbl_sample(first_name, last_name) VALUES(:encoded, :page)");

			$stmt->bindParam(':encoded', $encoded, PDO::PARAM_STR);
			$stmt->bindParam(':page', $page, PDO::PARAM_STR);
			$stmt->execute();
			$inserted_id = $pdo->lastInsertId();
			date_default_timezone_set('CET');
		 	$inserted_date = date('H:i:s');
		 	echo $inserted_id.','.$inserted_date;
		}
	}
?>  