<?php
	header('Access-Control-Allow-Origin: *');
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM employee where EmployeeID = " . $_GET['employeeId'];

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$employee = new Employee();
	  	$employee->employeeId = $row["EmployeeID"];
	  	$employee->employeeName = $row["EmployeeName"];
	  	$employee->addressLine1 = $row["AddressLine1"];
	  	$employee->addressLine2 = $row["AddressLine2"];
	  	$employee->accNo = $row["BankAccNo"];
	  	$employee->salary = $row["Salary"];
	  	$employee->contactNo = $row["ContactNo"];
	  	$employee->role = $row["Role"];
	  	echo json_encode($employee);
	  }
	} else {
	  echo "0 results";
	}
	class Employee
	{
		public $employeeId;
		public $employeeName;
		public $addressLine1;
		public $addressLine2;
		public $accNo;
		public $salary;
		public $contactNo;
        public $role;
	}
	$mysqli->close();
?>