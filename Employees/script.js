function getEmployeeById() {
    var employeeId = document.getElementById("search").value;
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
                if(employeeData.role == "Cashier")
                {
                    var cashierDiv = document.getElementById("cashiers");
                    cashierDiv.style.display = "block";
                    displayEmployeeData(employeeData);
                }
                else if(employeeData.role == "Manager")
                {
                    var managerDiv = document.getElementById("managers");
                    managerDiv.style.display = "block";
                    displayEmployeeData(employeeData);
                }
                else if(employeeData.role == "Part time")
                {
                    var partTimeDiv = document.getElementById("part-time");
                    partTimeDiv.style.display = "block";
                    displayEmployeeData(employeeData);
                }
                var nav = document.getElementsByTagName("nav")[0];
                nav.style.display = "block";
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetEmployeeDetails.php?employeeId="+employeeId+"");
	xhttp.send();
}

function displayEmployeeData(empObj) {
    var menu = document.getElementsByClassName("empMenu")[0];
    var lastEmployeeRecord = document.getElementsByClassName("employeeRecord")[document.getElementsByClassName.length-1];

    var newEmployee = lastEmployeeRecord.cloneNode(lastEmployeeRecord);
    newEmployee.children[0].innerHTML = empObj.employeeName + "<span class='fas fa-caret-down'></span>";
    newEmployee.children[0].setAttribute("for", "btn-" + (menu.children.length + 2));
    newEmployee.children[1].setAttribute("id", "btn-" + (menu.children.length + 2));
    newEmployee.children[2].children[0].children[0].innerHTML += empObj.employeeId;
    newEmployee.children[2].children[1].children[0].innerHTML += empObj.addressLine1;
    newEmployee.children[2].children[2].children[0].innerHTML += empObj.addressLine2;
    newEmployee.children[2].children[3].children[0].innerHTML += empObj.accNo;
    newEmployee.children[2].children[4].children[0].innerHTML += empObj.salary;
    newEmployee.children[2].children[5].children[0].innerHTML += empObj.contactNo;
    menu.children[0].style.display = "none";
    menu.appendChild(newEmployee);
}

function populateHeader() {
	var userName = sessionStorage.getItem("userName");
	var storeName = sessionStorage.getItem("storeName");
	var storename = document.getElementsByClassName("company-name")[0].children[1];
	storename.innerHTML = storeName;
	var username = document.getElementsByClassName("username")[0].children[1];
	username.innerHTML = userName;
}