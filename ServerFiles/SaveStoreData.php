<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$storeName = $_GET["storeName"];
	$email = $_GET["email"];
	$address =  $_GET["address"];
	$gst =  $_GET["gst"];
	$contact =  $_GET["contact"];

	$sql = "INSERT INTO store_details (StoreName, AddressLine1, GstNo, EmailID, ContactNo) values ('$storeName', '$address', '$gst', '$email', $contact)";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Record inserted successfully";
	}
    else
    {
        echo "Failed";
    }

	$mysqli->close();
?>