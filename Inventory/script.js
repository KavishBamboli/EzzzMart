function populateHeader() {
	var userName = sessionStorage.getItem("userName");
	var storeName = sessionStorage.getItem("storeName");
	var storename = document.getElementsByClassName("company-name")[0].children[1];
	storename.innerHTML = storeName;
	var username = document.getElementsByClassName("username")[0].children[1];
	username.innerHTML = userName;
    
    displayRestockItems();
    displayReplaceItems();
}

function displayRestockItems()
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
				var itemData = JSON.parse(this.responseText);
                for (let index = 0; index < itemData.length; index++) {
                    displayRestockData(itemData[index]);
                }
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetRestockItems.php?");
	xhttp.send();
}

function displayRestockData(itemData)
{
    var table = document.getElementsByClassName("data")[0].children[0];
	var row = document.createElement("tr");
    row.style.textAlign = "center";
	var id = document.createElement("td");
	id.innerHTML = itemData.productId;
	row.appendChild(id);
	var quantityInStock = document.createElement("td");
	quantityInStock.innerHTML = itemData.quantityInStock;
	row.appendChild(quantityInStock);
	table.appendChild(row);
}

function displayReplaceItems()
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
				var itemData = JSON.parse(this.responseText);
                for (let index = 0; index < itemData.length; index++) {
                    displayReplaceItemsData(itemData[index]);
                }
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetReplaceItemsData.php?");
	xhttp.send();
}

function displayReplaceItemsData(itemData)
{
    var table = document.getElementsByClassName("data")[1].children[0];
	var row = document.createElement("tr");
    row.style.textAlign = "center";
	var id = document.createElement("td");
	id.innerHTML = itemData.id;
	row.appendChild(id);
	var reason = document.createElement("td");
	reason.innerHTML = itemData.reason;
	row.appendChild(reason);
	table.appendChild(row);
}

function getItemData()
{
    var id = document.getElementById("search").value;
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
				var itemData = JSON.parse(this.responseText);
                
                var particulars = document.getElementsByClassName("particular");

                for (let index = 0; index < particulars.length; index++) {
                    particulars[index].children[1].innerHTML = Object.values(itemData)[index];
                }
                
                var searchResult = document.getElementsByClassName("search-results-box")[0];
                searchResult.style.display = "block";
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetInventoryDataUsingId.php?id="+id+"");
	xhttp.send();
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

function saveItemData()
{
    var name = document.getElementsByClassName("inputText")[0].value;
	var taxCode = document.getElementsByClassName("inputText")[1].value;
	var costPrice = document.getElementsByClassName("inputText")[2].value;
	var sellingPrice = document.getElementsByClassName("inputText")[3].value;
	var quantityInStock = document.getElementsByClassName("inputText")[4].value;
	var supplier = document.getElementsByClassName("inputText")[5].value;

    if(name == "" || taxCode == "" || costPrice == "" || sellingPrice == "" || quantityInStock == "" || supplier == "")
    {
        alert("Please fill all the fields");
    }

    else
    {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            if(this.responseText == "Success")
            {
                alert("Inventory item inserted successfully");
                location.reload();
            }
            else
                alert("There were some errors in insertion of records");
        }
        xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveInventoryData.php?name="+name+"&taxCode="+taxCode+"&costPrice="+costPrice+"&sellingPrice="+sellingPrice+"&quantity="+quantityInStock+"&supplierId="+supplier+"");
        xhttp.send();
    }
}

function saveOfferData()
{
    var id = document.getElementsByClassName("inputText")[6].value;
    var type;
    var rate = document.getElementsByClassName("inputText")[9].value;
    var offerItemId = document.getElementsByClassName("inputText")[10].value;

    if(document.getElementsByClassName("inputText")[7].checked)
        type = "Discount";
    else
        type = "Item offered";
    
    if(id == "" || type == "")
    {
        alert("Please fill all the fields");
    }
    else
    {
        if(type == "Discount")
        {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if(this.responseText == "Success")
                {
                    console.log(this.responseText);
                    // alert("Offer created successfully");
                    // location.reload();
                }
                else
                    console.log(this.responseText);
                    //alert("There were some errors in insertion of records");
            }
            xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveOfferData.php?id="+id+"&type=discount&rate="+rate+"&offerItemId=null");
            xhttp.send();
        }
        else
        {
            const xhttp = new XMLHttpRequest();
            xhttp.onload = function() {
                if(this.responseText == "Success")
                {
                    alert("Offer created successfully");
                    location.reload();
                }
                else
                    alert("There were some errors in insertion of records");
            }
            xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveOfferData.php?id="+id+"&type=ItemOffered&rate=null&offerItemId="+offerItemId+"");
            xhttp.send();
        }
    }
}