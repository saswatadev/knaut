<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 *Controller name 					: Home
 *Added date 						: 05.09.2016
 *Added by 							: Saswata Pal
 *Description 						: All the home module view pages are loaded from this controllr
 */
class Home extends CI_Controller {
	/**
	 *Function name 				: index()
	 *Added date 			 		: 05.09.2016
	 *Added by                  	: Saswata Pal
	 *Description       			: Knaut home page will be displayed using this function
	 */	
	public function index()
	{
		$data = array();
		$data['title'] = "Knaut";
		$this->load->view('home', $data);
	}
}
