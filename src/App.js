import React from 'react';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Cart from './components/cart';
import Laptop from './components/laptop';
import Phone from './components/phone';
import SearchResult from './components/searchresult';
import ProductDescription from './components/productdescription';
import UserHome from './components/userhome';
import Profile from './components/profile';
import UserCart from './components/usercart';
import AddAddress from './components/addaddress';
import AddCard from './components/addcard';
import Checkout from './components/checkout';
import Wishlist from './components/wishlist';


import { BrowserRouter as Router, Route} from 'react-router-dom';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {user:[]};
  }
  
  componentDidMount(){
     // var user1=[];
     // var _this=this;
     // axios.get("http://localhost:3000/products")
     //  .then(function(response){
     //    console.log('fg',response.data);
     //    response.data.forEach(function(item){
     //        user1.push(item);
     //    })
     //    console.log('user1:',user1)
     //    _this.setState({user:user1})
     //    console.log('user:',_this.state.user)
     //  });
  }

  findName(e){
    
  }

  render(){
    return(
      <div>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/cart" component={Cart} />
            <Route path="/laptops" component={Laptop} />
            <Route path="/phones" component={Phone} />
            <Route path="/search/:text" component={SearchResult} />
            <Route path="/products/:prodid" component={ProductDescription} />
            <Route exact path="/user/:username" component={UserHome} />
            <Route path="/user/:username/profile" component={Profile} />
            <Route exact path="/user/:username/cart" component={UserCart} />
            <Route path="/user/:username/cart/checkout" component={Checkout} />
            <Route path="/user/:username/addaddress" component={AddAddress} />
            <Route path="/user/:username/addcard" component={AddCard} />
            <Route path="/user/:username/wishlist" component={Wishlist} />
          </div>
        </Router>
      </div> 
    );
  }
}

export default App;