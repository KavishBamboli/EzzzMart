<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$date = $_GET["date"];
	$supplierId =  $_GET["supplierId"];
	$purchaseAmt = $_GET["purchaseAmt"];
	$deliveredBy = $_GET["deliveredBy"];
	$paid = $_GET["paid"];

	$sql = "INSERT INTO purchase (Date, SupplierID, PurchaseAmount, DeliveredBy, Paid) values ('$date', '$supplierId', $purchaseAmt, '$deliveredBy', '$paid')";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Success";
	}

	$mysqli->close();
?>