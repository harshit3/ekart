import React from 'react';
import axios from 'axios';
import Header from './header';

class AddAddress extends React.Component{

	constructor(props){
		super(props);
		this.state={
			name:'',
			address1:"",
			address2:"",
			city:"",
			state:"",
			pincode:"",
			phoneno:"",
			usermsg:''
		}
		this.handleChange = this.handleChange.bind(this);
		// this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	// handleChangeUsername(e){
	// 	var _this=this;
	// 	this.setState({[e.target.name]:e.target.value})
	// 	var route = "http:localhost:3000/users/"+e.target.value;
	// 	console.log("username:",e.target.value);
	// 	axios.get(route)
	// 	.then(function(response){
	// 		if(response.data.length===0){
	// 			
	// 			document.getElementById("signup").disabled=false;
	// 		}
	// 		else{
	// 			
	// 			document.getElementById("signup").disabled=true;
	// 		}
	// 	})
	// 	.catch(function(error){

	// 	})
	// }


	handleChange(e){
		this.setState({[e.target.name]:e.target.value})
	}


	handleSubmit(e){
		e.preventDefault();
		var _this=this;
		if((this.state.name==='') || (this.state.address1==='') || (this.state.address2==='') || (this.state.city==='') || (this.state.state==='') || (this.state.pincode==='') || (this.state.phoneno==='')){
			_this.setState({usermsg:"All fields are required"});
			_this.setState({color:"red"});
		}
		else if(!this.state.name.match(/^[a-zA-Z ]+$/) || !this.state.city.match(/^[a-zA-Z ]+$/) || !this.state.state.match(/^[a-zA-Z ]+$/)){
			_this.setState({usermsg:"Name,City & State must be alphabetic"});
			_this.setState({color:"red"});
		}
		else if(!this.state.pincode.match(/^[0-9]{6}$/)){
			_this.setState({usermsg:"Enter a valid 6-digit pincode"});
			_this.setState({color:"red"});
		}

		else if(!this.state.phoneno.match(/^[0-9]{10}$/)){
			_this.setState({usermsg:"Invalid mobile number"});
			_this.setState({color:"red"});
		}
		
		else{

			const data={
				username:sessionStorage.getItem("username"),
				name:this.state.name,
				address1:this.state.address1,
				address2:this.state.address2,
				city:this.state.city,
				state:this.state.state,
				pincode:this.state.pincode,
				phoneno:this.state.phoneno
			}

			var route="http://localhost:3000/addaddress";
		
			axios.post(route,data)
			.then(function(response){
				_this.setState({usermsg:"Address Added Successfully"});
				_this.setState({color:"green"});	
			})
			.catch(function(error){

			})

		}
	}



	render() {
	    return (
	      	<div className="container">
	      		<Header/>
	      		<div className="container" style={{paddingTop:'160px'}}>
		      		<div className="row">
		      			<div className="col-md-4"></div>

		      			<div className="col-md-4">
		      				<form className="form-signin">

						        <h3 className="form-signin-heading text-center">Address Details</h3>
						        <br/>
						        
						        <input type="text" id="inputName" name="name" className="form-control" placeholder="Name" onChange={this.handleChange}/>
						        <br/>
						        <input type="text" id="inputAddress1" name="address1" className="form-control" placeholder="Address1" onChange={this.handleChange}/>
						        <br/>
						        <input type="text" id="inputAddress2" name="address2" className="form-control" placeholder="Address2" onChange={this.handleChange}/>
						        <br/>
						        <input type="text" id="inputCity" name="city" className="form-control" placeholder="City" onChange={this.handleChange} />
						        <br/>
						        <input type="text" id="inputState" name="state" className="form-control" placeholder="State" onChange={this.handleChange} />
						        <br/>
						        <input type="text" id="inputPincode" name="pincode" className="form-control" placeholder="Pincode" onChange={this.handleChange} />
						        <br/>
						        <input type="text" id="inputPhone" name="phoneno" className="form-control" placeholder="Mobile Number" onChange={this.handleChange}/>
						        <br/>
						        
						        <button id="addaddress" className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Add Address</button>
						        <h5 className="text-center" style={{color:this.state.color}}>{this.state.usermsg}</h5>
						    	<br/><br/>
						    </form>
		      			</div>

		      			<div className="col-md-4"></div>
		      		</div>
		      	</div>	
		      
		    </div>
	    );
  	}

}

export default AddAddress;