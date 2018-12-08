import React from 'react';
import axios from 'axios';
import paths from './imagePaths';
import Header from './header';

class Home extends React.Component{
  	

  	constructor(props){
  		super(props);
  		this.state={
  			products:[]
  		};
  	}

  	componentWillMount(){
  		sessionStorage.removeItem("username");
  		sessionStorage.removeItem("isLoggedIn");
  	}

  	componentDidMount(){

  		var _this=this;
  		axios.get("http://localhost:3000/products")
  		.then(function(response){
  			_this.setState({products:response.data?response.data:[]});
  			// console.log("response:",response.data);
  			// console.log("state:",_this.state.products);
  			
  		})
  		.catch(function(error){

  		})

  	}

  	render(){
  		console.log(localStorage.getItem("cart"))
  		var count1=0;
  		var count2=0;
  		var count3=0;

  		return(
  			<div className="container">
	      		<Header/>
			  	<div className="container" style={{marginTop:"160px"}}>
				    <div className="row">
				    	<strong>Today's Deal Products</strong>
				    </div>
				    <hr/>

				    <div className="row">
				    {	
				    	this.state.products.map(function(prod){
				    		

				    		if(prod.discount>0 && count1<3){
				    			count1=count1+1;
					    		var url1=paths.filter(function(data){
					    			if(prod.prod_id===data.prod_id){
					    				return data.path;
					    			}
					    			return null;
					    		});
					    		var route='/products/'+prod.prod_id;
					    		return(
					    			<a href={route}>
						    			<div className="col-md-4">
						        			<img src={url1[0].path} width="150px" height="150px" className="center-block"/>
						        			<h4 className="text-center">{prod.name}</h4>
						        		</div>
					        		</a>
					    		)	
				    		}
				    			
				    	})
				    }

				    

				    </div>
				    <hr/><br/><br/>

				    <div className="row">
				    	 <strong>Other Products</strong>
				    </div>
				    <hr/>


				    <div className="row" style={{paddingLeft:'20px'}}>
				    	 <h5><b><a href='/laptops'>Laptops</a></b></h5>
				    </div>
				    <br/>

				    <div className="row">
				    {
				    	this.state.products.map(function(prod){

				    		if(prod.discount===0 && count2<4 && prod.category==='Laptops'){
				    			count2=count2+1;
					    		var url1=paths.filter(function(data){
					    			if(prod.prod_id===data.prod_id){
					    				return data.path;
					    			}
					    			return null;
					    		});

					    		var route='/products/'+prod.prod_id;
					    		return(
					    			<a href={route}>
						    			<div className="col-md-3">
						        			<img src={url1[0].path} width="150px" height="150px" className="center-block"/>
						        			<h4 className="text-center">{prod.name}</h4>
						        		</div>
					        		</a>

					    		)	
				    		}
				    			
				    	})

				    }

				    </div>
				    <hr/>


				    <div className="row" style={{paddingLeft:'20px'}}>
				    	 <h5><b><a href='/phones'>Phones</a></b></h5>
				    </div>
				    <br/>

				    <div className="row">
				    {
				    	this.state.products.map(function(prod){

				    		if(prod.discount==0 && count3<4 && prod.category==='Smartphones'){
				    			count3=count3+1;
					    		var url1=paths.filter(function(data){
					    			if(prod.prod_id===data.prod_id){
					    				return data.path;
					    			}
					    			return null;
					    		});

					    		var route='/products/'+prod.prod_id;
					    		return(
					    			<a href={route}>
						    			<div className="col-md-3">
						        			<img src={url1[0].path} width="150px" height="150px" className="center-block"/>
						        			<h4 className="text-center">{prod.name}</h4>
						        		</div>
					        		</a>

					    		)	
				    		}
				    			
				    	})

				    }

				    </div>
				    <hr/>
				    <br/><br/>

				</div>
			</div>	
		)
  }	

}
export default Home;