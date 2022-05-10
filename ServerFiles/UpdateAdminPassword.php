<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

    $password = $_GET["password"];
	$storeId = $_GET["storeId"];

	$sql = "UPDATE users set Password = '$password' where StoreId = '$storeId' AND UserName = 'admin'";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Success";
	}

	$mysqli->close();
?>