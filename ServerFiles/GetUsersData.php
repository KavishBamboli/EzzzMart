<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM users where StoreID = " . $_GET['storeId'];

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$user = new Users();
	  	$user->userId = $row["UserID"];
	  	$user->userName = $row["UserName"];
	  	$user->password = $row["Password"];
	  	$user->role = $row["Role"];
	  	array_push($arr, $user);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);
	class Users
	{
		public $userId;
		public $userName;
		public $password;
		public $role;
	}
	$mysqli->close();
?>