import React from 'react';
import axios from 'axios';
import Header from './header';


class Login extends React.Component{

	constructor(props){
		super(props);
		this.state={
			username:"",
			password:"",
			errMessage:"",
			color:'',
			user:[]	
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}	


	handleChange(e){
		this.setState({[e.target.name]:e.target.value})
	}


	handleSubmit(e){
		e.preventDefault();
		var _this=this;
		if((this.state.username==='') || (this.state.password==='')){
			this.setState({errMessage:'Both fields are required'});
		}
		else{
			var route="http://localhost:3000/users/"+this.state.username;
			axios.get(route)
			.then(function(response){
				_this.setState({user:response.data})
				if(response.data.length===0){
					_this.setState({errMessage:"Invalid Username"})	
					_this.setState({color:"red"})	
				}
				else if(_this.state.password === response.data[0].password){
					_this.setState({user:response.data});
					sessionStorage.setItem("username",response.data[0].username)
					sessionStorage.setItem("isLoggedIn",true)					
					var url='/user/'+response.data[0].username;				
					_this.props.history.push(url);
				}
				else{
					_this.setState({errMessage:"Sorry wrong password"})
				}
			})
			.catch(function(error){

			})

		}
	}

	render() {
		console.log("error:",this.state.errMessage);
		console.log("session",JSON.parse(sessionStorage.getItem("isLoggedIn")));

	    return (
	    	<div className="container">
	      		<Header/>
		      	<div className="container" style={{marginTop:'160px'}}>
		      		<div className="row">
		      			<div className="col-md-4"></div>

		      			<div className="col-md-4">
		      				<form className="form-signin" onSubmit={this.handleSubmit}>
						        <h4 className="form-signin-heading text-center">Sign in to continue to shopping</h4>
						        <br/>
						        <input type="text" name="username" className="form-control" placeholder="Username" onChange={this.handleChange} required autoFocus/>
						        <br/>
						        <input type="password" name="password" className="form-control" placeholder="Password" onChange={this.handleChange} required/>
						        <br/>
						        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
						        <div className="text-center">{this.state.errMessage}</div>
						    </form>
		      			</div>

		      			<div className="col-md-4"></div>
		      		</div>
			      
			    </div>
			</div>    
	    );
  	}

}


export default Login;