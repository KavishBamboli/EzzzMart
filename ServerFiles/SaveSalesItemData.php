<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$saleId = $_GET["saleId"];
	$productId = $_GET["productId"];
	$quantitySold =  $_GET["quantity"];
	$sellingPrice = $_GET["sellingPrice"];

	$sql = "INSERT INTO salesitem values ($saleId, $productId, $quantitySold, $sellingPrice)";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Record inserted successfully";
	}

	$mysqli->close();
?>