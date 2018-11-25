import React from 'react';
import axios from 'axios';
import Header from './header';

class AddCard extends React.Component{

	constructor(props){
		super(props);
		this.state={
			cardtype:'',
			cardnumber:"",
			expirydate:"",
			cardname:''
		}
		this.handleChange = this.handleChange.bind(this);
		// this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	handleChange(e){
		this.setState({[e.target.name]:e.target.value})
	}


	handleSubmit(e){
		e.preventDefault();
		var _this=this;
		this.state.cardtype = document.getElementById("cardtype").value;
		
		if(document.getElementById("cardtype").value==="Type"){
			_this.setState({usermsg:"Please select a card type"});
			_this.setState({color:"red"});	
		}

		else if((this.state.cardnumber==='') || (this.state.expirydate==='') || (this.state.cardname==='')){
			_this.setState({usermsg:"All fields are required"});
			_this.setState({color:"red"});
		}

		else if(this.state.cardnumber.length!=16){
			_this.setState({usermsg:"Invalid card number"});
			_this.setState({color:"red"});
		}

		else if(!this.state.cardname.match(/^[a-zA-Z ]+$/)){
			_this.setState({usermsg:"Name must be alphabetic"});
			_this.setState({color:"red"});
		}

		else{

			var month=parseInt(this.state.expirydate.slice(0,2));
			var year=parseInt(this.state.expirydate.slice(2,6));

			var currMonth = new Date().getMonth()+1;
			var currYear = new Date().getYear()+1900;
			if(this.state.expirydate.length!=6){
				_this.setState({usermsg:"Required expiry date format: MMYYYY"});
				_this.setState({color:"red"});	
			}

			else if(month<=0 || month>12){
				_this.setState({usermsg:"Invalid Month"});
				_this.setState({color:"red"});
			}
			else if(year<currYear){
				_this.setState({usermsg:"Invalid Expiry"});
				_this.setState({color:"red"});
			}
			else if(year==currYear && month<currMonth){
				_this.setState({usermsg:"Invalid Expiry"});
				_this.setState({color:"red"});
			}
			else{
				const data={
					username:sessionStorage.getItem("username"),
					card:{
						cardtype:this.state.cardtype,
						cardnumber:parseInt(this.state.cardnumber),
						expirydate:this.state.expirydate,
						cardname:this.state.cardname
					}
				}

				var route="http://localhost:3000/addcard";
			
				axios.post(route,data)
				.then(function(response){
					_this.setState({usermsg:"Card Added Successfully"});
					_this.setState({color:"green"});	
				})
				.catch(function(error){

				})
	
			}



			
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

						        <h3 className="form-signin-heading text-center">Card Details</h3>
						        <br/><br/>

						        <div>
						        	<b style={{display:'inline-block'}}>Card Type:</b>&nbsp;&nbsp;
							        <select id="cardtype" style={{display:'inline-block'}}>
							        	<option value="Type">Card Type</option>
							        	<option value="Credit">Credit</option>
							        	<option value="Debit">Debit</option>
							        </select>
							    </div>

						        
						        <br/>
						        <br/>

						        <div>
						        	<b>Card Number:</b>
						    	    <input type="text" id="inputCardnumber" name="cardnumber" className="form-control" placeholder="Card Number" onChange={this.handleChange}/>
						        	<br/>
						        </div>
						        <br/>

						        <div>
						        	<b>Expiry Date:</b>	
						        	<input type="text" id="inputExpirydate" name="expirydate" className="form-control" placeholder="MMYYYY" onChange={this.handleChange}/>
						        	<br/>
								</div>	

								<div>
						        	<b>Name on card:</b>	
						        	<input type="text" id="inputCardName" name="cardname" className="form-control" placeholder="Name On Card" onChange={this.handleChange}/>
						        	<br/>
								</div>						        
						        
						        <button id="addcard" className="btn btn-lg btn-primary btn-block" onClick={this.handleSubmit}>Add Card</button>
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

export default AddCard;