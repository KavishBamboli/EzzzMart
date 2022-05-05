<?php
	header('Access-Control-Allow-Origin: *');
	$arr = array();
	$mysqli = new mysqli("localhost", "root", "kavish1234", "ezzzmart");
	if($mysqli->connect_error) {
		exit('Could not connect');
	}

	$sql = "SELECT * FROM customer_feedback";

	$result = $mysqli->query($sql);
	if ($result->num_rows > 0) {
	  while($row = $result->fetch_assoc()) {
	  	$review = new CustomerReview();
	  	$review->reviewId = $row["ReviewID"];
	  	$review->stars = $row["Stars"];
	  	$review->customerName = $row["CustomerName"];
	  	$review->message = $row["Message"];
	  	$review->feedbackType = $row["FeedbackType"];
	  	$review->isAddressed = $row["isAddressed"];
	  	array_push($arr, $review);
	  }
	} 
	if(count($arr) == 0)
		echo "0 results";
	else
		echo json_encode($arr);

	class CustomerReview
	{
		public $reviewId;
		public $stars;
		public $customerName;
		public $message;
		public $feedbackType;
		public $isAddressed;
	}
	$mysqli->close();
?>