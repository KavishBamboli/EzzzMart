<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM salesitem where SaleId = " . $_GET['saleId'];

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$saleItem = new SalesItem();
	  	$saleItem->saleId = $row["SaleID"];
	  	$saleItem->productId = $row["ProductID"];
	  	$saleItem->quantitySold = $row["QuantitySold"];
	  	$saleItem->sellingPrice = $row["SellingPrice"];
	  	array_push($arr, $saleItem);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);
	class SalesItem
	{
		public $saleId;
		public $productId;
		public $quantitySold;
		public $sellingPrice;
	}
	$mysqli->close();
?>