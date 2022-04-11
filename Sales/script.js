var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var searchSaleId = document.getElementById("search");
var salesDetails = document.getElementById("sales-details");

var today = new Date();
startDate.value = today.toISOString().substr(0, 10);
endDate.value = today.toISOString().substr(0, 10);

function executeSearch() {
	var responseObj;
	if(searchSaleId.value == '')
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
					displayDetails(responseObj);
					calculateMetrics(responseObj);
				}
			}
			xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetSalesData.php?searchType=date&startDate="+startDate.value+"&endDate="+endDate.value+"");
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
			}
		}
		xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetSalesDataUsingId.php?searchType=date&saleId="+searchSaleId.value+"");
		xhttp.send();
	}
	
}

function getSalesTarget() {
	// Get Sales target from database
}

function updateProgressBar() {
	var totalMonthlySales = 0;
	var salesTarget = getSalesTarget();
	var month = today.getMonth() + 1;
	console.log(month);

	var salesData = null; // get data from database;
	for (var i = 0; i < salesData.length; i++) {
		totalMonthlySales += salesData[i]['SalesAmount'];
	}

	var progressBar = document.getElementById('progress-bar')
	progressBar.value = totalMonthlySales / salesTarget * 100;
}

function calculateMetrics(responseObj) {
	var metrics = document.getElementsByClassName("metric-content");
	var totalRevenue = 0, totalInvoices = 0;
	for (var i = 0; i < responseObj.length; i++) {
		totalRevenue += parseFloat(responseObj[i].billAmt);
		totalInvoices += 1;
	}
	metrics[0].children[1].innerHTML = "Rs. " + totalRevenue;
	metrics[2].children[1].innerHTML = totalInvoices;
}

function displayDetails(responseObj) {	
	var table = document.getElementsByClassName("records")[0].children[0];
	for (var i = 0; i < responseObj.length; i++) {
		var row = document.createElement("tr");
		row.classList.add("record");
		var date = document.createElement("td");
		date.innerHTML = responseObj[i].date;
		row.appendChild(date);
		var saleId = document.createElement("td");
		saleId.innerHTML = responseObj[i].saleId;
		row.appendChild(saleId);
		var customerName = document.createElement("td");
		customerName.innerHTML = responseObj[i].customerName;
		row.appendChild(customerName);
		var itemsSold = document.createElement("td");
		fetchSalesItems(itemsSold, responseObj[i].saleId);
		row.appendChild(itemsSold);
		var billAmt = document.createElement("td");
		billAmt.innerHTML = responseObj[i].billAmt;
		row.appendChild(billAmt);
		var isOnlineSale = document.createElement("td");
		isOnlineSale.innerHTML = responseObj[i].isOnlineSale;
		row.appendChild(isOnlineSale);
		var salesChannel = document.createElement("td");
		salesChannel.innerHTML = responseObj[i].salesChannel;
		row.appendChild(salesChannel);
		var billedBy = document.createElement("td");
		billedBy.innerHTML = responseObj[i].billedBy;
		row.appendChild(billedBy);
		table.appendChild(row);
	}
	salesDetails.style.display = "block";
}

function populateHeader() {
	var userId = sessionStorage.getItem("userId");
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		var responseObj = JSON.parse(this.responseText);
		var username = document.getElementsByClassName("username")[0].children[1];
		username.innerHTML = responseObj.UserName;
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetUserDetails.php?userId="+userId+"");
	xhttp.send();
}

function fetchSalesItems(itemsSold, saleId) {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		var responseSalesItem = JSON.parse(this.responseText);
		for (var i = 0; i < responseSalesItem.length; i++) {
			if(i == responseSalesItem.length - 1)
				itemsSold.innerHTML += responseSalesItem[i].productId;
			else
				itemsSold.innerHTML += responseSalesItem[i].productId + ",";
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetSalesItemData.php?saleId="+saleId+"");
	xhttp.send();
}