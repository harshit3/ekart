import React from 'react';
import axios from 'axios';
import paths from './imagePaths';
import Header from './header';

class Checkout extends React.Component{
  	

  	constructor(props){
  		super(props);
  		
  		this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
  		this.handleRemoveAdd = this.handleRemoveAdd.bind(this);
		this.handleRemoveCard = this.handleRemoveCard.bind(this);

  		this.state={
  			user:[],
  			username:'',
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
  			_this.setState({user:response.data,username:response.data[0].username})
  			_this.setState({addObject:response.data[0].address})
  			_this.setState({cardObject:response.data[0].card})
  		})
  		.catch(function(error){

  		})

  		this.setState({totalAmount:parseInt(JSON.parse(sessionStorage.getItem("totalAmount")))});
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



  	handlePlaceOrder(e){
  		var _this=this;
  		var address=document.querySelector('input[name="address"]:checked');
  		var cardnumber=document.querySelector('input[name="card"]:checked');
  		
  		if(address==null){
  			this.setState({usermsg:"Select a shipping address"});
  			this.setState({color:'red'});
  		}else if(cardnumber==null){
  			this.setState({usermsg:"Select a card for payment"});
  			this.setState({color:'red'});
  		}else{
  			address=address.value;
  			cardnumber=cardnumber.value;
  			this.setState({usermsg:"Order Placed Successfully"});
  			this.setState({color:'green'});
  			setTimeout(function(){
  				_this.props.history.push('/user/'+_this.state.username)	
  			},3000)	
		}

  	}


  	render(){
  		var addresses = [];
  		var _this = this;
  		this.state.addObject.map(function(address){
  			addresses.push(
  				<div className="col-md-4">
		  			<div className="jumbotron" style={{paddingTop:'40px',paddingBottom:'40px'}}>
		  				<input type="radio" name="address" value={address.address1} /><br/>
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
		  				<input type="radio" name="card" value={card.cardnumber} /><br/>
		  				<b>Card Type: {card.cardtype}</b><br/><br/>
		  				<b>Card No.: {card.cardnumber}</b><br/><br/>
		  				<b>Expiry: {card.expirydate.slice(0,2)}/{card.expirydate.slice(2,6)}</b><br/><br/>
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

					  	<div className="row"><h1>Select Shipping Address&nbsp;&nbsp;<span className="glyphicon glyphicon-map-marker"></span></h1></div>
					  	<br/>
					  	<br/>
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


					  	<div className="row"><h1>Select Card&nbsp;&nbsp;<span className="glyphicon glyphicon-credit-card"></span></h1></div>
					  	<br/><br/>
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
					  	<div class="text-right">
				        	<strong><h3>Total Amount: Rs.{this.state.totalAmount}</h3></strong><br/>
				          	<button class="btn btn-success btn-block" onClick={this.handlePlaceOrder}>Place Order</button> 
				          	<h5 className="text-center" style={{color:this.state.color}}>{this.state.usermsg}</h5>
						  	<br/><br/>      
				        </div>	

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
  export default Checkout;