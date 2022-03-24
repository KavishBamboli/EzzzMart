<?php
	header('Access-Control-Allow-Origin: *');

	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT Username FROM users WHERE UserId = ?";

	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("i", $_GET['userId']);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($username);
	$stmt->fetch();
	$stmt->close();

	$arr = array('UserName' => $username);

	echo json_encode($arr); 
?>