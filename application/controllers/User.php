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
	 *Function name 				: register()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut user register page will be displayed using this function
	 */	
	public function register()
	{
		$data = array();
		$data['title'] = "Knaut|User|Register";
		$this->load->view('home', $data);	
	}
}
