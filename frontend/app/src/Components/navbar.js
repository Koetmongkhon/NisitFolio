import React from 'react';
import { Link } from "react-router-dom";
import $ from 'jquery';
import cookie from 'react-cookies';
import ApplicationURL from './path';
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoad = this.handleLoad.bind(this);
		this.state = {
			tpId: 'user'
		}
	 }
	
	componentDidMount() {
		var refThis = this;
		window.addEventListener('load', this.handleLoad);
		console.log("Mounted Navbar script!");
		const script = document.createElement("script");
		script.src = "assets/js/navbar.js";
		document.body.appendChild(script);
		
		var x = cookie.load('login-token');
		var jc = cookie.load('user-job-count');
		
		//Is token still valid?
		fetch(ApplicationURL.backend+"profile/",{
				method: "GET",
				headers: {
					'Authorization': 'Bearer '+x,
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "*",
					"Access-Control-Allow-Credentials": true,
					"Content-Type": "application/json"
				},
			})
			.then(function(response) {
				return response.text().then(function(text) {
				  //alert(text);
				  if(text == '{"statusCode":401,"message":"Unauthorized"}'){
						this.setState({tpId : 'public'});
				  }else{ // token valid
				  
				  }
				});
			 })
			 .catch((error) => {
					console.log('token invalid!');
					this.setState({tpId : 'public'});
					//this.setState({ redirect: "/landing" });
			});
			
		
		/*if(x != null){
			if(x == 'none') 
				this.setState({tpId : 'public'});
		}*/
		
		$(function(){
			$('#mrs').on('click', function(){
				console.log('user job count: '+jc);
				if(jc < 1){
					//alert('isEmpty!')
					//refThis.setState({ redirect: "/Choosenothing" });
					window.location = ("/Choosenothing");
				}else{
					//alert('Go!');
					window.location = ("/myresume");
				}
			});
				
			$('#mrs2').on('click', function(){
				console.log('user job count: '+jc);
				if(jc < 1){
					//alert('isEmpty!')
					//refThis.setState({ redirect: "/Choosenothing" });
					window.location = ("/Choosenothing");
				}else{
					//alert('Go!');
					window.location = ("/myresume");
				}
			});
			
			$("#logout").click(function(){
			  //alert('logout!');
			  cookie.save('login-token', 'none', { path: '/' })
			  cookie.save('login-user', 'none', { path: '/' })
		   });
		   
		   $("#logout2").click(function(){
			  //alert('logout!');
			  cookie.save('login-token', 'none', { path: '/' })
			  cookie.save('login-user', 'none', { path: '/' })
		   });
		});
		
		
	}
	
	componentWillUnmount() { 
	   window.removeEventListener('load', this.handleLoad)  
	}
	
	handleLoad() {
		console.log("Navbar script loaded!");
	 }
	
	render (){
		if(this.state.tpId == 'public'){
			return(
				<div className="Navbar">
					<nav class="navbar-2 navbar-no-vertical-padding navbar-expand-lg navbar-light bg-light">
						<div class="nav-flex">
							<div class="nvw1">
								<div class="lg-view">
									<a class="navbar-brand">
										<Link to="/landing">
											<img src="assets/images/nav-bar-icon.png" alt="" width="146" height="26"/>
										</Link>
									</a>
								</div>
								<a class="sm-view navbar-brand-sm">
									<Link to="/home">
										<img src="assets/images/logo2_noname_new.png" alt="" width="60" height="60"/>
									</Link>
								</a>
							</div>

							<div class="nvw2">
								<form class="nvf sf">
									<input class="form-control btn-search-box home" id="search-input" type="search" placeholder="???????????????" aria-label="Search"/>
									<div class="d-flex">
									<button class="btn btn-search yellow" type="submit">
										<img src="assets/images/search.png" class="fx" alt="" width="20" height="20"/>
									</button>
									</div>
								</form>
							</div>
							<div class="nvw3">
									<button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
									  <span class="navbar-toggler-icon"></span>
									</button>
									<div>
									  <div class="lg-view">
											<Link to="/anonymouslogin">
												<a class="btn btn-cta-primary-yellow nav-round regis-mar" id="nav-login" target="_blank">?????????????????????????????????</a>
											</Link>
											<Link to="/register">
												<a class="btn btn-cta-primary nav-round blue" id="nav-regis" target="_blank">?????????????????????????????????</a> 
											</Link>
										</div>
									</div>
									
							</div>
							
							
					  </div>
					  <div class="collapse navbar-collapse" id="navbarSupportedContent">
						  <ul class="navbar-nav sm-view ms-auto">
							<li class="nav-item shadow-box">
							  <Link to="/analytics">
								  <a class="nav-link">
									<span class="sm-view">
										?????????????????????????????????
									</span>
								  </a>
							  </Link>
							</li>
							<li class="nav-item shadow-box">
							  <Link to="/anonymouslogin">
								  <a class="nav-link">
									<span class="sm-view">
										?????????????????????????????????
									</span>
								  </a>
							  </Link>
							</li>
						  </ul>
						</div>
					</nav>
				</div>
			);
		}
		
		return (
			<div className="Navbar">
				<nav class="navbar-2 navbar-no-vertical-padding navbar-expand-lg navbar-light bg-light static-nav">
					<div class="nav-flex">
						<div class="nvw1">
							<div class="lg-view">
								<a class="navbar-brand">
									<Link to="/home">
										<img src="assets/images/nav-bar-icon.png" alt="" width="146" height="26"/>
									</Link>
								</a>
							</div>
							<a class="sm-view navbar-brand-sm">
								<Link to="/home">
									<img src="assets/images/logo2_noname_new.png" alt="" width="60" height="60"/>
								</Link>
							</a>
						</div>

						<div class="nvw2">
							<form class="nvf sf">
								<input class="form-control btn-search-box home" id="search-input" type="search" placeholder="???????????????" aria-label="Search"/>
								<div class="d-flex">
								<button class="btn btn-search yellow" type="submit">
									<img src="assets/images/search.png" class="fx" alt="" width="20" height="20"/>
								</button>
								</div>
							</form>
						</div>
						<div class="nvw3">
								<button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								  <span class="navbar-toggler-icon"></span>
								</button>
								<div>
								  <ul class="navbar-nav lg-view  ms-auto">
								    <li class="nav-item tooltips-item shadow-box" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Home">
									  <Link to="/home">
										  <a class="nav-link" aria-current="page">
											<span class="lg-view">
												<img src="assets/images/home_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
										  </a>
									  </Link>
									</li>
									<li class="nav-item tooltips-item shadow-box" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Bookmark">
									  <Link to="/bookmark">
										  <a class="nav-link" aria-current="page">
											<span class="lg-view">
												<img src="assets/images/bookmark_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
										  </a>
									  </Link>
									</li>
									<li class="nav-item tooltips-item shadow-box" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Portfolio">
									  <Link to="/portfolio">
										  <a class="nav-link">
											<span class="lg-view">
												<img src="assets/images/Portfolio_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
										  </a>
									  </Link>
									</li>
									<li class="nav-item tooltips-item shadow-box pointer" id="mrs" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Myresume">
										  <a class="nav-link">
											<span class="lg-view">
												<img src="assets/images/resume_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
										  </a>
									</li>
									<li class="nav-item tooltips-item shadow-box" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Analytics">
									  <Link to="/analytics">
										  <a class="nav-link">
											<span class="lg-view">
												<img src="assets/images/Analytic_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
										  </a>
									  </Link>
									</li>
									<li class="nav-item tooltips-item shadow-box" id="logout" data-bs-toggle="tooltip" data-bs-placement="bottom" title="Logout">
									  <Link to="/landing">
										  <a class="nav-link">
											<span class="lg-view">
												
													<img src="assets/images/logout2.png" alt="" width="70" height="30"/>
												
											</span>
										  </a>
									  </Link>
									</li>
								  </ul>
								</div>
								
						</div>
						
						
				  </div>
				  <div class="collapse navbar-collapse" id="navbarSupportedContent">
					  <ul class="navbar-nav sm-view ms-auto">
					    <li class="nav-item shadow-box">
						  <Link to="/home">
							  <a class="nav-link" aria-current="page">
								<span class="sm-view">
									????????????????????????
								</span>
							  </a>
						  </Link>
						</li>
						<li class="nav-item shadow-box">
						  <Link to="/bookmark">
							  <a class="nav-link" aria-current="page">
								<span class="sm-view">
									???????????????????????????
								</span>
							  </a>
						  </Link>
						</li>
						<li class="nav-item shadow-box">
						  <Link to="/portfolio">
							  <a class="nav-link">
								<span class="sm-view">
									?????????????????????????????????
								</span>
							  </a>
						  </Link>
						</li>
						<li class="nav-item shadow-box" id="mrs2">
						  <a class="nav-link">
							<span class="sm-view">
								?????????????????????
							</span>
						  </a>
						</li>
						<li class="nav-item shadow-box">
						  <Link to="/analytics">
							  <a class="nav-link">
								<span class="sm-view">
									????????????????????????????????????????????????????????????
								</span>
							  </a>
						  </Link>
						</li>
						<li class="nav-item shadow-box" id="logout2">
						  <Link to="/landing">
							  <a class="nav-link">
								<span class="sm-view">
									??????????????????????????????
								</span>
							  </a>
						  </Link>
						</li>
					  </ul>
					</div>
				</nav>
				<div class="nav-margin"></div>
			</div>
		);
	}
}

export default Navbar;
