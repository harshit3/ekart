import React from 'react';
import axios from 'axios';
import paths from './imagePaths';
import Header from './header';

class ProductDescription extends React.Component{
  
  constructor(props){
      super(props);
      this.handleAddCart = this.handleAddCart.bind(this);
      this.handleAddWishlist = this.handleAddWishlist.bind(this);

      this.state={
        prodid:0,
        product:[],
        addedtocart:''
      };
    }


    componentWillMount(){
      this.setState({prodid:this.props.match.params.prodid});
      this.setState({addtocart:"Add To Cart"});
    }


    componentDidMount(){
      var _this=this;
      var route="http://localhost:3000/productdesc/"+this.state.prodid;
      axios.get(route)
      .then(function(response){
        _this.setState({product:response.data});
        // console.log("response:",response.data);
      })
      .catch(function(error){

      })
    }    


    handleAddCart(){
    	if(!JSON.parse(sessionStorage.getItem("isLoggedIn"))){
    		// console.log("in handle cart....")
    		var cartObject = localStorage.getItem("cart");
    		// console.log("cart items",cartObject)
	      	if(cartObject===null || cartObject.length===0){
		        cartObject=[];

	  		    let product={
	  		    	prodid:this.state.product[0].prod_id,	
	  		    	user_quantity:parseInt(document.getElementById("reqQuantity").value)
	  		    }
	  		    // console.log("product",product);
	  		    cartObject.push(product)
	  		    document.getElementById("addtocart").innerHTML = "Added To Cart";
	  		    document.getElementById("addtocart").disabled = true;
	  		    localStorage.setItem("cart",JSON.stringify(cartObject));
	  	    }
	        else{
	        	var already_present=false;
	        	var _this=this;

		        cartObject=JSON.parse(cartObject);

			    cartObject.map(function(object){
			    	if(object.prodid===_this.state.product[0].prod_id){
			    		if(parseInt(object.user_quantity)+parseInt(document.getElementById("reqQuantity").value)>4){
			    			_this.setState({usermsg:"Maximum quantity limit 4 reached in the cart",color:'red'})
			    			object.user_quantity = 4;
			    		}
			    		else{
			    			object.user_quantity=parseInt(object.user_quantity)+parseInt(document.getElementById("reqQuantity").value);	
			    		}
			    		already_present=true;
			    	}
			    })


			    if(!already_present){
			    	let product={
		  		    	prodid:this.state.product[0].prod_id,	
		  		    	user_quantity:parseInt(document.getElementById("reqQuantity").value)
	  		    	}
			    	cartObject.push(product)	
			    }

			    this.setState({addtocart:"Added To Cart"})
			    document.getElementById("addtocart").disabled = true;
			    localStorage.setItem("cart",JSON.stringify(cartObject));
	        }   	
    	}

    	else{
    		var _this=this;
			// console.log("adding to cart");
			var url="http://localhost:3000/users/"+sessionStorage.getItem("username");
			axios.get(url)
			.then(function(response){
				var cartObj=response.data[0].cart;
				var cartObj1=cartObj.filter(function(object){
					return	(object.prodid===_this.state.product[0].prod_id);
				})

				if(cartObj1.length>0){
					var index=cartObj.map(function(item){return item.prodid}).indexOf(_this.state.product[0].prod_id);
					var user_quantity = parseInt(document.getElementById("reqQuantity").value);
					if(cartObj[index].user_quantity+user_quantity>4){
						_this.setState({usermsg:"Maximum quantity limit 4 reached in the cart",color:'red'})
			    		cartObj[index].user_quantity = 4;	
					}
					else{
						cartObj[index].user_quantity=cartObj[index].user_quantity+user_quantity;	
					}
					
					url="http://localhost:3000/addtocart";
					let data={
						username:sessionStorage.getItem("username"),
						cartObj:cartObj
					}
					axios.post(url,data)
					.then(function(response){
						// console.log("added to cart")
						document.getElementById("addtocart").innerHTML = "Added To Cart"
						document.getElementById("addtocart").disabled = true;
					})
					.catch(function(error){

					})

				}
				else{
					// console.log("Not Already in wishlist");
					var user_quantity = parseInt(document.getElementById("reqQuantity").value);
					var product = {
						prodid:_this.state.product[0].prod_id,
						user_quantity:user_quantity	
					}
					cartObj.push(product)
					url="http://localhost:3000/addtocart";

					// console.log(_this.state.product[0])
					let data={
						username:sessionStorage.getItem("username"),
						cartObj:cartObj
					}
					axios.post(url,data)
					.then(function(response){
						document.getElementById("addtocart").innerHTML = "Added To Cart"
						document.getElementById("addtocart").disabled = true;
					})
					.catch(function(error){

					})

				   	
				}	
			})
			.catch(function(error){

			})

				
    	}
     	
    }


	handleAddWishlist(e){
		var _this=this;
		// console.log("adding to wishlist");
		var url="http://localhost:3000/users/"+sessionStorage.getItem("username");
		axios.get(url)
		.then(function(response){
			var wishlistObj=response.data[0].wishlist;
			wishlistObj=wishlistObj.filter(function(prodid){
				return	(prodid===_this.state.product[0].prod_id);
			})
			// console.log(wishlistObj);
			if(wishlistObj.length>0){
				document.getElementById("addtowishlist").innerHTML = "Already in wishlist";	
				console.log("Already in wishlist");	
			}
			else{
				// console.log("Not Already in wishlist");
				url="http://localhost:3000/addtowishlist";

				// console.log(_this.state.product[0])
				let data={
					username:sessionStorage.getItem("username"),
					prodid:_this.state.product[0].prod_id
				}

				console.log("data",data)
				axios.post(url,data)
				.then(function(response){
					console.log("added to wishlist")
					document.getElementById("addtowishlist").innerHTML = "Added To Wishlist"
				})
				.catch(function(error){

				})

			   	
			}	
		})
		.catch(function(error){

		})

		
	}


