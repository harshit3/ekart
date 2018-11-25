import React from 'react';
import paths from './imagePaths';
import Header from './header';
import axios from 'axios';

class Cart extends React.Component{
	constructor(props){
	    super(props);
	 	this.handleRemove = this.handleRemove.bind(this);
	  
	 	this.state={
      cartItems:[]
    }
	}
  

	componentDidMount(){
    var _this = this;
		var cartObj = localStorage.getItem("cart")
		if(cartObj===null){
		  this.setState({cartItems:[]})
	 	}
  	else{
    	cartObj=JSON.parse(cartObj);
      // console.log("cartObj",cartObj)
      
      var url="http://localhost:3000/products/cart";
      let data={
        cartObj:cartObj
      }
      axios.post(url,data)
      .then(function(response){
        // console.log("response",response.data)
        _this.setState({cartItems:response.data});
        // console.log("response",response.data);
      })
      .catch(function(error){

      })
	 	}
	}


 	handleRemove(e){
 		var prod_id=parseInt(e.currentTarget.id);
		var cartObj = JSON.parse(localStorage.getItem("cart"))
		var removeIndex = cartObj.map(function(item){return item.prodid}).indexOf(prod_id)
		cartObj.splice(removeIndex,1);
		this.setState({cartObject:cartObj});
		localStorage.setItem("cart",JSON.stringify(cartObj));
    document.location.reload();
	}


 render(){
  // console.log(localStorage.getItem("cart"));
  var totalAmount;
  var _this=this;
  if(this.state.cartItems.length===0){
    totalAmount = 0;  
  }
  else{
    totalAmount = 0;
    var ekartprice;
    this.state.cartItems.map(function(object){
      ekartprice =  object.product.price-object.product.price*(object.product.discount/100);
      totalAmount = totalAmount + parseInt(ekartprice*object.user_quantity);
    })  
  }
  
 
  if(totalAmount>0){
    var _this = this;
    return(
    <div className="container">
      <Header/>
      <div class="container" style={{paddingTop:'160px'}}>
      <div style={{color:'red'}}><b>Please LogIn to checkout</b></div>
        <div class="row">
            <h2>Shopping Cart</h2>
        </div>    
        <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-2"></div>
            <div class="col-md-2"><strong>Category</strong></div>
            <div class="col-md-2"><strong>Quantity</strong></div>
            <div class="col-md-2"><strong>Price</strong></div>
            <div class="col-md-2"></div>
        </div>  
        <hr/> 
        {
         this.state.cartItems.map(function(object){
          var url1=paths.filter(function(data){
            if(object.product.prod_id===data.prod_id){
              return data.path;
            }
            return null;
          });

          var ekartprice =  Math.round(object.product.price-object.product.price*(object.product.discount/100));
          var route='/products/'+object.product.prod_id;

          return(
            <div>
            <div class="row" id={object.product.prod_id+''}>
               <div class="col-md-2"><a href={route}><img src={url1[0].path} height='80px' width='80px' /></a></div>
               <div class="col-md-2"><a href={route}><strong>{object.product.name}</strong></a></div>
               <div class="col-md-2">{object.product.category}</div>
               <div class="col-md-2">{object.user_quantity}</div>
               <div class="col-md-2">{ekartprice*object.user_quantity}</div>
               <div class="col-md-2"><button id={object.product.prod_id+''} class="btn btn-danger" onClick={_this.handleRemove}>Remove</button></div>
            </div>
            <hr/>
            </div>
          )
         })
        }

        <br/>
        <div class="text-right">
        	<strong>Total Amount: Rs.{totalAmount}</strong><br/>
        </div>
      
      </div>
    </div>  
   )
  }
  else{
    return(
      <div className="container">
        <Header/>
        <div class="container" style={{paddingTop:'160px'}}>
          <h1>Your Cart Is Empty</h1>
        </div>
      </div>  
    )
   
  }
 }
}

export default Cart;
