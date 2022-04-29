<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM store_details where StoreID = " . $_GET['storeId'];

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$store = new Store();
	  	$store->storeId = $row["StoreID"];
	  	$store->storeName = $row["StoreName"];
	  	$store->addressLine1 = $row["AddressLine1"];
	  	$store->addressLine1 = $row["AddressLine2"];
	  	$store->logo = $row["Logo"];
	  	$store->gstNo = $row["GstNo"];
	  	$store->emailID = $row["EmailID"];
	  	$store->contactNo = $row["ContactNo"];
	  	echo json_encode($store);
	  }
	} else {
	  echo "0 results";
	}
	class Store
	{
		public $storeId;
		public $storeName;
		public $addressLine1;
		public $addressLine2;
		public $logo;
		public $gstNo;
        public $emailID;
        public $contactNo;
	}
	$mysqli->close();
?>