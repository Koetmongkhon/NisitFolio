import React from 'react';
import './register.css';
import Ddt7 from './dropdownt7';
import SelectSS7 from './dropsideskill';
import $ from 'jquery';

class Registab7 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		  sideskillName: "",
		  checkstatust7: false
		};
	  }
	  onInputChage = value => {
		this.setState({
			sideskillName: value,
			checkstatust7: true
		});
		console.log("I am Parent component. I got", value, "from my child.");
		console.log("I am",this.state.checkstatust7);
	  };

	  componentDidMount(){
      if(this.state.checkstatust7){
		var sideskilldropdown1 = '<div class="container-fluid dropbtn-box form-f " id="ssl_1">\
		<div class="row">\
		  <div class="col-10">\
			<a class="textT7B">\
			';
		var sideskilldropdown2_1 = '</a>\
			</div>\
			';
		$('.dropdowntab7').append(sideskilldropdown1+this.state.sideskillName+sideskilldropdown2_1);
	  }
  }
	render (){
		return (
			<div className="Registab7">
				<div class="regis-box-content7" id="yyy">
					<h1 id="text-add-name-ss">เพิ่มทักษะเสริมที่ถนัด</h1>
					<div class="transition-component" id="cross-fadegone7">
                        <img class="registab3_btnplus icon-plus-circleA bottom" type='button' src="assets/images/add_hover.png"></img>
                        <img class="registab3_btnplus icon-plus-circleA top" type='button' id='add_sideskill' src="assets/images/add_black.png"></img>
                    </div>
					<div class="dropdowntap7"></div>
					<Ddt7 onChange={this.onInputChage}/>
					<Ddt7 onChange={this.onInputChage}/>
					<Ddt7 onChange={this.onInputChage}/>
					<span>Table:{this.state.sideskillName}</span>
					<div class="modal fade" id="Modaltab7" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered">
							<div class="modal-content minisize">
								<h4 class="del-b">คุณต้องการลบทักษะเสริม ?</h4>
								<div class="centerverify">
										<a type="button" class="btn btn-cta-primary-svshort round profile-button grey margin-right-m" data-bs-dismiss="modal">ยกเลิก</a>
										<a type="button" class="btn btn-cta-primary-yellowshort profile-button round" id="del_sideskill" data-bs-dismiss="modal">ลบ</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Registab7;