<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 *Controller name 					: User
 *Added date 						: 05.09.2016
 *Added by 							: Saswata Pal
 *Description 						: All the user module view pages are loaded from this controllr
 */
class User extends CI_Controller {
	/**
	 *Function name 				: index()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut user home page will be displayed using this function
	 */	
	public function index()
	{
		$data = array();
		$data['title'] = "Knaut|User";
		$this->load->view('home', $data);
	}

	/**
	 *Function name 				: login()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut user login page will be displayed using this function
	 */	
	public function login()
	{
		$data = array();
		$data['title'] = "Knaut|User|login";
		$this->load->view('home', $data);	
	}

	/**
	 *Function name 				: registration()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut user register page will be displayed using this function
	 */	
	public function registration($step = '')
	{
		$step = !empty($step) ? '|'.$step : '';
		$data = array();
		$data['title'] = "Knaut|User|Registration".$step;
		$this->load->view('home', $data);	
	}

	/**
	 *Function name 				: forget_password()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut user forget password using this function
	 */	
	public function forget_password()
	{
		$data = array();
		$data['title'] = "Knaut|User|Forget Password";
		$this->load->view('home', $data);	
	}

	/**
	 *Function name 				: verification_code()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut user forget password using this function
	 */	
	public function verification_code($verification_code)
	{
		$data = array();
		$data['title'] = "Knaut|User|Verification Code";
		$this->load->view('home', $data);	
	}

	/**
	 *Function name 				: reset_password()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut user forget password using this function
	 */	
	public function reset_password()
	{
		$data = array();
		$data['title'] = "Knaut|User|Reset password";
		$this->load->view('home', $data);	
	}
}