    render(){
		console.log(this.state.product)
	    if(!(this.state.product.length==0)){
		    var product = this.state.product[0];
		    // console.log("product:",this.state.product[0]);
	        var url1=paths.filter(function(data){
	        if(product.prod_id===data.prod_id){
		        return data.path;
		    }
		    return null;
		    });

		      
		    var addtocart = [];
		    if(product.quantity==0){
		     	addtocart.push(<tr><td><button id="addtocart" className="btn btn-primary disabled">{this.state.addtocart}</button></td></tr>)
		    }else{
		      	addtocart.push(<tr><td><button id="addtocart" className="btn btn-primary" onClick={this.handleAddCart}>{this.state.addtocart}</button><h5 className="text-center" style={{color:this.state.color}}>{this.state.usermsg}</h5></td></tr>)
		    }

	        var addtowishlist = [];
	        if(JSON.parse(sessionStorage.getItem("isLoggedIn"))){
	          addtowishlist.push(
	            <tr><td><button id="addtowishlist" className="btn btn-primary" onClick={this.handleAddWishlist}>Add To Wishlist</button></td></tr>
	          )    
	        }

		    var selectArray = [];   
		    if(product.quantity>=4){
		        selectArray.push(
		            <tr><td>Quantity
		                <select id="reqQuantity">
		                    <option value="1">1</option>
		                    <option value="2">2</option>
		                    <option value="3">3</option>
		                    <option value="4">4</option>
		                </select>
		                </td>
		            </tr>  
		        )
		    }else if(product.quantity>=3){
		        selectArray.push(
		            <tr><td>Quantity
		                <select id="reqQuantity">
		                    <option value="1">1</option>
		                    <option value="2">2</option>
		                    <option value="3">3</option>
		                </select>
		                </td>
		            </tr>  
		        )
		    }else if(product.quantity===2){
		        selectArray.push(
		            <tr><td>Quantity
		                  <select id="reqQuantity">
		                    <option value="1">1</option>
		                    <option value="2">2</option>
		                  </select>
		                </td>
		            </tr>) 
		    }else if(product.quantity===1){
		        selectArray.push(
		            <tr><td>Quantity
		                  <select id="reqQuantity">
		                    <option value="1">1</option>
		                  </select>
		                </td>
		            </tr>)
		    }else if(product.quantity===0){
		        selectArray.push(
		            <tr><td>
		                  <select id="reqQuantity">
		                  </select>
		                </td>
		            </tr>)
		    }


			console.log("hello",product.discount)

	    	if(product.discount>0){
				console.log("here")
		        var prodObject=this.state.product[0];
		        var ekart_price=prodObject.price-prodObject.price*(prodObject.discount/100);
		        ekart_price=Math.round(ekart_price);
		        var qty_left = prodObject.quantity;
		        if(qty_left>0){
		          var availibility="In Stock";
		          var color='green';
		        }
		        else{
		          var availibility="Out Of Stock";
		          var color='red';
		        }
		        

		        return(
		          <div className="container">
		            <Header/>
		            <div className="container" style={{paddingTop:'160px'}}>

		              <table className="table">

		                <tr><th rowSpan="14" width='40%'><img src={url1[0].path} height='300px' width='300px' /></th></tr>
		                <tr><th><h2>{prodObject.name}</h2></th></tr>
		                <tr><td>Review</td></tr>
		                <tr><td>Original Price: Rs.<strike>{prodObject.price}</strike></td></tr>
		                <tr><td>EKART price: Rs.{ekart_price}</td></tr>
		                <tr><td>You Save: Rs.{prodObject.price-ekart_price}</td></tr>
		                <tr><td>Deal Name: {prodObject.dealname}</td></tr>
		                <tr><td><b style={{color:color}}>{availibility}</b></td></tr><br/>
		                {selectArray}
		                <br/>
		                {addtocart}<br/>
		                {addtowishlist}
		              </table>
		              <br/>
		              <br/>
		              <p>{prodObject.desc}</p>

		            </div>
		        </div>  
		        )
		    }


		    else{
				console.log("not here")
		        var prodObject=this.state.product[0];
		        var ekart_price=prodObject.price
		        var qty_left = prodObject.quantity;
		        if(qty_left>0){
		        	var availibility="In Stock";
		         	var color='green';
		        }
		        else{
		         	var availibility="Out Of Stock";
	          		var color='red';
	            }

		        return(
		        <div className="container">
		            <Header/>
		            <div className="container" style={{paddingTop:'160px'}}>
		              <table className="table">
		            
		                <tr><th rowSpan="13"><img src={url1[0].path} height='300px' width='300px' /></th></tr>
		                <tr><th><h2>{prodObject.name}</h2></th></tr>
		                <tr><td>Review</td></tr>
		                <tr><td>Original Price: Rs.{prodObject.price}</td></tr>
		                <tr><td>EKART price: Rs.{ekart_price}</td></tr>
		                <tr><td>Deal Name: {prodObject.dealname}</td></tr>
		                <tr><td><b style={{color:color}}>{availibility}</b></td></tr><br/>
		                {selectArray}
		                <br/>
		                {addtocart}<br/>
		                {addtowishlist}
		                
		              </table>
		              <br/>
		              <br/>
		              <p>{prodObject.desc}</p>

		            </div>
		        </div>  
		        )
		        }
	    }else{
	        return(
		        <div className="container">
		          <Header/>
		          <div className="container"></div>
		        </div>
	     	)
	    }
    } 
}


export default ProductDescription;




