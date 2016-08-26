<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" ng-app="angularstrapApp">
<head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
    <meta content="utf-8" http-equiv="encoding">
    <link rel="stylesheet" href="<?php echo base_url() ?>assets/css/bootstrapFlatly/bootstrap.css">
<base href="/knaut/" />
</head>
<title><?php echo $title; ?></title>
<body>
<div class="container">
	<h1>Welcome to knaut</h1>

	<a href="<?php echo base_url(); ?>">Home</a>   
	<a href="<?php echo base_url(); ?>#/home/about">About</a>  
    <!-- start dynamic content -->
    <div ui-view=""></div>
    <!-- end dynamic content -->
</div>
</body>

<script src="<?php echo base_url() ?>node_modules/jquery/dist/jquery.min.js"></script>
<script src="<?php echo base_url() ?>node_modules/bootstrap/dist/css/bootstrap.min.css"></script>
<script src="<?php echo base_url() ?>node_modules/angular/angular.min.js"></script>
<script src="<?php echo base_url() ?>node_modules/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="<?php echo base_url() ?>app/app.config.js"></script>
<script src="<?php echo base_url() ?>app/app.states.js"></script>
<script src="<?php echo base_url() ?>app/components/home/home.directives.js"></script>
<script src="<?php echo base_url() ?>app/components/home/home.controller.js"></script>
<script src="<?php echo base_url() ?>app/components/home/services/home.services.js"></script>
<script src="<?php echo base_url() ?>app/components/about/about.controller.js"></script>
<script src="<?php echo base_url() ?>app/components/about/about.services.js"></script>

</html>
