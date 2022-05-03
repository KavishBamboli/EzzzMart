<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM supplier";

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$supplier = new Supplier();
	  	$supplier->id = $row["SupplierID"];
	  	$supplier->name = $row["SupplierName"];
	  	$supplier->city = $row["City"];
	  	$supplier->gstNo = $row["GstNo"];
	  	$supplier->accNo = $row["BankAccNo"];
	  	$supplier->totalCredit = $row["TotalCredit"];
	  	array_push($arr, $supplier);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);

	class Supplier
	{
		public $id;
		public $name;
		public $city;
		public $gstNo;
		public $accNo;
		public $totalCredit;
	}
	$mysqli->close();
?>