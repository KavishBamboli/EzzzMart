var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var searchSaleId = document.getElementById("search");
var salesDetails = document.getElementById("sales-details");

var today = new Date();
startDate.value = today.toISOString().substr(0, 10);
endDate.value = today.toISOString().substr(0, 10);

function executeSearch() {
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
				// var str = this.responseText.split("");
				// console.log(Array.from(str));
				var responseObj = JSON.parse(this.responseText);
				console.log(responseObj);
			}
			xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetSalesData.php?searchType=date&startDate="+startDate.value+"&endDate="+endDate.value+"");
			xhttp.send();
			salesDetails.style.display = "block";
		}
	}
	else
	{
		const xhttp = new XMLHttpRequest();
		xhttp.onload = function() {
		   salesDetails.innerHTML = this.responseText;
		}
		xhttp.open("GET", "http://localhost/EzzzMart/ServerFiles/GetSalesData.php?searchType=date&saleId="+searchSaleId.value+"");
		xhttp.send();
		salesDetails.style.display = "block";
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

function displayRecords() {
	
}