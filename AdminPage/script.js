function loadData()
{
    loadMetrics();
    loadInventoryData();
    loadEmployeeData();
}

function loadMetrics()
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
                var salesData = JSON.parse(this.responseText);
                
                var customersMetric = document.getElementsByClassName("card-single")[0].children[0].children[0];
                customersMetric.innerHTML = salesData.length;

                var incomeMetric = document.getElementsByClassName("card-single")[2].children[0].children[0];
                var totalIncome = 0;
                for (let index = 0; index < salesData.length; index++) {
                    totalIncome += parseInt(salesData[index].billAmt);
                }
                incomeMetric.innerHTML = "Rs. " + totalIncome;
            }
        }
    }
    xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetAllSalesData.php");
    xhttp.send();
}

function loadInventoryData()
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
                var inventoryData = JSON.parse(this.responseText);
                
                for (let index = 0; index < 3; index++) {
                    var table = document.getElementsByTagName("table")[0].children[0];
                    var row = document.createElement("tr");
                    var itemName = document.createElement("td");
                    itemName.innerHTML = inventoryData[index].productName;
                    row.appendChild(itemName);
                    var quantity = document.createElement("td");
                    quantity.innerHTML = inventoryData[index].quantityInStock + " Pcs";
                    row.appendChild(quantity);
                    var price = document.createElement("td");
                    price.innerHTML = "Rs. " + inventoryData[index].costPrice + " Per Pc.";
                    row.appendChild(price);
                    table.appendChild(row);
                }

                var inventoryMetric = document.getElementsByClassName("card-single")[1].children[0].children[0];
                inventoryMetric.innerHTML = inventoryData.length;
            }
        }
    }
    xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetInventoryData.php");
    xhttp.send();
}

function loadEmployeeData()
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
                
                var employeesBox = document.getElementsByClassName("card-body")[1];
                var employee = document.getElementsByClassName("customer")[0];
                for (let index = 0; index < 3; index++) {
                    var newEmployee = employee.cloneNode(true);
                    newEmployee.children[0].children[0].children[0].innerHTML = employeesData[index].employeeName;
                    newEmployee.children[0].children[0].children[1].innerHTML = employeesData[index].role;
                    employeesBox.appendChild(newEmployee);
                }

                employee.style.display = "none";
            }
        }
    }
    xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetAllEmployeeDetails.php");
    xhttp.send();
}

var modal = document.getElementsByClassName("myModal");
var btn = document.getElementsByTagName("a");
var span = document.getElementsByClassName("close");

btn[2].onclick = function() {
    modal[0].style.display = "block";
}

btn[3].onclick = function() {
    modal[1].style.display = "block";
}

span[0].onclick = function() {
    modal[0].style.display = "none";
}

span[1].onclick = function() {
    modal[1].style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function saveEmployeeData()
{
    var name = document.getElementsByClassName("inputText")[0].value;
    var address1 = document.getElementsByClassName("inputText")[1].value;
    var address2 = document.getElementsByClassName("inputText")[2].value;
    var accNo = document.getElementsByClassName("inputText")[3].value;
    var salary = document.getElementsByClassName("inputText")[4].value;
    var contactNo = document.getElementsByClassName("inputText")[5].value;
    var role = document.getElementsByClassName("inputText")[6].value;
    var password = document.getElementsByClassName("inputText")[7].value;

    if(name == "" || address1 == "" || accNo == "" || salary == "" || contactNo == "" || role == "" || password == "")
        alert("Please fill in all the fields");
    else
    {
        const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if(this.responseText == "Success")
            {
				alert("New employee inserted successfully");
                saveUserData(name, password, role);
                location.reload();
            }
			else
				alert("There were some errors in insertion of records");
		}
		xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveNewEmployeeData.php?storeId="+sessionStorage.getItem("StoreId")+"&name="+name+"&address1="+address1+"&address2="+address2+"&accNo="+accNo+"&salary="+salary+"&contactNo="+contactNo+"&role="+role+"");
		xhttp.send();
    }
}

function saveUserData(name, password, role)
{
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
    }
    xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveEmployeeData.php?id="+sessionStorage.getItem("StoreId")+"&username="+name+"&password="+password+"&role="+role+"");
    xhttp.send();
}

function changePassword()
{
    var password = document.getElementsByClassName("inputText")[8].value;
    var confirmPassword = document.getElementsByClassName("inputText")[9].value;

    if(password == confirmPassword)
    {
        const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if(this.responseText == "Success")
            {
				alert("Password changed successfully");
                location.reload();
            }
			else
                console.log(this.responseText);
				// alert("There were some errors in changing the password");
		}
		xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/UpdateAdminPassword.php?storeId="+sessionStorage.getItem("StoreId")+"&password="+password+"");
		xhttp.send();
    }
    else
        alert("Password and confirm password does not match");
}