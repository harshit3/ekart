import React from 'react';
import paths from './imagePaths';
import Header from './header';
import axios from 'axios';

class UserCart extends React.Component{
	constructor(props){
	 super(props);
	 	this.handleRemove = this.handleRemove.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
	  
	 	this.state={
      user:[],
      userCart:[],
      localCart:[],
      finalCart:[]
    }
	}
  

	componentDidMount(){
		var _this=this;
    var finalCart;
    var route="http://localhost:3000/users/"+sessionStorage.getItem("username");
    if(localStorage.getItem("cart") === null){
      localStorage.setItem("cart",[]);
    }
    axios.get(route)
    .then(function(response){

      var url="http://localhost:3000/products/cart"
      var data={
        cartObj:response.data[0].cart
      }
      axios.post(url,data)
      .then(function(response1){
        if(response1.data.length===0){
          finalCart=[]
        }else{
          finalCart=response1.data; 
          // console.log("fc",finalCart);
        }
        
        // console.log("finalCart1",finalCart);
        _this.setState({userCart:response1.data,finalCart:finalCart})
      })
      .catch(function(error){

      })

      if(localStorage.getItem("cart")!==null){
        // console.log("not null")
        url="http://localhost:3000/products/cart"
        data={
          cartObj:JSON.parse(localStorage.getItem("cart"))
        }

        axios.post(url,data)
        .then(function(response2){
          // console.log("response2",response2.data)
          response2.data.map(function(localprod){
            
            var index= finalCart.map(function(item){return item.prodid}).indexOf(localprod.prodid);
            // console.log(index);
            if(index!==-1){  
              if(finalCart[index].user_quantity+localprod.user_quantity>4){
                finalCart[index].user_quantity = 4;
              }else{
                finalCart[index].user_quantity = finalCart[index].user_quantity+localprod.user_quantity;
              }
            }else{
              finalCart.push(localprod);
            }
            // console.log("finallCart2",finalCart);
          })
          _this.setState({finalCart:finalCart,localCart:response2.data});
        })
        .catch(function(error){

        });  
      }

      _this.setState({user:response.data,userCart:response.data[0].cart})
    
    })
    .catch(function(error){

    })
	}



 	handleRemove(e){
 		var prod_id=parseInt(e.currentTarget.id);

    console.log("user",this.state.user[0])
    const data = {
      username:sessionStorage.getItem("username"),
      prodid:prod_id
    }

    var url="http://localhost:3000/addtocart/remove";
    axios.post(url,data)
    .then(function(response){
      
    })
    .catch(function(error){

    })

    var cartObj = JSON.parse(localStorage.getItem("cart"))
    var removeIndex = cartObj.map(function(item){return item.prodid}).indexOf(prod_id)
    if(removeIndex>=0){
      cartObj.splice(removeIndex,1);
      localStorage.setItem("cart",JSON.stringify(cartObj));  
    }
    document.location.reload();
	}


  handleCheckout(e){
    var route="/user/"+this.state.user[0].username+"/cart/checkout"
    this.props.history.push(route);
  }


  render(){
    // console.log("finallCart",this.state.finalCart);
    // console.log("userCart",this.state.userCart);
    // console.log("localCart",this.state.localCart);
    var _this=this;
    var totalAmount;

    if(this.state.finalCart.length===0){
      totalAmount = 0;  
    }
    else{
      totalAmount = 0;
      this.state.finalCart.forEach(function(prodobj){
      totalAmount=totalAmount+prodobj.user_quantity*prodobj.product.price;
      })
    }

    // console.log(totalAmount);

    sessionStorage.setItem("totalAmount",totalAmount); 
    
   
    if(totalAmount>0){
      var _this = this;
     return(
      <div className="container">
        <Header/>
        <div className="container" style={{paddingTop:'160px'}}>
          <div className="row">
              <h2>Shopping Cart</h2>
          </div>    
          <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-2"></div>
              <div className="col-md-2"><strong>Category</strong></div>
              <div className="col-md-2"><strong>Quantity</strong></div>
              <div className="col-md-2"><strong>Price</strong></div>
              <div className="col-md-2"></div>
          </div>  
          <hr/> 
          {
           this.state.finalCart.map(function(object){
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
              <div className="row" id={object.product.prod_id+''}>
                 <div className="col-md-2"><a href={route}><img src={url1[0].path} height='80px' width='80px' /></a></div>
                 <div className="col-md-2"><a href={route}><strong>{object.product.name}</strong></a></div>
                 <div className="col-md-2">{object.product.category}</div>
                 <div className="col-md-2">{object.user_quantity}</div>
                 <div className="col-md-2">{ekartprice*object.user_quantity}</div>
                 <div className="col-md-2"><button id={object.product.prod_id+''} className="btn btn-danger" onClick={_this.handleRemove}>Remove</button></div>
              </div>
              <hr/>
              </div>
            )
           })
          }

          <br/>
          <div className="text-right">
          	<strong><h3>Total Amount: Rs.{totalAmount}</h3></strong><br/>
            <button className="btn btn-success btn-block" onClick={this.handleCheckout}>Checkout</button> 
            <br/><br/>
            
          </div>
        
        </div>
      </div>  
     )
    }
    else{
      return(
        <div className="container">
          <Header/>
          <div className="container" style={{paddingTop:'160px'}}>
            <h1>Your Cart Is Empty</h1>
          </div>
        </div>  
      )
     
    }
 }
}

export default UserCart;
