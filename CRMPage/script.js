function populateHeader() {
	var userName = sessionStorage.getItem("userName");
	var storeName = sessionStorage.getItem("storeName");
	var storename = document.getElementsByClassName("company-name")[0].children[1];
	storename.innerHTML = storeName;
	var username = document.getElementsByClassName("username")[0].children[1];
	username.innerHTML = userName;

    displayFeedback();
}

function displayFeedback()
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
            var feedbackReviewBox = document.getElementsByClassName("review-box")[0];
            var complainReviewBox = document.getElementsByClassName("review-box")[1];
            var numCount = 0;

            for (let index = 0; index < responseObj.length; index++) {
                if(responseObj[index].feedbackType == "Feedback")
                {
                    var newReviewBox = feedbackReviewBox.cloneNode(true);
                    var feedbackReviewBoxContainer = document.getElementsByClassName("review-box-container")[0];
                    feedbackReviewBoxContainer.appendChild(newReviewBox);

                    var cname = document.getElementsByClassName("name-user-feedback")[numCount+1].children[0];
                    cname.innerHTML = responseObj[index].customerName;
                    
                    var cid = document.getElementsByClassName("name-user-feedback")[numCount+1].children[1];
                    cid.innerHTML += responseObj[index].reviewId;

                    var reviews = document.getElementsByClassName("reviews")[numCount+1];
                    var numStars = parseInt(responseObj[index].stars);
                    for (let index = 0; index < numStars; index++) {
                        var star = document.createElement("i");
                        star.classList.add("fas");
                        star.classList.add("fa-star");
                        reviews.appendChild(star);
                    }

                    var comment = document.getElementsByClassName("client-comment-feedback")[index+1].children[0];
                    comment.innerHTML = responseObj[index].message;
                    numCount++;
                }
            }

            feedbackReviewBox.style.display = "none";
            numCount = 0;

            for (let index = 0; index < responseObj.length; index++) {
                if(responseObj[index].feedbackType == "Complain")
                {
                    var newReviewBox = complainReviewBox.cloneNode(true);
                    var complainReviewBoxContainer = document.getElementsByClassName("review-box-container")[1];
                    complainReviewBoxContainer.appendChild(newReviewBox);

                    var cname = document.getElementsByClassName("name-user-complain")[numCount+1].children[0];
                    cname.innerHTML = responseObj[index].customerName;
                    
                    var cid = document.getElementsByClassName("name-user-complain")[numCount+1].children[1];
                    cid.innerHTML += responseObj[index].reviewId;

                    var comment = document.getElementsByClassName("client-comment-complain")[numCount+1].children[0];
                    comment.innerHTML = responseObj[index].message;

                    var status = document.getElementsByClassName("submit")[numCount+1].children[0];
                    if(responseObj[index].isAddressed == "Yes")
                        status.innerHTML = "Current Status: Action Taken";
                    else
                        status.innerHTML = "Current Status: Under Review";
                    numCount++;
                }
            }
            
            complainReviewBox.style.display = "none";
        }
    }
    xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/GetCustomerReviews.php");
    xhttp.send();
}

function changeStatus(event) {
    var id = event.target.parentElement.parentElement.children[0].children[0].children[1].children[1].innerHTML;
    var status = event.target.parentElement.children[0].innerHTML;

    id = id.substring(id.indexOf(" ") + 1);
    
    if(status == "Current Status: Under Review")
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
                    console.log("Status changed successfully");
                    location.reload();
                }
            }
        }
        xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/UpdateReviewStatus.php?id="+id+"&status=Yes");
        xhttp.send();
    }
    else if(status == "Current Status: Action Taken")
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
                    alert("Status changed successfully");
                    location.reload();
                }
            }
        }
        xhttp.open("POST", "http://localhost/EzzzMart/ServerFiles/UpdateReviewStatus.php?id="+id+"&status=No");
        xhttp.send();
    }
}

function displayMenu()
{
	var sidebar = document.getElementsByClassName("side-bar")[0];
	
	if(sidebar.style.display == "flex")
		sidebar.style.display = "none";
	else
		sidebar.style.display = "flex";
}