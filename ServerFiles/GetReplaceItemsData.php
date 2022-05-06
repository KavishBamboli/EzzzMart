<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM replaceitems";

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$item = new StockItem();
	  	$item->id = $row["ItemId"];
	  	$item->reason = $row["Reason"];
	  	array_push($arr, $item);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);

    class StockItem
    {
        public $id;
        public $reason;
    }
	$mysqli->close();
?>