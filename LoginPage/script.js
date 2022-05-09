const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
var storeDetails;

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

function signIn() {
    var storeId = document.getElementsByClassName("form")[1].children[2].value;
    var username = document.getElementsByClassName("form")[1].children[3].value;
    var password = document.getElementsByClassName("form")[1].children[4].value;

    const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		if(this.readyState == 4 && this.status == 200)
		{
			if(this.responseText == "0 results")
			{
				alert("Store not found! Register the store before proceeding");
			}
			else
			{
				var usersData = JSON.parse(this.responseText);
                if(validateUser(usersData, username, password))
                {
                    alert("User Logged in successfully");
                    getStoreDetails(storeId);
                    window.location.href = "../AdminPage/admin.html";
                    sessionStorage.setItem("userName", username);
                }
                else
                {
                    alert("Invalid username or password");
                }
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetUsersData.php?storeId="+storeId+"");
	xhttp.send();
}

function signUp() {
    var storeName = document.getElementsByClassName("form")[0].children[2].value;
    var email = document.getElementsByClassName("form")[0].children[3].value;
    var address = document.getElementsByClassName("form")[0].children[4].value;
    var gst = document.getElementsByClassName("form")[0].children[5].value;
    var contact = document.getElementsByClassName("form")[0].children[6].value;

    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if(this.readyState == 4 && this.status == 200)
        {
            if(this.responseText == "Failed")
            {
                alert("There was a problem registering your store! Please try again later!")
            }
            else
            {
                alert("Store registered successfully");
                createAdminUser();
            }
        }
    }
    xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveStoreData.php?storeName="+storeName+"&email="+email+"&address="+address+"&gst="+gst+"&contact="+contact+"");
    xhttp.send();
}

function validateUser(usersData, username, password)
{
    for (let index = 0; index < usersData.length; index++) {
        if(username == usersData[index].userName && password == usersData[index].password)
            return true;
    }
    return false;
}

function getStoreDetails(storeId) {
    for (let index = 0; index < storeDetails.length; index++) {
        if(storeDetails[index].storeId == storeId)
            sessionStorage.setItem("storeName", storeDetails[index].storeName);
    }
}

function loadStoreDetails()
{
    const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		if(this.readyState == 4 && this.status == 200)
		{
			if(this.responseText == "0 results")
			{
				alert("Store not found! Register the store before proceeding");
			}
			else
			{
				storeDetails = JSON.parse(this.responseText);
			}
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetStoreDetails.php");
	xhttp.send();
}

function createAdminUser()
{
    var newStoreId = parseInt(storeDetails[storeDetails.length - 1].storeId) + 1;

    const xhttp = new XMLHttpRequest();
	xhttp.onload = function() {
		if(this.readyState == 4 && this.status == 200)
		{
            if(this.responseText == "Success")
            {
                alert("Admin user created with username admin and password admin1234 which can be changed once you login as admin");
                location.reload();
            }
            else
                console.log(this.responseText);
		}
	}
	xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/SaveEmployeeData.php?id="+newStoreId+"&username=admin&password=admin1234&role=admin");
	xhttp.send();
}