<?php
	header('Access-Control-Allow-Origin: *');

	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT Username FROM users WHERE UserId = " . $_GET['userId'];

	$result = $mysqli->query($sql);
	$row = $result->fetch_assoc();

	$arr = array('UserName' => $row["Username"]);

	echo json_encode($arr); 
?>