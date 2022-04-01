<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "Ansh@2002", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM sales where Date between '" . $_GET['startDate'] . "' and '" . $_GET['endDate'] . "'";

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$sale = new Sales();
	  	$sale->id = $row["SaleId"];
	  	$sale->fname = $row["Date"];
	  	$sale->lname = $row["Customer_Name"];
	  	array_push($arr, $sale);
	  }
	} else {
	  echo "0 results";
	}
	echo json_encode($arr);
	class Sales
	{
		public $id;
		public $fname;
		public $lname;
	}
	$mysqli->close();
?>