<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "phppractice");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM kavish";

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$sale = new Sales();
	  	$sale->id = $row["id"];
	  	$sale->fname = $row["firstname"];
	  	$sale->lname = $row["lastname"];
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