<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM purchase where Date between '" . $_GET['startDate'] . "' and '" . $_GET['endDate'] . "'";

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$purchase = new Purchase();
	  	$purchase->id = $row["PurchaseID"];
	  	$purchase->date = $row["Date"];
	  	$purchase->supplierId = $row["SupplierID"];
	  	$purchase->purchaseAmt = $row["PurchaseAmount"];
	  	$purchase->deliveredBy = $row["DeliveredBy"];
	  	$purchase->paid = $row["Paid"];
	  	array_push($arr, $purchase);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);

	class Purchase
	{
		public $id;
		public $date;
		public $supplierId;
		public $purchaseAmt;
		public $deliveredBy;
		public $paid;
	}
	$mysqli->close();
?>