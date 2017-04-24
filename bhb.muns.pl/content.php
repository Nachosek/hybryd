<?php
	include('session.php');
	include('db.php');

	$sqlCompany = "SELECT companyID, FirstName, LastName, CompanyName FROM company";
	$sqlPrices = "SELECT priceID, itemName, itemPrice FROM prices";
	$sqlStock = "SELECT stockID, itemStockName, itemStockAmount FROM stock";
	$result = $conn->query($sqlCompany);
	$result2 = $conn->query($sqlPrices);
	$result3 = $conn->query($sqlStock);
?>

<!doctype html>

<html lang="en">
	<head>
		<meta charset="utf-8">

		<title>Zapisy na wf</title>
		<meta name="description" content="Projekt">

		<link rel="stylesheet" href="css/bootstrap.min.css">
		<link rel="stylesheet" href="css/style.css">
		<link rel="stylesheet" href="css/font-awesome.min.css">
		
		<script src="js/jquery-1.12.0.min.js"></script>
		<script src="js/jquery-ui.min.js"></script>
		<script>
		  $(function() {
		    $( "#tabs" ).tabs();
		  });
		</script>

	  <!--[if lt IE 9]>
	  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	  <![endif]-->
	</head>
<body>
	<div class="wrapper">
		<div class="content">
			<div class="content-panel">
				<div class="row">
					<div class="col-md-12">
						<div class="hpanel">
							<div class="panel-heading">
								<div class="small-logo">
									<a href="#"></a>
								</div>
								<h2>Zapisy na zajęcia z wychowania fizycznego.</h2>
								<small><?php echo $login_session; ?></small>
							</div>

							<div class="panel-body">
								<div id="tabs" class="hpanel">
									<ul class="nav nav-tabs">
										<li class="active"><a href="#tabs-1" data-toggle="tab">Zlecenia</a></li>
										<li><a href="#tabs-2" data-toggle="tab">Cennik</a></li>
										<li><a href="#tabs-3" data-toggle="tab">Sprzęt</a></li>
									</ul>

									<div class="tab-content">
										<div id="tabs-1" class="tab-pane active">
											<div class="panel-body">
												<a href="php/company/addCompany.php"><i class="fa fa-plus"></i> Dodaj</a>
												<div class="table-responsive">
													<table class="table" cellspacing="1" cellpading="1">
														<thead>
															<tr>
																<th style="width: 40px;">#</th>
																<th>Imię</th>
																<th>Nazwisko</th>
																<th>Firma</th>
																<th style="width: 131px;"></th>
															</tr>
														</thead>
														<tbody>
															
															<?php
																if ($result->num_rows > 0) {
																    // output data of each row
																    while($row = $result->fetch_assoc()) {
																        echo "<tr><td>" . $row["companyID"]. "</td><td>" . $row["FirstName"]. "</td><td>" . $row["LastName"]. "</td><td>" . $row["CompanyName"]. "</td><td><a class='action-icon' href='php/company/editCompany.php?edit=".$row["companyID"]."'><i class='fa fa-cog'></i> Edytuj</a><a class='action-icon' href='php/company/deleteCompany.php?del=".$row["companyID"]."'><i class='fa fa-trash'></i> Usuń</a></td></tr>";
																    }
																} ?>
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div id="tabs-2" class="tab-pane active">
											<div class="panel-body">
												<a href="#"><i class="fa fa-plus"></i> Dodaj</a>
												<div class="table-responsive">
													<table class="table" cellspacing="1" cellpading="1">
														<thead>
															<tr>
																<th style="width: 40px;">#</th>
																<th>Nazwa</th>
																<th>Cena</th>
																<th style="width: 131px;"></th>
															</tr>
														</thead>
														<tbody>
															<?php
																if ($result2->num_rows > 0) {
																    // output data of each row
																    while($row = $result2->fetch_assoc()) {
																        echo "<tr><td>" . $row["priceID"]. "</td><td>" . $row["itemName"]. "</td><td>" . $row["itemPrice"]. "</td><td><a class='action-icon' href='php/company/editPrice.php?edit=".$row["priceID"]."'><i class='fa fa-cog'></i> Edytuj</a><a class='action-icon' href='php/company/deletePrice.php?del=".$row["priceID"]."'><i class='fa fa-trash'></i> Usuń</a></td></tr>";
																    }
																} ?>
														</tbody>
													</table>
												</div>
											</div>
										</div>
										<div id="tabs-3" class="tab-pane active">
											<div class="panel-body">
												<a href="#"><i class="fa fa-plus"></i> Dodaj</a>
												<div class="table-responsive">
													<table class="table" cellspacing="1" cellpading="1">
														<thead>
															<tr>
																<th style="width: 40px;">#</th>
																<th>Nazwa</th>
																<th>Ilość na stanie</th>
																<th style="width: 131px;"></th>
															</tr>
														</thead>
														<tbody>
															<?php
																if ($result3->num_rows > 0) {
																    // output data of each row
																    while($row = $result3->fetch_assoc()) {
																        echo "<tr><td>" . $row["stockID"]. "</td><td>" . $row["itemStockName"]. "</td><td>" . $row["itemStockAmount"]. "</td><td><a class='action-icon' href='php/company/editStock.php?edit=".$row["stockID"]."'><i class='fa fa-cog'></i> Edytuj</a><a class='action-icon' href='php/company/deleteStock.php?del=".$row["stockID"]."'><i class='fa fa-trash'></i> Usuń</a></td></tr>";
																    }
																} ?>
														</tbody>
													</table>
												</div>
											</div>
										</div>
									</div>
								</div>
								<p class="text-right"><a href="logout.php" id="logout"><i class="fa fa-plug"></i> Wyloguj</a></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	 
	<script src="js/bootstrap.min.js"></script>
	
</body>
</html>