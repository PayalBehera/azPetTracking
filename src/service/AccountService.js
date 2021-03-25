import http from "../http-common";
/*import store from '../store';
import { router } from '../router/router';
import RefreshTokenService from './RefreshTokenService';*/

class AccountService {


    

    getCurrentUserInfo() {
        return http.get("api/user/currentuser");
       /* return this.axios.get("api/user/currentuser",{
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + store.getters['auth/getAccessToken']
              }
        });*/
    }

    
    
   

    

    logout() {
        return http.get("api/user/logout");
    }
}

export default new AccountService();

