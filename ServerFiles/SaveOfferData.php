<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$id = $_GET["id"];
	$type = $_GET["type"];
	$rate =  $_GET["rate"];
	$offerItemId = $_GET["offerItemId"];

	$sql = "INSERT INTO offers (ProductID, OfferType, DiscountRate, OfferedItem) values ($id, '$type', $rate, $offerItemId)";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Success";
	}

	$mysqli->close();
?>