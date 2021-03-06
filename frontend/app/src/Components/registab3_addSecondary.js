import React from 'react';
import './registab3.css'
import './register.css'

class Registab3_addSecondary extends React.Component {
	render (){
		return (
			<div className="Registab3_addSecondary">
				
                <form  id='SecondaryForm'>
                    <div class='col-5' >
                        <div class="selectDropdown">
                            <select class="form-select form-select-lg dropbtn margin-bottom1 fff" id='regis3_selectdropdown2' aria-labelledby="select1"  value='' required>
                                <option selected disabled value='เลือกวุฒิการศึกษา<'>เลือกวุฒิการศึกษา</option>
                                <option value='มัธยมศึกษาปีที่ 1' >มัธยมศึกษาปีที่ 1</option>    
                                <option value='มัธยมศึกษาปีที่ 2' >มัธยมศึกษาปีที่ 2</option>
                                <option value='มัธยมศึกษาปีที่ 3' >มัธยมศึกษาปีที่ 3</option>
                                <option value='มัธยมศึกษาปีที่ 4' >มัธยมศึกษาปีที่ 4</option>
                                <option value='มัธยมศึกษาปีที่ 5' >มัธยมศึกษาปีที่ 5</option>
                                <option value='มัธยมศึกษาปีที่ 6' >มัธยมศึกษาปีที่ 6</option>
                            </select>
                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-12 ">
                            <input type="text" class="form-control dropbtn margin-bottom1 " id="ValidationSchoolFeedback" placeholder="สถานศึกษา*" required></input>
                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-8 ">
                            <input type="text" class="form-control dropbtn margin-bottom1 " id="ValidationCourseFeedback"  placeholder='หลักสูตร/แผนการเรียน' required></input>
                        </div>
                        <div class="col-4">
                            <div class='row'>
                                <div class='col'> 
                                    <h5 id='registab4_textGrade'>เกรดเฉลี่ยรวม</h5>
                                </div>
                                <div class='col-7 ms-auto'> 
                                    <input type="text" class="form-control dropbtn margin-bottom1 " id="ValidationGradeFeedback" placeholder="XX.X" required></input>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class='col-3' >
                        <div class="selectDropdown">
                            <select class="form-select form-select-lg dropbtn_year margin-bottom1 fff" id='year_secondary' aria-labelledby="select1" required>
                                <option selected disabled value=''>ปีที่จบการศึกษา</option>
                                <option>กำลังศึกษา</option>
                            </select>
                            <br/>
                        </div>               
                    </div>
                </form>
			</div>
			
		);
	}
}

export default Registab3_addSecondary;