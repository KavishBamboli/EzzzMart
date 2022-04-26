<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$saleId = $_GET["saleId"];
	$date = $_GET["date"];
	$customerName =  $_GET["customerName"];
	$billAmt = $_GET["billAmt"];
	$onlineSale = $_GET["onlineSale"];
	$salesChannel = $_GET["salesChannel"];
	$billedBy = $_GET["billedBy"];

	$sql = "INSERT INTO sales values ($saleId, '$date', '$customerName', $billAmt, '$onlineSale', '$salesChannel', '$billedBy')";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Record inserted successfully";
	}

	$mysqli->close();
?>