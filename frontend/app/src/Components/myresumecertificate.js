import React, { Component } from "react";
import { useHistory } from 'react-router-dom';
import cookie from 'react-cookies';

class MyresumeCertificateComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {Number : 0}
        this.makeTimer()
      }
      
    makeTimer(){
        setInterval(() => {
            let rand = this.state.Number;
            /*console.log(rand)*/;
            rand += 1;
            rand = rand%3;
            this.setState({Number: rand})
        }, 20000)
    }
    callname() {
        console.log("gotclick!");
    }
    render(){
        const linestyle = {
            backgroundColor: this.props.colour? this.props.colour: "#FFCE55"
        };
        const colourcode = this.props.colour? this.props.colour : "#FFCE55";
        const bordercode = "0.5vw solid " + colourcode;
        const boxcolourstyle = {
            border: bordercode,
        };
        let data = this.props.data;
        const mode = this.props.seq? this.props.seq: 0;
        let content = []
        let classofcert;
        if((mode%2)===0){
            classofcert = "cert-element-w";
            content.push(
                <div class="cert-info-w">
                    <div class="cert-info-w-background" style={linestyle}></div>
                    <div class="cert-item">
                        <h3>
                            {data.CertName}
                        </h3>
                        <h4>
                            {data.CertYear}
                        </h4>
                    </div>
                </div>
            );
            content.push(
                <div class="cert-image">
                    <div class="cert-img">
                    <img
                        src={data.CertPic}
                    />
                    </div>
                </div>
            );
            content.push(
                <div class="cert-info-w">
                    <div class="cert-info-w-background" style={linestyle}></div> 
                    <div class="cert-item">
                        <h3>
                            {data.CertName}
                        </h3>
                        <h4>
                            {data.CertYear}
                        </h4>
                    </div>
                </div>
            );
        }
        else{
            classofcert = "cert-element-c";
            content.push(
                <div class="cert-info-c" style={linestyle}>
                    <div class="cert-item">
                        <h3>
                            {data.CertName}
                        </h3>
                        <h4>
                            {data.CertYear}
                        </h4>
                    </div>
                </div>
            );
            content.push(
                <div class="cert-info-c" style={linestyle}>
                    <div class="cert-item">
                        <h3>
                            {data.CertName}
                        </h3>
                        <h4>
                            {data.CertYear}
                        </h4>
                    </div>
                </div>
            );
            content.push(
                <div class="cert-image">
                    <div class="cert-img">
                        <img
                            src={data.CertPic}
                        />
                    </div>
                </div>
            );
        }
        const modalID = "modalofcert" + mode;
        const callmodalID = "#" + modalID;
        return (
            <div class="cert-box" data-bs-toggle="modal" data-bs-target={callmodalID}>
                <div class={classofcert}>
                    <div class="cert-child">{content[this.state.Number]}</div>
                </div>
                <div class="cert-overlay">
                    <div class="cert-overlaybox">  
                        <div class="cert-overlayitem">
                            <h3>
                                {data.CertName}
                            </h3>
                            <h4>
                                {data.CertYear}
                            </h4>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id={modalID} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered cert-modal-dialog" >
                        <div class="cert-modal">
                            <div class="cert-modal-header">
                                <button type="button" class="btn-close cert-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body cert-modal-body">
                                <img class="cert-modal-image"
                                        src={data.CertPic} style={boxcolourstyle}
                                />
                                <div class="cert-modal-discription">
                                    <h2 class="cert-modal-name">{data.CertName}</h2>
                                    <p class="cert-modal-year">{data.CertYear}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
                
        )
    }
}


class MyresumeCertificate extends React.Component{
    handleRoute = () =>{ 
        cookie.save('Edit_tabselect',4);
        window.location = ("editresume");
    }
    render(){
        const colour = this.props.colour? this.props.colour: "#FFCE55";
        const linestyle = {
            backgroundColor: colour
        };
        const owner = this.props.owner? this.props.owner : false;
        const occupation = this.props.occupation? this.props.occupation: "?????????";
        const data = this.props.data? this.props.data: [];
        data.sort((a, b) => (a.CertYear < b.CertYear) ? 1 : -1)
        let content = [];
        let topicElement = [];
        if(data.length !== 0){
            topicElement.push(<div class="educationtopic"><h2 class="resumetopic">??????????????????????????????????????????????????????????????????</h2></div>);
            topicElement.push(<div class="resumesectionline" style={linestyle}></div>);
            for (var i = 0; i < data.length; i++) {
                content.push(<div class="cert-column"><MyresumeCertificateComponent data={data[i]} colour={colour} seq={i}></MyresumeCertificateComponent></div>);
                console.log(data[i]);
            }
        }
        else if(owner){
            topicElement.push(<div class="educationtopic"><h2 class="resumetopic">??????????????????????????????????????????????????????????????????</h2></div>);
            topicElement.push(<div class="resumesectionline" style={linestyle}></div>);
            content = [
                (<div class="cert-column">
                    <div class="cert-dummybox cert-dummy-w">
                        <div class="cert-dummytext cert-dummy-w">
                            <h3>????????????????????????????????????</h3>
                            <h4>?????????????????????????????????</h4>
                        </div>    
                    </div>   
                </div>),
                (<div class="cert-column">
                    <div class="cert-dummybox cert-dummy-d">
                        <div class="cert-dummytext cert-dummy-d">
                            <h3>????????????????????????????????????</h3>
                            <h4>?????????????????????????????????</h4>
                        </div>
                    </div>
                </div>),
                (<div class="cert-column">
                    <div class="cert-dummybox cert-dummy-w">
                        <div class="cert-dummytext cert-dummy-w">
                            <h3>????????????????????????????????????</h3>
                            <h4>?????????????????????????????????</h4>
                        </div>
                    </div>
                </div>),
                (<div class="cert-dummy-edit">
                    <div class="cert-edit"><p>???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????? ?????????????????????????????????????????????????????????</p>
                    <button onClick={this.handleRoute}>?????????????????????????????????</button></div>
                </div>)
            ]
        }
        let result;
        if(data.length !== 0 || owner){
            result = (
                <div class="certificate-data" >
                {topicElement}
                <div class="cert-show">
                    <div class="cert-row">
                        {content}
                    </div>
                </div>
            </div>
            );
        }
        else{
            result = (
                <div></div>
            );
        }
        return(
            <div id="resume-certificate">
                <br/>
                {result}
            </div>
        );     
    }
} 

export default MyresumeCertificate;