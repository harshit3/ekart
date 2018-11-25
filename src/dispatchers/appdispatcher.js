var Dispatcher=require('react-dispatcher');
var Dispatcher= new Dispatcher(); 

Dispatcher.handleaction = function(action){
	this.dispatch({action:action}); 
}

module.exports=Dispatcher;