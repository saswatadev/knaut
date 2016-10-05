<?php
defined('BASEPATH') OR exit('No direct script access allowed');
/**
 *Controller name 					: Dashboard
 *Added date 						: 05.09.2016
 *Added by 							: Saswata Pal
 *Description 						: All the Dashboard module view pages are loaded from this controllr
 */
class Dashboard extends CI_Controller {
	/**
	 *Function name 				: index()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut dashboard home page will be displayed using this function
	 */	
	public function index()
	{
		$data = array();
		$data['title'] = "Knaut|Dashboard";
		$this->load->view('home', $data);
	}

	/**
	 *Function name 				: knautboard()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut dashboard knautboard page will be displayed using this function
	 */	
	public function knautboard()
	{
		$data = array();
		$data['title'] = "Knaut|Dashboard|Knaut board";
		$this->load->view('home', $data);	
	}

	/**
	 *Function name 				: delivein()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut dashboard delivein page will be displayed using this function
	 */	
	public function delvein()
	{
		$data = array();
		$data['title'] = "Knaut|Dashboard|Delve in";
		$this->load->view('home', $data);	
	}

	/**
	 *Function name 				: profile()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut dashboard profile page will be displayed using this function
	 */	
	public function profile()
	{
		$data = array();
		$data['title'] = "Knaut|Dashboard|Profile";
		$this->load->view('home', $data);	
	}

	/**
	 *Function name 				: followers()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut dashboard followers
	 */	
	public function followers()
	{
		$data = array();
		$data['title'] = "Knaut|Dashboard|Followers";
		$this->load->view('home', $data);	
	}

	/**
	 *Function name 				: following()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut dashboard followers
	 */	
	public function following()
	{
		$data = array();
		$data['title'] = "Knaut|Dashboard|Following";
		$this->load->view('home', $data);	
	}
}
