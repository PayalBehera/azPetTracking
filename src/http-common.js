import axios from "axios";
import store from './store';

console.log("Http common call")
//console.log(store.getters['auth/getAccessToken']);
export default axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  /*headers: {
    "Content-type": "application/json",
    'Authorization': 'Bearer ' + store.getters['auth/getAccessToken']
  }*/
});

/*import axios from "axios";
//import store from './store';

let header = {}

//console.log(store.getters['auth/getAccessToken']);
if (window.localStorage.vuex) {
  console.log("Come to LocalStorage");
  header['Content-type'] = "application/json";
  header.Authorization = 'Bearer ' + JSON.parse(window.localStorage.vuex).auth.accessToken;
}
else{
  console.log("Come To Not Local storage");
  header["Access-Control-Allow-Origin"] = "*";
}
console.log("Header data"+header);
export default axios.create({
  //baseURL:process.env.VUE_APP_REST_URL,
  
  headers:
    // "Content-type": "application/json", 
    // 'Authorization': 'Bearer ' + JSON.parse(window.localStorage.vuex).auth.accessToken || '' 
    header
  
});*/