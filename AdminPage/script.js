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