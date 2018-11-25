import React from 'react';
import axios from 'axios';
import Header from './header';

class Signup extends React.Component{

	constructor(props){
		super(props);
		this.state={
			username:"",
			name:'',
			email:"",
			phoneno:"",
			password:"",
			cnfpwd:"",
			usermsg:"",
			color:""
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
		var str = this.state.password;
		if((this.state.username==='') || (this.state.email==='') || (this.state.phoneno==='') || (this.state.password==='') || (this.state.cnfpwd==='')){
			_this.setState({usermsg:"All fields are required"});
			_this.setState({color:"red"});
		}
		else if(!this.state.name.match(/^[a-zA-Z ]+$/)){
			_this.setState({usermsg:"Name must be alphabetic"});
			_this.setState({color:"red"});
		}
		
		else if(!this.state.phoneno.match(/^[0-9]{10}$/)){
			_this.setState({usermsg:"Invalid mobile number"});
			_this.setState({color:"red"});
		}
		
		else if(!(str.match(/[A-Z]+/) && str.match(/[a-z]+/) && str.match(/[0-9]+/) && str.match(/(\W)+/))){
			_this.setState({usermsg:"Password should contain at least an uppercase and a lowercase character, a number and a special character"});
			_this.setState({color:"red"});
		}
		
		else if(this.state.password != this.state.cnfpwd){
			_this.setState({usermsg:"Password and Confirm Password Does Not Match"});
			_this.setState({color:"red"});
		}	

		else{
			var route="http://localhost:3000/users/"+this.state.username;
		
			axios.get(route)
			.then(function(response){
				if(response.data.length===0){
					let data={username:_this.state.username,
					name:_this.state.name,	
					email:_this.state.email,
					phoneno:_this.state.phoneno,
					password:_this.state.password
				}
				var url = "http://localhost:3000/usersignup"	
				axios.post(url,data)
				.then(function(response){
					_this.setState({usermsg:"You are successfully registered. You can login now"});
					_this.setState({color:"green"});
	  				
		  		})
		  		.catch(function(error){

		  		})
					
				}

				else{
					_this.setState({usermsg:"Username not available"});
					_this.setState({color:"red"});
				}
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

						        <h3 className="form-signin-heading text-center">Register</h3>
						        <br/>
						        <input type="text" id="inputUsername" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} value={this.state.username} autoFocus/>
						        <br/>
						        <input type="text" id="inputName" name="name" className="form-control" placeholder="Name" onChange={this.handleChange} value={this.state.name} />
						        <br/>
						        <input type="text" id="inputAddress" name="email" className="form-control" placeholder="Email Address" onChange={this.handleChange} value={this.state.email} />
						        <br/>
						        <input type="text" id="inputPhone" name="phoneno" className="form-control" placeholder="Phone Number" onChange={this.handleChange} value={this.state.phoneno} />
						        <br/>
						        <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" onChange={this.handleChange} />
						        <br/>
						        <input type="password" id="inputConfPass" name="cnfpwd" className="form-control" placeholder="Confirm Password" onChange={this.handleChange} />
						        <br/>
						        <button id="signup" className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Sign up</button>
						        <h5 className="text-center" style={{color:this.state.color}}>{this.state.usermsg}</h5>
						    
						    </form>
		      			</div>

		      			<div className="col-md-4"></div>
		      		</div>
		      	</div>	
		      
		    </div>
	    );
  	}

}

export default Signup;