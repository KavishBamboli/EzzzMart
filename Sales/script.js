var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var searchSaleId = document.getElementById("search");
var salesDetails = document.getElementById("sales-details");

var today = new Date();
startDate.value = today.toISOString().substr(0, 10);
endDate.value = today.toISOString().substr(0, 10);

function executeSearch() {
	var responseObj;
	var table = document.getElementsByClassName("records")[0];
	for(var i = 1; i < table.children[0].childElementCount; i++)
	{
		table.children[0].removeChild(table.children[0].children[i]);
	}
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
					for(var i = 0; i < responseObj.length; i++)
						displayDetails(responseObj[i]);
					calculateMetrics(responseObj);
					salesDetails.style.display = "block";
				}
			}
			xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetSalesData.php?searchType=date&startDate="+startDate.value+"&endDate="+endDate.value+"");
			xhttp.send();
		}
	}
	else
	{
		if(/^\d+$/.test(searchSaleId.value))
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
					salesDetails.style.display = "block";
					var metrics = document.getElementsByClassName("metric");
					metrics[0].style.display = "none";
					metrics[1].style.display = "none";
					metrics[2].style.display = "none";
				}
			}
			xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetSalesDataUsingId.php?searchType=date&saleId="+searchSaleId.value+"");
			xhttp.send();
		}
		else
			alert("Invalid sale ID. It should contain only numbers");
	}
	
}

function calculateMetrics(responseObj) {
	var metrics = document.getElementsByClassName("metric-content");
	var totalRevenue = 0, totalInvoices = 0;
	for (var i = 0; i < responseObj.length; i++) {
		totalRevenue += parseFloat(responseObj[i].billAmt);
		totalInvoices += 1;
	}
	metrics[0].children[1].innerHTML = "Rs. " + totalRevenue;
	metrics[1].children[1].innerHTML = Math.round((totalRevenue/totalInvoices) * 100) / 100;
	metrics[2].children[1].innerHTML = totalInvoices;
}

function displayDetails(saleDetail)
{
	var table = document.getElementsByClassName("records")[0].children[0];
	var row = document.createElement("tr");
	row.classList.add("record");
	var date = document.createElement("td");
	date.innerHTML = saleDetail.date;
	row.appendChild(date);
	var saleId = document.createElement("td");
	saleId.innerHTML = saleDetail.saleId;
	row.appendChild(saleId);
	var customerName = document.createElement("td");
	customerName.innerHTML = saleDetail.customerName;
	row.appendChild(customerName);
	var itemsSold = document.createElement("td");
	fetchSalesItems(itemsSold, saleDetail.saleId);
	row.appendChild(itemsSold);
	var billAmt = document.createElement("td");
	billAmt.innerHTML = saleDetail.billAmt;
	row.appendChild(billAmt);
	var isOnlineSale = document.createElement("td");
	isOnlineSale.innerHTML = saleDetail.isOnlineSale;
	row.appendChild(isOnlineSale);
	var salesChannel = document.createElement("td");
	salesChannel.innerHTML = saleDetail.salesChannel;
	row.appendChild(salesChannel);
	var billedBy = document.createElement("td");
	billedBy.innerHTML = saleDetail.billedBy;
	row.appendChild(billedBy);
	table.appendChild(row);
}

function populateHeader() {
	var userName = sessionStorage.getItem("userName");
	var storeName = sessionStorage.getItem("storeName");
	var storename = document.getElementsByClassName("company-name")[0].children[1];
	storename.innerHTML = storeName;
	var username = document.getElementsByClassName("username")[0].children[1];
	username.innerHTML = userName;
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

function displayMenu()
{
	var sidebar = document.getElementsByClassName("side-bar")[0];
	
	if(sidebar.style.display == "flex")
		sidebar.style.display = "none";
	else
		sidebar.style.display = "flex";
}