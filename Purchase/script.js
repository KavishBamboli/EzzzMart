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
                console.log(suppliersData);
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