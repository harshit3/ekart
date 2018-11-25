import AppDispatcher  from '../dispatchers/appdispatcher';
import Constants from '../components/constants';

var AccountActions = {
        verify_user: function(username,password){
          AppDispatcher.dispatch({
          	type: Constants.VERIFY_USER,
          	payload:{"username":username,"password":password}
        });
	}
};

export default AccountActions;