function getEmployeeById() {
    var employeeId = document.getElementById("search").value;

	if(/^\d+$/.test(employeeId))
	{
		const xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if(this.readyState == 4 && this.status == 200)
			{
				if(this.responseText == "0 results")
				{
					alert("No results found!");
				}
				else
				{
					var employeeData = JSON.parse(this.responseText);
					displayEmployeeData(employeeData);
					var searchResult = document.getElementsByClassName("search-results-box")[0];
					searchResult.style.display = "block";

					var tableWrapper = document.getElementsByClassName("table-wrapper")[0];
					tableWrapper.style.display = "none";
				}
			}
		}
		xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetEmployeeDetails.php?employeeId="+employeeId+"");
		xhttp.send();
	}
	else
		alert("Invalid Employee ID. It should contain only numbers");
}

function getAllEmployees()
{
    const xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if(this.readyState == 4 && this.status == 200)
		{
			if(this.responseText == "0 results")
			{
				alert("No results found!");
			}
			else
			{
				var employeesData = JSON.parse(this.responseText);
                for (let index = 0; index < employeesData.length; index++) {
                    displayEmployeeRecord(employeesData[index]);
                }
                var tableWrapper = document.getElementsByClassName("table-wrapper")[0];
                tableWrapper.style.display = "block";
                
                var searchResult = document.getElementsByClassName("search-results-box")[0];
                searchResult.style.display = "none";
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetAllEmployeeDetails.php?");
	xhttp.send();
}

function displayEmployeeRecord(empObj)
{
    var table = document.getElementsByClassName("records")[0].children[0];
	var row = document.createElement("tr");
	row.classList.add("record");
	var empId = document.createElement("td");
	empId.innerHTML = empObj.employeeId;
	row.appendChild(empId);
	var empName = document.createElement("td");
	empName.innerHTML = empObj.employeeName;
	row.appendChild(empName);
	var addressLine1 = document.createElement("td");
	addressLine1.innerHTML = empObj.addressLine1;
	row.appendChild(addressLine1);
	var addressLine2 = document.createElement("td");
    addressLine2.innerHTML = empObj.addressLine2;
	row.appendChild(addressLine2);
	var accNo = document.createElement("td");
	accNo.innerHTML = empObj.accNo;
	row.appendChild(accNo);
	var salary = document.createElement("td");
	salary.innerHTML = empObj.salary;
	row.appendChild(salary);
	var contactNo = document.createElement("td");
	contactNo.innerHTML = empObj.contactNo;
	row.appendChild(contactNo);
	var role = document.createElement("td");
	role.innerHTML = empObj.role;
	row.appendChild(role);
	table.appendChild(row);
}

function displayEmployeeData(empObj) {
    var particulars = document.getElementsByClassName("particular");

    for (let index = 0; index < particulars.length; index++) {
        particulars[index].children[1].innerHTML = Object.values(empObj)[index];
    }
}

function populateHeader() {
	var userName = sessionStorage.getItem("userName");
	var storeName = sessionStorage.getItem("storeName");
	var storename = document.getElementsByClassName("company-name")[0].children[1];
	storename.innerHTML = storeName;
	var username = document.getElementsByClassName("username")[0].children[1];
	username.innerHTML = userName;
}