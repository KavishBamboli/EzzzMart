<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

    $storeId = $_GET["storeId"];
    $name = $_GET["name"];
    $addr1 = $_GET["address1"];
    $addr2 = $_GET["address2"];
    $accNo = $_GET["accNo"];
    $salary = $_GET["salary"];
    $contactNo = $_GET["contactNo"];
	$role =  $_GET["role"];

	$sql = "INSERT INTO employee (StoreId, EmployeeName, AddressLine1, AddressLine2, BankAccNo, Salary, ContactNo, Role) values ($storeId, '$name', '$addr1', '$addr2', '$accNo', '$salary', $contactNo, '$role')";

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