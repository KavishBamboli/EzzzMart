<?php

	header('Access-Control-Allow-Origin: *');

	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT SaleId, Date, Customer_Name, BillAmount, OnlineSale, BilledBy
			FROM sales WHERE Date between ? and ?";

	$stmt = $mysqli->prepare($sql);
	$stmt->bind_param("ss", $_GET['startDate'], $_GET['endDate']);
	$stmt->execute();
	$stmt->store_result();
	$stmt->bind_result($saleId, $date, $cname, $billAmt, $onlineSale, $billedBy);
	$stmt->fetch();
	$stmt->close();

	$arr = array('SaleId' => $saleId, 'Date' => $date, 'CustomerName' => $cname, 'BillAmount' => $billAmt, 'OnlineSale' => $onlineSale, 'BillAmt' => $billedBy);

	echo json_encode($arr);
?>