import React from 'react';
import axios from 'axios';
import paths from './imagePaths';
import Header from './header';

class Profile extends React.Component{
  	

  	constructor(props){
  		super(props);
  		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRemoveAdd = this.handleRemoveAdd.bind(this);
		this.handleRemoveCard = this.handleRemoveCard.bind(this);


  		this.state={
  			user:[],
  			username:'',
  			name:'',
  			email:'',
  			phoneno:'',
  			password:'',
  			addObject:[],
  			cardObject:[]
  		}
  	}


  	componentDidMount(){
  		var _this=this;
  		var username = sessionStorage.getItem("username");
  		var route="http://localhost:3000/users/"+username;
  		axios.get(route)
  		.then(function(response){
  			_this.setState({user:response.data})
  			_this.setState({addObject:response.data[0].address})
  			_this.setState({cardObject:response.data[0].card})
  			_this.setState({username:response.data[0].username,name:response.data[0].name,email:response.data[0].email,phoneno:response.data[0].phoneno,password:response.data[0].password})	
  		})
  		.catch(function(error){

  		})
  	}


  	handleChange(e){
		this.setState({[e.target.name]:e.target.value})
	}


  	handleSubmit(e){
		e.preventDefault();
		var _this=this;
		var str = this.state.password;
		
		if(!this.state.name.match(/^[a-zA-Z ]+$/)){
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
		else{
		
			let data={username:_this.state.user[0].username,
			name:_this.state.name,	
			email:_this.state.user[0].email,
			phoneno:_this.state.phoneno,
			password:_this.state.password
			}

			var url = "http://localhost:3000/updateuser"	
			axios.post(url,data)
			.then(function(response){
				_this.setState({usermsg:"Changes are successfully saved"});
				_this.setState({color:"green"});
  				
	  		})
	  		.catch(function(error){

	  		})
					
		}
	}

	handleRemoveAdd(e){
		var _this=this;
		var url="http://localhost:3000/addaddress/remove";
		var data = {
			username:this.state.username,
			address1:e.currentTarget.id
		}

		axios.post(url,data)
		.then(function(response){
			_this.setState({usermsg1:"Address Removed Successfully"})

		})
		.catch(function(error){

		})
	}


	handleRemoveCard(e){
		var _this=this;
		var url="http://localhost:3000/addcard/remove";
		var data = {
			username:this.state.username,
			cardnumber:e.currentTarget.id
		}

		axios.post(url,data)
		.then(function(response){
			_this.setState({usermsg2:"Card Removed Successfully"})

		})
		.catch(function(error){

		})
	}


  	render(){
  		var addresses = [];
  		var _this = this;
  		this.state.addObject.map(function(address){
  			addresses.push(
  				<div className="col-md-4">
		  			<div className="jumbotron" style={{paddingTop:'40px',paddingBottom:'40px'}}>
		  				<b>{address.name}</b><hr/>
		  				{address.address1}<br/>
		  				{address.address2}<br/>
		  				{address.city}<br/>
		  				{address.state}<br/>
		  				{address.pincode}<br/>
		  				{address.phoneno}<br/><br/>		  				
		  				<button id={address.address1} className="btn btn-primary btn-block" onClick={_this.handleRemoveAdd}>Remove</button>
		  			</div>
		  			
		  		</div>
  			)
  		})

  		var cards = [];
  		this.state.cardObject.map(function(card){
  			cards.push(
  				<div className="col-md-4">
		  			<div className="jumbotron" style={{paddingTop:'40px',paddingBottom:'40px'}}>
		  				<b>Card Type: {card.cardtype}</b><br/><br/>
		  				<b>Card No.: {card.cardnumber}</b><br/><br/>
		  				<b>Expiry: {card.expirydate.slice(0,2)}/{card.expirydate.slice(2,6)}</b><br/><br/>
		  				<b>Name On Card: {card.cardname}</b><br/><br/>
		  				<button id={card.cardnumber} className="btn btn-primary btn-block" onClick={_this.handleRemoveCard}>Remove</button>
		  			</div>
		  			
		  		</div>
  			)
  		})



  		if(this.state.user.length!=0){
  			var addaddress='/user/'+sessionStorage.getItem("username")+'/addaddress';
  			var addcard='/user/'+sessionStorage.getItem("username")+'/addcard';

	  		return(
	  			<div className="container">
		      		<Header/>
		      		<div className="container" style={{paddingTop:'150px'}}>
		      			<div className="row"><h1>User Details</h1></div>
				  		<div className="row">
			      			<div className="col-md-4"></div>

			      			<div className="col-md-4">
			      				<form className="form-signin">

							        <h5><b>Username:</b></h5><input type="text" id="inputUsername" name="username" className="form-control" value={this.state.username} disabled/>
							        <br/>
							        <h5><b>Name:</b></h5><input type="text" id="inputName" name="name" className="form-control" onChange={this.handleChange} value={this.state.name} />
							        <br/>
							        <h5><b>Email:</b></h5><input type="text" id="inputAddress" name="email" className="form-control" value={this.state.email} disabled/>
							        <br/>
							        <h5><b>Mobile no.:</b></h5><input type="text" id="inputPhone" name="phoneno" className="form-control" onChange={this.handleChange} value={this.state.phoneno} />
							        <br/>
							        <h5><b>Password:</b></h5><input type="text" id="inputPassword" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
							        <br/>
							        <button id="savechanges" className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Save Changes</button>
							        <h5 className="text-center" style={{color:this.state.color}}>{this.state.usermsg}</h5>
							    
							    </form>
			      			</div>

			      			<div className="col-md-4"></div>
			      		</div>
				  	</div>
				  	<br/>
				  	<hr/>
				  	

				  	<div className="row"><h1>Addresses</h1></div><br/>
				  	<b>{this.state.usermsg1}</b>
				  	<div className="row">
				  		<div className="col-md-4">
				  			<a href={addaddress}>
				  			<div className="jumbotron text-center" style={{paddingTop:'100px',paddingBottom:'100px'}}>
				  				<span className="glyphicon glyphicon-plus text-center" style={{fontSize:'50px'}}></span>
				  			</div>
				  			</a>
				  		</div>
				  		{addresses}

				  	</div>
				  	<br/>
				  	<hr/>
				  	<br/>


				  	<div className="row"><h1>Card Details</h1></div><br/>
				  	<b>{this.state.usermsg2}</b>
				  	<div className="row">
				  		<div className="col-md-4">
				  			<a href={addcard}>
				  			<div className="jumbotron text-center" style={{paddingTop:'70px',paddingBottom:'70px'}}>
				  				<span className="glyphicon glyphicon-plus text-center" style={{fontSize:'50px'}}></span>
				  			</div>
				  			</a>
				  		</div>
				  		{cards}

				  	</div>



				</div>
			)	
		}else{
			return(
				<div className="container">
					<Header />
				</div>
			)
		}			
			
  }	

}
  export default Profile;