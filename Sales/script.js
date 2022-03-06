var date = document.getElementsByClassName("date");

for (var i = 0; i < date.length; i++) {
	var today = new Date();
	date[i].value = today.toISOString().substr(0, 10);
}
