<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM sales where SaleId = " . $_GET['saleId'];

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$sale = new Sales();
	  	$sale->saleId = $row["SaleId"];
	  	$sale->date = $row["Date"];
	  	$sale->customerName = $row["Customer_Name"];
	  	$sale->billAmt = $row["BillAmount"];
	  	$sale->isOnlineSale = $row["OnlineSale"];
	  	$sale->salesChannel = $row["SalesChannel"];
	  	$sale->billedBy = $row["BilledBy"];
	  	echo json_encode($sale);
	  }
	} else {
	  echo "0 results";
	}
	class Sales
	{
		public $saleId;
		public $date;
		public $customerName;
		public $billAmt;
		public $isOnlineSale;
		public $salesChannel;
		public $billedBy;
	}
	$mysqli->close();
?>