//import http from "../http-common";
import store from "../store";
import axios from "axios";
//import axios from "axios";

class  RefreshTokenService{

    refreshToken(){
      let url = process.env.VUE_APP_API_URL;
      console.log("Method call.....")
      console.log(store.getters['auth/getRefreshToken'])
        return axios.get(url+"api/user/refreshtoken", {
            params: {
              refreshToken: store.getters['auth/getRefreshToken']
              //JSON.parse(window.localStorage.vuex).auth.requestToken
              //localStorage.getItem("refreshToken")
              
              //store.getters['auth/getRefreshToken'],
              //returnSecureToken: true
            },
            //   headers: {
            //     "Content-type": "application/json", 
            //     'Authorization': 'Bearer ' + JSON.parse(window.localStorage.vuex).auth.accessToken || '' 
            //   }
          })/*.then(res => {
            console.log("Response Comming")
            console.log(res);
            store.commit("auth/authUser", {
              acessToken: res.data.access_token,
              requestToken: res.data.refresh_token
            });
            // localStorage.removeItem("accessToken")
            // localStorage.removeItem("refreshToken")
            // localStorage.setItem("accessToken", res.data.access_token)
            // localStorage.setItem("refreshToken", res.data.refresh_token)
          }).catch(error => {
            
            console.log("Error coming in refresh token")
            console.log(error.response.status)
            console.log(error)
          });*/
    }
}
export default new RefreshTokenService();