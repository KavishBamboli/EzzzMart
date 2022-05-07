<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$storeId = $_GET["id"];
	$username = $_GET["username"];
	$password =  $_GET["password"];
	$role =  $_GET["role"];

	$sql = "INSERT INTO users (StoreID, UserName, Password, Role) values ($storeId, '$username', '$password', '$role')";

	if($mysqli->query($sql) === TRUE)
	{
		echo "Success";
	}
    else
    {
        echo "Failed";
    }

	$mysqli->close();
?>