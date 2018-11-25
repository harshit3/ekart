import React from 'react';
import axios from 'axios';
import paths from './imagePaths';
import Header from './header';

class Phone extends React.Component{
  	

  	constructor(props){
  		super(props);
  		this.state={
  			phones:[]
  		};
  	}

  	componentDidMount(){

  		var _this=this;
  		axios.get("http://localhost:3000/products/phones")
  		.then(function(response){
  			_this.setState({phones:response.data});
  			// console.log("response:",response.data);
  			// console.log("state:",_this.state.products);
  			
  		})
  		.catch(function(error){

  		})
  	}

  	render(){



  		return(
  			<div className="container">
	      		<Header/>
			  	<div className="container" style={{marginTop:"160px"}}>
				   
				    <div className="row" style={{paddingLeft:'20px'}}>
				    	 <h5><b><a href='/phones'>Phones</a></b></h5>
				    </div>
				    <br/>

				    <div className="row">
				    {
				    	this.state.phones.map(function(prod){

				    		var count=0;

				    		if(count<4){
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
				    		}
				    			
				    	})

				    }

				    </div>

				    <br/><br/>

				</div>
			</div>	
		)
  }	

}
  export default Phone;