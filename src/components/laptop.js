import React from 'react';
import axios from 'axios';
import paths from './imagePaths';
import Header from './header';

class Laptop extends React.Component{
  	

  	constructor(props){
  		super(props);
  		this.state={
  			laptops:[]
  		};
  	}

  	componentDidMount(){

  		var _this=this;
  		axios.get("http://localhost:3000/products/laptops")
  		.then(function(response){
  			_this.setState({laptops:response.data});
  			// console.log("response:",response.data);
  			// console.log("state:",_this.state.products);
  			
  		})
  		.catch(function(error){

  		})
  	}

  	render(){
  		console.log("laptops",this.state.laptops)
  		var count=0

  		return(
  			<div className="container">
	      		<Header/>
			  	<div className="container" style={{marginTop:"160px"}}>
				   
				    <div className="row" style={{paddingLeft:'20px'}}>
				    	 <h5><b><a href='/laptops'>Laptops</a></b></h5>
				    </div>
				    <br/>

				    <div className="row">
				    {
				    	this.state.laptops.map(function(prod){
				    		
				    			count=count+1;
					    		var url1=paths.filter(function(data){
					    			if(prod.prod_id===data.prod_id){
					    				return data.path;
					    			}
					    			return null;
					    		});

					    		var route='/products/'+prod.prod_id
					    		return(
					    			<a href={route}>
						    			<div className="col-md-3">
						        			<img src={url1[0].path} width="150px" height="150px" className="center-block"/>
						        			<h4 className="text-center">{prod.name}</h4>
						        		</div>
						        	</a>	

					    		)	
				    	})

				    }

				    </div>

				    <br/><br/>

				</div>
			</div>	
		)
  }	

}
 
export default Laptop;