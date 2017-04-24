<?php
	include('login.php');

	if(isset($_SESSION['login_user'])){
	header("location: content.php");
	}
?>

<!doctype html>

<html lang="en">
	<head>
	  <meta charset="utf-8">

	  <title>Zapisy na wf</title>
	  <meta name="description" content="Projekt">

	  <link rel="stylesheet" href="css/bootstrap.min.css">
	  <link rel="stylesheet" href="css/style.css">

	  <!--[if lt IE 9]>
	  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	  <![endif]-->
	</head>

<body>
	<div class="login-container">
		<div class="row">
			<div class="col-md-12">
				<div class="text-center m-b-md">
					<div class="logo"><a href="#"></a></div>	
					<h3>Zapisy na zajęcia z wychowania fizycznego</h3>
					<small>Ekran logowania studenta</small>
				</div>
				<div class="hpanel">
					<div class="panel-body">
						<form id="loginForm" action="" method="POST">
							<div class="form-group">
								<label class="control-label" for="username">Numer albumu:</label>
								<input id="username" class="form-control" type="text" name="username" placeholder="Numer albumu" />
								
							</div>
							<div class="form-group">
								<label class="control-label" for="password">Hasło:</label>
								<input id="password" class="form-control" type="password" name="password" placeholder="Hasło" />
								<span class="help-block small">Twoje silne hasło</span>
							</div>
							<div class="checkbox">
								<div class="icheckbox_square-green" style="position: relative;">
								<input class="i-checks" type="checkbox" checked="" style="position: absolute; opacity: 0;">
								<ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins>
								</div>
								Zapamiętaj użytkownika
								<p class="help-block small">(Jeśli to twój prywatny komputer)</p>
							</div>
							<button name="submit" type="submit" class="btn grey-dark btn-block">Zaloguj</button>
							<span><?php echo $error; ?></span>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>

  <script src="js/jquery-1.12.0.min.js"></script>
  <script src="js/jquery-ui.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/icheck.min.js"></script>
  
</body>
</html>