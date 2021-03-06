import React from 'react';
import { Link } from "react-router-dom";

class NavbarTransparent extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoad = this.handleLoad.bind(this);
	 }
	
	componentDidMount() {
		window.addEventListener('load', this.handleLoad);
		console.log("Mounted Navbar script!");
		const script = document.createElement("script");
		script.src = "assets/js/navbar.js";
		document.body.appendChild(script);
		
	}
	
	componentWillUnmount() { 
	   window.removeEventListener('load', this.handleLoad)  
	}
	
	handleLoad() {
		console.log("Navbar script loaded!");
	 }
	
	render (){
		return (
			<div className="NavbarTransparent">
				<nav class="navbar-3 transparent fixed-top ex-pad-landing navAnimation">
				  <div class="container-fluid p-0">
					<div class="row">
						<div class="col-3 d-flex align-items-center">
							<a class="navbar-brand logo-pad">
								<Link to="/landing">
									<img src="assets/images/nav-bar-icon-white.png" alt="" width="135" height="24"/>
								</Link>
							</a>
						</div>
						<div class="col-6 d-flex align-items-center justify-content-center">
							<div class="lg-view-search container-fluid container-search">
								<form class="d-flex sf">
									<input class="form-control btn-search-box home" id="search-input" type="search" placeholder="ค้นหา" aria-label="Search"/>
									<div class="d-flex">
										<button class="btn btn-search yellow" type="submit">
											<img src="assets/images/search.png" class="fx" alt="" width="20" height="20"/>
										</button>
									</div>
								</form>
							</div>
						</div>
						<div class="col-3 d-flex align-items-center justify-content-end">
								<a class="sm-view navbar-brand-sm">
									<Link to="/home">
										<img src="assets/images/logo2_noname_square.png" alt="" width="30" height="30"/>
									</Link>
								</a>
								
								<span class="sm-view ms-auto">
									<form class="d-flex">
										<input class="form-control btn-search-box" type="search" placeholder="ค้นหา" aria-label="Search"/>
										<button class="btn btn-search yellow" type="submit">
											<img src="assets/images/search.png" alt="" width="20" height="20"/>
										</button>
									</form>
								</span>
								
								<button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
									<span class="navbar-toggler-icon"></span>
								</button>
								
								<div class="collapse navbar-collapse" id="navbarSupportedContent">
								  <ul class="navbar-nav ms-auto">
									<li class="nav-item shadow-box">
									  <Link to="/bookmark">
										  <a class="nav-link" aria-current="page">
											<span class="lg-view">
												<img src="assets/images/bookmark_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
											<span class="sm-view">
												รายการโปรด
											</span>
										  </a>
									  </Link>
									</li>
									<li class="nav-item shadow-box">
									  <Link to="/portfolio">
										  <a class="nav-link">
											<span class="lg-view">
												<img src="assets/images/Portfolio_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
											<span class="sm-view">
												แฟ้มสะสมงาน
											</span>
										  </a>
									  </Link>
									</li>
									<li class="nav-item shadow-box">
									  <Link to="/myresume">
										  <a class="nav-link">
											<span class="lg-view">
												<img src="assets/images/resume_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
											<span class="sm-view">
												เรซูเม่
											</span>
										  </a>
									  </Link>
									</li>
									<li class="nav-item shadow-box">
									  <Link to="/analytic">
										  <a class="nav-link">
											<span class="lg-view">
												<img src="assets/images/Analytic_navigation_bar2.png" alt="" width="70" height="30"/>
											</span>
											<span class="sm-view">
												การวิเคราะห์ทางสถิติ
											</span>
										  </a>
									  </Link>
									</li>
									<li class="nav-item shadow-box">
									  <Link to="/landing">
										  <a class="nav-link">
											<span class="lg-view">
												
													<img src="assets/images/logout2.png" alt="" width="70" height="30"/>
												
											</span>
											<span class="sm-view">
												ออกจากระบบ
											</span>
										  </a>
									  </Link>
									</li>
								  </ul>
								</div>
						</div>
					</div>
				  </div>
				</nav>
			</div>
		);
	}
}

export default NavbarTransparent;
