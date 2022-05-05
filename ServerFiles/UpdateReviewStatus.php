<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

    $id = $_GET["id"];
	$status = $_GET["status"];

	$sql = "UPDATE customer_feedback set isAddressed = '$status' where ReviewID = '$id'";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Success";
	}

	$mysqli->close();
?>