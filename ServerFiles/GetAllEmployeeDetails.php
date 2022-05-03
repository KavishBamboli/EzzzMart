<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM employee";

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
	  	array_push($arr, $employee);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);

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