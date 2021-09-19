import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import './index.css';
import $ from 'jquery';
import Navbar from './Components/navbar';
import ProfileHeader from './Components/profileHeader';
import PortfolioContent from './Components/portfolioContent';
import reportWebVitals from './reportWebVitals';
import { ReactSortable } from "react-sortablejs";
import PortThumb from "./portThumb";
import BasicDatePickerPort from "./Components/datePickerPort";

class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.handleLoad = this.handleLoad.bind(this);
		this.state = {
			allow: false,
			/*list: [{ id: "1", name: "Img1" },
					{ id: "2", name: "Img2" },
					{ id: "3", name: "Img3" },
					{ id: "4", name: "Img4" },
					{ id: "5", name: "Img5" }],*/
			list: [{ id: 1, name: "Img1" }],
			sortableContainer: "sortable-container-5"
		}
	 }
	
	componentDidMount() {
		window.addEventListener('load', this.handleLoad);
		console.log("YEAHXXX!");
		const script = document.createElement("script");
		script.src = "assets/js/home.js";
		document.body.appendChild(script);
		
		const refThis = this;
		
		function ResetSortableContent(){	
			if(refThis.state.list.length == 5){
				refThis.setState({ sortableContainer: "sortable-container-5" });
			}else if(refThis.state.list.length == 4){
				refThis.setState({ sortableContainer: "sortable-container-4" });
			}else if(refThis.state.list.length == 3){
				refThis.setState({ sortableContainer: "sortable-container-3" });
			}else if(refThis.state.list.length == 2){
				refThis.setState({ sortableContainer: "sortable-container-2" });
			}else if(refThis.state.list.length == 1){
				refThis.setState({ sortableContainer: "sortable-container-1" });
			}else{ // no image
				alert('something went wrong!');
			}
		}
		
		ResetSortableContent();
		
		var i=1;
		
		$("input").keypress(function(){
		  i += 1;
		  alert(document.getElementById('basic-date-picker').value);
		  var temp = refThis.state.list;
		  temp.push({ id: i, name: "Img"+i });
		  refThis.setState({ list: temp });
		  ResetSortableContent();
		});
		
		$(function(){
			$("#basic-date-picker").attr("placeholder", "วัน/เดือน/ปี");
			
		  $('.static-public-icon').on('click', function(){
			  $('.static-public-icon').removeClass('spi-active');
			  $(this).addClass('spi-active');
		  });
		  
		  $('.static-footer-arrow').on('click', function(){
			  $('.inner-popup-folio').addClass('anim-inner-popup-folio');
			  $('#inner-fixed-folio-3').addClass('anim-inner-fixed-folio-3');
			  $('.static-footer-arrow').hide();
			  $('.p5-label').hide();
			  $('.port-bg').css('background-color', '#C7C7C7');
			  $('.pu-date-picker').css("display", "block");
		  });
		  
		  $('.static-popup-arrow').on('click', function(){
			  $('.inner-popup-folio').removeClass('anim-inner-popup-folio');
			  $('#inner-fixed-folio-3').removeClass('anim-inner-fixed-folio-3');
			  $('.static-footer-arrow').show();
			  $('.p5-label').show();
			  $('.port-bg').css('background-color', 'white');
			  
			  setTimeout(function() { $('.pu-date-picker').css("display", "none"); }, 300);
			  
			  
		  });
		});	
		
	}
	
	componentWillUnmount() { 
	   window.removeEventListener('load', this.handleLoad)  
	}
	
	handleLoad() {
		console.log("YEAH!");
	 }
	
	render (){
		if(!this.state.allow) return (
			<div className="Underconstruction">
				< Navbar/>
				<header class="bookmark-header-fixed fat bgs">
					<div class="container-fluid yahaha2">     
						<div class="row">
							<div class="col">
								<div class="topDataBk-content text-center">
									<h1 class="name inline">You don't have permission to access this page!</h1>
								</div>
							</div>
						</div>        
					</div>
				</header>
			</div>
		);
		
		return (
			<div className="Portfolio">
				<div class="outer-full port-bg">
					< Navbar/>
				    <div id="inner-fixed-folio-2">
						<div className={this.state.sortableContainer}>
						  <ReactSortable
							list={this.state.list}
							setList={(newState) => this.setState({ list: newState })}
						  >
							{this.state.list.map((item) => (
							  <PortThumb key={item.id} item={item}/>
							))}
						  </ReactSortable>
						</div>
					</div>

				    <div id="inner-remaining-folio">
						<div class="p1-label">
							หัวข้อผลงาน
						</div>
						<form >
							<input class="p-common p1-input form-control" id="search-input" type="search" autocomplete="off" placeholder="กรอกหัวข้อผลงานของคุณ" aria-label="Search"/>
						</form>
						
						<div class="p2-label">
							คำอธิบาย
						</div>
				
						<textarea class="p-common p2-input form-control"  id="w3review" name="w3review" autocomplete="off" placeholder="กรอกคำอธิบายผลงานของคุณ" rows="4" cols="50">
						</textarea>
						
						<div class="p3-label">
							ตำแหน่งงาน<br/>ที่เกี่ยวข้อง
						</div>
						<form >
							<input class="p-common p3-input form-control" id="search-input" type="search" autocomplete="off" placeholder="ระบุตำแหน่งงานของคุณ" aria-label="Search"/>
						</form>
						
				    </div>
					
					<div class="inner-popup-folio">
						<img class="static-popup-arrow" src="assets/images/arrow_down2.png"></img>
						<div class="pu-label">
							ซ่อน
						</div>
						<div class="pu2-label">
							ไฟล์แนบ
						</div>
						<div class="pu-attach" >
						
						</div>
						<img class="popup-file-icon" src="assets/images/file_ic.png"></img>
						<div class="pua-label">
							เพิ่มไฟล์แนบ (สูงสุด 8MB)
						</div>
						<div class="pu3-label">
							วันที่เข้าร่วม /<br/> ได้รับ
						</div>
						<div class="pu-date-picker">
							< BasicDatePickerPort />
						</div>
						<div class="pu4-label">
							ค่าเริ่มต้น : วันที่ผู้ใช้เพิ่มข้อมูลครั้งแรก
						</div>
				    </div>
				  
				    <div id="inner-fixed-folio-3">
						<div class="p4-label">
							ตำแหน่งงาน<br/>ที่เกี่ยวข้อง
						</div>
						
						<img class="static-public-icon spi1 spi-active" src="assets/images/outline_public_black_24dp.png"></img>
						<img class="static-public-icon spi2" src="assets/images/outline_people_black_24dp.png"></img>
						<img class="static-public-icon spi3" src="assets/images/outline_lock_black_24dp.png"></img>
						
						<div class="p5-label">
							ตั้งค่าเพิ่มเติม
						</div>
						<img class="static-footer-arrow" src="assets/images/arrow_up1.png"></img>
						
						<div class="port-buttons">
							<Link to="/home">
								<a class="btn btn-cta-primary round grey margin-right-m port-button" target="_blank">ยกเลิก</a>
							</Link>        
							<a class="btn btn-cta-primary-yellow round port-button" href="#" target="_blank">เพิ่ม</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Portfolio;
