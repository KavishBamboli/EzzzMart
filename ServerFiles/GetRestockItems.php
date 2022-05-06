<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM inventory where QuantityinStock <= 10";

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$item = new StockItem();
	  	$item->productId = $row["ProductID"];
	  	$item->quantityInStock = $row["QuantityinStock"];
	  	array_push($arr, $item);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);

    class StockItem
    {
        public $productId;
        public $quantityInStock;
    }
	$mysqli->close();
?>