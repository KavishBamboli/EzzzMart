var purchaseId = document.getElementById("search");
var today = new Date();
var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
startDate.value = today.toISOString().substr(0, 10);
endDate.value = today.toISOString().substr(0, 10);

function populateHeader() {
	var userName = sessionStorage.getItem("userName");
	var storeName = sessionStorage.getItem("storeName");
	var storename = document.getElementsByClassName("company-name")[0].children[1];
	storename.innerHTML = storeName;
	var username = document.getElementsByClassName("username")[0].children[1];
	username.innerHTML = userName;
    displayPaymentDues();
}

function displayPaymentDues()
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
				var suppliersData = JSON.parse(this.responseText);
                var totalAmountDue = 0;
                suppliersData.sort((a,b) => b.totalCredit - a.totalCredit);
                for (let index = 0; index < 3; index++) {
                    if(suppliersData[index].totalCredit != 0)
                    {
                        var table = document.getElementById("supplier");
                        var row = document.createElement("tr");
                        row.classList.add("record");
                        var id = document.createElement("td");
                        id.innerHTML = suppliersData[index].id;
                        row.appendChild(id);
                        var name = document.createElement("td");
                        name.innerHTML = suppliersData[index].name;
                        row.appendChild(name);
                        var totalDue = document.createElement("td");
                        totalDue.innerHTML = suppliersData[index].totalCredit;
                        row.appendChild(totalDue);
                        table.appendChild(row);
                        totalAmountDue += parseFloat(suppliersData[index].totalCredit);
                    }
                }
                var totalDueMetric = document.getElementsByClassName("metric-content")[0].children[1];
                totalDueMetric.innerHTML = "Rs. " + totalAmountDue;
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetSuppliersData.php");
	xhttp.send();
}

function executeSearch() {
    var responseObj;
	var table = document.getElementsByClassName("records")[0];

	for(var i = 1; i < table.children[0].childElementCount; i++)
	{
		table.children[0].removeChild(table.children[0].children[i]);
	}
	if(purchaseId.value == '')
	{
		if(endDate.value > today.toISOString().substr(0, 10))
		{
			alert("End date cannot be greater than today");
			endDate.value = today.toISOString().substr(0, 10);
		}
		else if(startDate.value > endDate.value)
		{
			alert("Start date cannot be greater than or equal to the end date");
			startDate.value = today.toISOString().substr(0, 10);
			endDate.value = today.toISOString().substr(0, 10);
		}
		else
		{
			// Call php file to get data
			const xhttp = new XMLHttpRequest();
			xhttp.onload = function() {
				if(this.responseText == "0 results")
				{
					alert("No results found!");
				}
				else
				{
					responseObj = JSON.parse(this.responseText);
					for(var i = 0; i < responseObj.length; i++)
					    displayDetails(responseObj[i]);
                    var tableWrapper = document.getElementsByClassName("tableWrapper")[0];
                    tableWrapper.style.display = "block";
				}
			}
			xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetPurchaseData.php?startDate="+startDate.value+"&endDate="+endDate.value+"");
			xhttp.send();
		}
	}
	else
	{
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if(this.responseText == "0 results")
			{
				alert("No results found!");
			}
			else
			{
				responseObj = JSON.parse(this.responseText);
				displayDetails(responseObj);
                var tableWrapper = document.getElementsByClassName("tableWrapper")[0];
                tableWrapper.style.display = "block";
			}
		}
		xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetPurchaseDataUsingId.php?purchaseId="+purchaseId.value+"");
		xhttp.send();
	}
}

function displayDetails(purchaseDetail)
{
    var table = document.getElementsByClassName("records")[0].children[0];
	var row = document.createElement("tr");
	row.classList.add("record");
	var date = document.createElement("td");
	date.innerHTML = purchaseDetail.date;
	row.appendChild(date);
	var purchaseId = document.createElement("td");
	purchaseId.innerHTML = purchaseDetail.id;
	row.appendChild(purchaseId);
	var supplierId = document.createElement("td");
	supplierId.innerHTML = purchaseDetail.supplierId;
	row.appendChild(supplierId);
	var amt = document.createElement("td");
	amt.innerHTML = purchaseDetail.purchaseAmt;
	row.appendChild(amt);
	var deliveredBy = document.createElement("td");
	deliveredBy.innerHTML = purchaseDetail.deliveredBy;
	row.appendChild(deliveredBy);
	var paid = document.createElement("td");
	paid.innerHTML = purchaseDetail.paid;
	row.appendChild(paid);
	table.appendChild(row);
}

var modal = document.getElementsByClassName("myModal");
var btn = document.getElementsByClassName("panel-btn");
var span = document.getElementsByClassName("close");

for (let index = 0; index < btn.length; index++) {
	btn[index].onclick = function() {
		modal[index].style.display = "block";
	}
	span[index].onclick = function() {
		modal[index].style.display = "none";
	}
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function savePurchaseData()
{
	var date = document.getElementsByClassName("inputText")[0].value;
	var supplierId = document.getElementsByClassName("inputText")[1].value;
	var amt = document.getElementsByClassName("inputText")[2].value;
	var deliveredBy = document.getElementsByClassName("inputText")[3].value;
	var paid;
	if(document.getElementsByClassName("inputText")[4].checked)
		paid = "Yes";
	else
		paid = "No";

	if(date == "" || supplierId == "" || amt == "" || deliveredBy == "" || paid == "")
		alert("Please fill out all the fields");
	else
	{
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if(this.responseText == "Success")
				alert("Purchase record inserted successfully");
			else
				alert("There were some errors in insertion of records");
		}
		xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SavePurchaseData.php?date="+date+"&supplierId="+supplierId+"&purchaseAmt="+amt+"&deliveredBy="+deliveredBy+"&paid="+paid+"");
		xhttp.send();
	}
}

function saveSupplierData()
{
	var supplierName = document.getElementsByClassName("inputText")[6].value;
	var city = document.getElementsByClassName("inputText")[7].value;
	var gstNo = document.getElementsByClassName("inputText")[8].value;
	var accNo = document.getElementsByClassName("inputText")[9].value;

	if(supplierName == "" || city == "" || gstNo == "" || accNo == "")
		alert("Please fill out all the fields");
	else
	{
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
			if(this.responseText == "Success")
				alert("Supplier record inserted successfully");
			else
				alert("There were some errors in insertion of records");
		}
		xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveSupplierData.php?name="+supplierName+"&city="+city+"&gstNo="+gstNo+"&accNo="+accNo+"");
		xhttp.send();
	}
}