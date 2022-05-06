<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$name = $_GET["name"];
	$taxCode = $_GET["taxCode"];
	$costPrice =  $_GET["costPrice"];
	$sellingPrice = $_GET["sellingPrice"];
	$quantity = $_GET["quantity"];
	$supplierId = $_GET["supplierId"];

	$sql = "INSERT INTO inventory (ProductName, TaxCode, CostPrice, SellingPrice, QuantityinStock, SupplierID) values ('$name', '$taxCode', $costPrice, $sellingPrice, $quantity, $supplierId)";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Success";
	}

	$mysqli->close();
?>