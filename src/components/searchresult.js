import React from 'react';
import axios from 'axios';
import paths from './imagePaths';
import Header from './header';

class SearchResult extends React.Component{
  	

  	constructor(props){
  		super(props);
  		this.state={
  			searchtext:"",
  			products:[]
  		};
  	}


  	componentWillMount(){
  		this.setState({searchtext:this.props.match.params.text});
  	}


  	componentDidMount(){
  		console.log("searchtext: ",this.state.searchtext);
  		var _this=this;
  		var route="http://localhost:3000/searchtext/"+this.state.searchtext;
  		console.log("route: ",route);
  		axios.get(route)
  		.then(function(response){
  			_this.setState({products:response.data});
  			//console.log("response:",response.data)
  			// console.log("response:",response.data);
  		})
  		.catch(function(error){

  		})
  	}


  	render(){
  		console.log("state:",this.state.products);
  		if(!(this.state.products.length===0)){
  			return(
  				<div className="container">
	      		<Header/>
				  	<div className="container" style={{marginTop:"160px"}}>
					    <div className="row">
					    	<strong>Search Results</strong>
					    </div>
					    <hr/>

					    <div className="row">
					    {
					    	this.state.products.map(function(prod){
					    		var count=0;

					    		if(count<4){
					    			count=count+1;
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

					</div>
				</div>	
		    )
		}  

  		else{
  			return(
  				<div className="container">
	      		<Header/>
	  				<div className="container" style={{marginTop:"160px"}}>
		  				<h1>Sorry Not Found. Please Search Something Else</h1>
		  			</div>
		  		</div>	
  			)
	  		
  		}

  	}	

}

export default SearchResult;