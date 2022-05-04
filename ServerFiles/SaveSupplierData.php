<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$name = $_GET["name"];
	$city =  $_GET["city"];
	$gstNo = $_GET["gstNo"];
	$accNo = $_GET["accNo"];

	$sql = "INSERT INTO supplier (SupplierName, City, GstNo, BankAccNo, TotalCredit) values ('$name', '$city', '$gstNo', '$accNo', 0)";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Success";
	}

	$mysqli->close();
?>