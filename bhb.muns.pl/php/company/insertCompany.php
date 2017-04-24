<?php 
	include_once('../../db.php');
	// Escape user inputs for security

	$first_name = mysqli_real_escape_string($conn, $_POST['firstname']);
	$last_name = mysqli_real_escape_string($conn, $_POST['lastname']);
	$company = mysqli_real_escape_string($conn, $_POST['company']);

	// attempt insert query execution
	$sql = "INSERT INTO company (FirstName, LastName, CompanyName) VALUES ('$first_name', '$last_name', '$company')";
	if(mysqli_query($conn, $sql)){
	    echo "<meta http-equiv='refresh' content='0;url=../../content.php'>";
	} else{
	    echo "ERROR: Could not able to execute $sql. " . mysqli_error($conn);
	}

	// close connection

	mysqli_close($conn);
?>