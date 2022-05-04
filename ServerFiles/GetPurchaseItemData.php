<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM purchaseitem where PurchaseID = " . $_GET['purchaseId'];

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$purchaseItem = new PurchaseItem();
	  	$purchaseItem->id = $row["PurchaseID"];
	  	$purchaseItem->productId = $row["ProductID"];
	  	$purchaseItem->quantityPurchased = $row["QuantityPurchased"];
	  	$purchaseItem->costPrice = $row["CostPrice"];
	  	array_push($arr, $purchaseItem);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);

	class PurchaseItem
	{
		public $id;
		public $productId;
		public $quantityPurchased;
		public $costPrice;
	}
	$mysqli->close();
?>