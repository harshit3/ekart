var AppDispatcher = require('../dispatchers/appdispatcher');
var Constants = require('../components/constants');
var BaseStore = require('./basestore');
var objectAssign = require('object-assign');

var _state={isUserLoggedIn:false,userMessage:""};
var CHANGE_EVENT='change'

var Store = objectAssign({}, BaseStore ,{
    getState: function () {
        return _state
    },
	dispatchToken:AppDispatcher.register(function(action){
		console.log("in register")
		console.log(action);
        switch(action.action.type){

            case Constants.VERIFY_USER:
				console.log("in verify user case")
				_state.userMessage="finally working";
                BaseStore.emitChange();
                break;
        }
    })
});





module.exports = Store;
