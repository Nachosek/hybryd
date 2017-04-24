<?php 
	include('../../session.php');
	include_once('../../db.php');

	if(isset($_GET['del'])){
		$id = $_GET['del'];
		$sql = "DELETE FROM company WHERE companyID='$id'";
		$res = mysql_query($sql) or die("Lipa ".mysql_error());
		echo "<meta http-equiv='refresh' content='0;url=../../content.php'>";
	}
?>