import React from 'react';
import axios from 'axios';
const logo = require("../logo.jpg");

class Header extends React.Component{

  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      searchText:'',
      cartCount:0,
      wishlistCount:0
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitSearch = this.handleSubmitSearch.bind(this);
  }


  componentWillMount(){
    var isLogin = sessionStorage.getItem("isLoggedIn")
    if(isLogin===null){
      sessionStorage.setItem("isLoggedIn",false);
    }
    isLogin = sessionStorage.getItem("isLoggedIn");
    var _this=this;
    cartCount=0
    isLogin=JSON.parse(isLogin);
    if(isLogin){
      this.setState({isLoggedIn:true})

      var route = "http://localhost:3000/users/"+sessionStorage.getItem("username");
      axios.get(route)
      .then(function(response){
        cartCount=response.data[0].cart.length;

        if(localStorage.getItem("cart")!==null){
          var cartObj = JSON.parse(localStorage.getItem("cart"));
          var index;
          cartObj.map(function(obj){
            index = response.data[0].cart.map(function(item){return item.prodid}).indexOf(obj.prodid)
            if(index===-1){
              cartCount=cartCount+1;
            }
          })
        }

        _this.setState({wishlistCount:response.data[0].wishlist.length,cartCount:cartCount})
      })
      .catch(function(error){

      })

      
    }else{
      this.setState({isLoggedIn:false})  
      var cartObject = localStorage.getItem("cart");
      if(cartObject===null || cartObject.length===0){
        this.setState({cartCount:0}); 
      }
      else{
        var cartCount=JSON.parse(cartObject).length;

        this.setState({cartCount:cartCount});
      }
    }    
  }


  handleChange(e){
    this.setState({searchText:this.refs.search.value});
  }

  handleSubmitSearch(e){
    e.preventDefault();
  }

  render(){
    // console.log(sessionStorage.getItem("isLoggedIn"),this.state.cartCount)
    // localStorage.removeItem("cart");
    var route='/search/'+this.state.searchText;
    if(!this.state.isLoggedIn){
  
      return(
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            
            <div className="navbar-header"> 
              <div className="navbar-brand">
                <div className="row">
                  <div className="col-md-6">
                      <img src={logo} width="50px" height="50px" />
                  </div>
                  <div className="col-md-6">
                      <strong>EKART</strong>
                  </div>                
                </div>
              </div>  
            </div>

            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>                        
            </button>

            <div className="collapse navbar-collapse" id="myNavbar">

              <form className="navbar-form navbar-center" onSubmit={this.handleSubmitSearch} style={{paddingTop:"20px",paddingLeft:"500px"}}>

                <div className="form-group">

                  <input type="text" className="form-control" ref="search" onChange={this.handleChange} placeholder="Search"/>&nbsp;
                  <a href={route}><span className="glyphicon glyphicon-search" style={{color:'white',fontSize:'20px'}}></span></a>   
                  
                </div>

              </form>

              <ul className="nav navbar-nav">
                <li><a href='/'><span className="glyphicon glyphicon-home" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Home</a></li>
                <li><a href='/login'><span className="glyphicon glyphicon-log-in" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Login</a></li>
                <li><a href='/signup'><span className="glyphicon glyphicon-user" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Signup</a></li>
                <li><a href='/cart'><span className="glyphicon glyphicon-shopping-cart" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Cart&nbsp;<span className="badge">{this.state.cartCount}</span></a></li>
              </ul>
              
            </div>

            
          </div>    
        </nav>
        )
    }


    else{
      var userhome='/user/'+sessionStorage.getItem("username");
      var profile=userhome+'/profile';
      var cart=userhome+'/cart';
      var wishlist = userhome+'/wishlist';

      return( 
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            
            <div className="navbar-header">
              <div className="navbar-brand">
                <div className="row">
                  <div className="col-md-6">
                      <img src={logo} width="50px" height="50px" />
                  </div>
                  <div className="col-md-6">
                      <strong>EKART</strong>
                  </div>                
                </div>
              </div>  
            </div>

            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>                        
            </button>

            <div className="collapse navbar-collapse" id="myNavbar">
              <form className="navbar-form navbar-center" style={{paddingTop:"20px",paddingLeft:"500px"}}>
                <div className="form-group">
                  <input type="text" className="form-control" ref="search" onChange={this.handleChange} placeholder="Search"/>&nbsp;
                  <a href={route}><span className="glyphicon glyphicon-search" style={{color:'white',fontSize:'20px'}}></span></a>
                </div>
              </form>
              <ul className="nav navbar-nav">
                <li><a href={userhome}><span className="glyphicon glyphicon-home" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Home&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                
                <li><a href={profile}><span className="glyphicon glyphicon-user" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Profile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
                
                <li><a href='#'><span className="glyphicon glyphicon-book" style={{color:'white',fontSize:'20px'}}></span>&nbsp;My Orders&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
               
                <li><a href={wishlist}><span className="glyphicon glyphicon-heart" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Wishlist&nbsp;<span className="badge">{this.state.wishlistCount}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>

                <li><a href='#'><span className="glyphicon glyphicon-tags" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Notification&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
 
                <li><a href='/'><span className="glyphicon glyphicon-log-out" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Log Out&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
           
                <li><a href={cart}><span className="glyphicon glyphicon-shopping-cart" style={{color:'white',fontSize:'20px'}}></span>&nbsp;Cart&nbsp;<span className="badge">{this.state.cartCount}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>

              </ul>
              
            </div>

            
          </div>    
        </nav>)

    }


  }

} 
export default Header;