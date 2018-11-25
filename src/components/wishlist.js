import React from 'react';
import paths from './imagePaths';
import Header from './header';
import axios from 'axios';

class Wishlist extends React.Component{
	constructor(props){
	   super(props);
	 	this.handleRemove = this.handleRemove.bind(this);
		  
		this.state={
		    user:[],
		    wishlistObject:[],
		    wishlistItems:[]
		}
	}
  

	componentDidMount(){
	    var _this=this;
	    var username = sessionStorage.getItem("username");
	    var route="http://localhost:3000/users/"+username;
	    axios.get(route)
	    .then(function(response){
	      	_this.setState({user:response.data})
	      	_this.setState({wishlistObject:response.data[0].wishlist})
	      	const data={
	      		username:response.data[0].username,
	      		wishlistObject:response.data[0].wishlist
	      	}
	      	var url="http://localhost:3000/products/wishlist"
	      	axios.post(url,data)
	      	.then(function(response){
	      		console.log("response",response.data)
	      		_this.setState({wishlistItems:response.data});
	      	})
		    .catch(function(error){

		    })
	    })
	    .catch(function(error){

	    })
	}

 	handleRemove(e){
 		var _this=this;
 		var prod_id=parseInt(e.currentTarget.id);
		var wishlistObject = this.state.wishlistObject
		const data = {
			username:this.state.user[0].username,
			prodid:prod_id
		}
		var url="http://localhost:3000/addtowishlist/remove";
		axios.post(url,data)
		.then(function(response){
			_this.componentDidMount();
		})
		.catch(function(error){

		})
		
	}


	render(){
				 
		if(this.state.wishlistItems.length>0){
		    var _this = this;
		   	return(
			    <div className="container">
			    <Header/>
			    <div className="container" style={{paddingTop:'160px'}}>
			    	<div className="row">
			            <h2>Your Wishlist</h2>
			        </div>    
			        <br/>
			        <div className="row">
			            <div className="col-md-2"></div>
			            <div className="col-md-2"><strong>Name</strong></div>
			            <div className="col-md-2"><strong>Category</strong></div>
			            <div className="col-md-2"></div>
			            <div className="col-md-2"></div>
			            <div className="col-md-2"></div>
			        </div>  
			        <hr/> 
			        {
			        	this.state.wishlistItems.map(function(product){
				          	var url1=paths.filter(function(data){
				            if(product.prod_id===data.prod_id){
				            	return data.path;
				            }
				            return null;
				          	});

				          	var route='/products/'+product.prod_id;

				          	return(
				            <div>
				            <div className="row" id={product.prod_id+''}>
				               <div className="col-md-2"><a href={route}><img src={url1[0].path} height='80px' width='80px' /></a></div>
				               <div className="col-md-2"><a href={route}><strong>{product.name}</strong></a></div>
				               <div className="col-md-2">{product.category}</div>
				               <div className="col-md-2"></div>
				               <div className="col-md-2"><button id={product.prod_id+''} className="btn btn-danger" onClick={_this.handleRemove}>Remove</button></div>
				            </div>
				            <hr/>
				            </div>
				          	)
				        })
			        }

			        <br/>
			     
			      
			      </div>
			    </div>  
			   )
		}
		else{
		    return(
		      <div className="container">
		        <Header/>
		        <div className="container" style={{paddingTop:'160px'}}>
		          <h1>Your Wishlist Is Empty</h1>
		        </div>
		      </div>  
		    )
		   
		}
	}
}

export default Wishlist;
