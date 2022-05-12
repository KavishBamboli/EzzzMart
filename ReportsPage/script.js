function populateHeader() {
	var userName = sessionStorage.getItem("userName");
	var storeName = sessionStorage.getItem("storeName");
	var storename = document.getElementsByClassName("company-name")[0].children[1];
	storename.innerHTML = storeName;
	var username = document.getElementsByClassName("username")[0].children[1];
	username.innerHTML = userName;
}

function openBarChart()
{
    window.location.href = "http://localhost/EzzzMart/ServerFiles/barchart.php";
}

function openPieChart()
{
    window.location.href = "http://localhost/EzzzMart/ServerFiles/piechart.php";
}

function displayMenu()
{
	var sidebar = document.getElementsByClassName("side-bar")[0];
	
	if(sidebar.style.display == "flex")
		sidebar.style.display = "none";
	else
		sidebar.style.display = "flex";
}