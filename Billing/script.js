var saleId = 0;
var totalBillAmt = 0;

function getSalesData() {
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		if(this.readyState == 4 && this.status == 200)
		{
			if(this.responseText == "0 results")
			{
				alert("No results found!");
			}
			else
			{
				var salesData = JSON.parse(this.responseText);
				getLastSaleId(salesData);
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetAllSalesData.php");
	xhttp.send();
}

getSalesData();

function getLastSaleId(responseObj)
{
	lastSaleId = parseInt(responseObj[responseObj.length - 1].saleId);
	var saleIdField = document.getElementsByClassName("input-fields")[0].children[2];
	saleId = lastSaleId + 1;
	saleIdField.value = saleId;
}

function getItemData() {
	var btn = document.getElementsByClassName("new-item-button")[1];
	var itemIdText = parseInt(document.getElementsByClassName("inputText")[0].value);
	checkItemExists(itemIdText);
}

function checkItemExists(itemId) {
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
				for (let index = 0; index < inventoryData.length; index++) {
					if(inventoryData[index].productId == itemId)
					{
						var table = document.getElementsByClassName("records")[0].children[0];
						var row = document.createElement("tr");
						row.classList.add("record");
						var pid = document.createElement("td");
						pid.innerHTML = inventoryData[index].productId;
						row.appendChild(pid);
						var pname = document.createElement("td");
						pname.innerHTML = inventoryData[index].productName;
						row.appendChild(pname);
						var taxCode = document.createElement("td");
						taxCode.innerHTML = inventoryData[index].taxCode;
						row.appendChild(taxCode);
						var sellingPrice = document.createElement("td");
						sellingPrice.innerHTML = inventoryData[index].sellingPrice;
						row.appendChild(sellingPrice);
						var quantity = document.createElement("td");
						var quantityInput = document.getElementsByClassName("inputText")[1].value;
						quantity.innerHTML = quantityInput;
						row.appendChild(quantity);
						var gstAmount = document.createElement("td");
						var gstAmountCal = 0;
						if(taxCode == "AB001")
							gstAmountCal = 0;
						else if(taxCode == "AB002")
							gstAmountCal = parseFloat(quantityInput * inventoryData[index].sellingPrice * 0.05);
						else if(taxCode == "AB003")
							gstAmountCal = parseFloat(quantityInput * inventoryData[index].sellingPrice * 0.12);
						else if(taxCode == "AB004")
							gstAmountCal = parseFloat(quantityInput * inventoryData[index].sellingPrice * 0.18);
						else
							gstAmountCal = parseFloat(quantityInput * inventoryData[index].sellingPrice * 0.28);
						
						gstAmount.innerHTML = Math.round(gstAmountCal * 100) / 100;
						row.appendChild(gstAmount);
						var totalAmount = document.createElement("td");
						var totalAmountCal = parseFloat((quantityInput * inventoryData[index].sellingPrice) + gstAmountCal);
						totalAmount.innerHTML = totalAmountCal;
						row.appendChild(totalAmount);
						table.appendChild(row);
						modal.style.display = "none";

						totalBillAmt += totalAmountCal;
						var totalAmtField = document.getElementsByClassName('content')[0];
						totalAmtField.innerHTML = totalBillAmt;

						const xhttp = new XMLHttpRequest();
						xhttp.onload = function() {
							console.log(this.responseText);
						}
						xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveSalesItemData.php?saleId="+saleId+"&productId="+inventoryData[index].productId+"&quantity="+quantityInput+"&sellingPrice="+totalAmountCal+"");
						xhttp.send();

						return;
					}
				}
				alert("Stock item not found. Please check the item Id");
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetInventoryData.php");
	xhttp.send();
}

function populateHeader() {
	var userName = sessionStorage.getItem("userName");
	var storeName = sessionStorage.getItem("storeName");
	var storename = document.getElementsByClassName("company-name")[0].children[1];
	storename.innerHTML = storeName;
	var username = document.getElementsByClassName("username")[0].children[1];
	username.innerHTML = userName;
}

var modal = document.getElementById("myModal");
var btn = document.getElementsByClassName("new-item-button")[0];
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}
span.onclick = function() {
  modal.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var amountPaid = document.getElementById("amountPaid");
amountPaid.addEventListener('input', calculateBalance);

function calculateBalance()
{
	var balanceField = document.getElementsByClassName("content")[2];
	balanceField.innerHTML = Math.round(parseFloat(totalBillAmt - parseFloat(amountPaid.value)) * 100) / 100;
}

function generateBill()
{
	var customerName = document.getElementsByClassName("input-fields")[0].children[1].value;
	var date = document.getElementsByClassName("input-fields")[0].children[0].value;

	if(date == null || customerName == null || customerName == " ")
	{
		alert("Enter the customer name and date");
	}
	else
	{
		var today = new Date();
		if(date > today.toISOString().substr(0, 10))
			alert("Date cannot be greater than today");
		else
		{
			saveData(saleId, date, customerName, totalBillAmt);
			alert("Bill generated successfully");
			saleId++;
			var saleIdField = document.getElementsByClassName("input-fields")[0].children[2];
			saleIdField.value = saleId;
		}
	}
}

function saveData(saleId, date, customerName, billAmt)
{
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		console.log(this.responseText);
	}
	xhttp.open("GET", "http://localhost/EzzzMart/ServerFiles/SaveSalesData.php?saleId="+saleId+"&date="+date+"&customerName="+customerName+"&billAmt="+billAmt+"&onlineSale=No&salesChannel=cash&billedBy="+sessionStorage.getItem("userName")+"");
	xhttp.send();
}