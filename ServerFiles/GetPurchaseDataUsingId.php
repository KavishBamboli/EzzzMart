<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM purchase where PurchaseID = " . $_GET['purchaseId'];

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
	  	echo json_encode($purchase);
	  }
	} else {
	  echo "0 results";
	}
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