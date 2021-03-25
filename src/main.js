// import Vue from 'vue'
// import App from './App.vue'
// import Vuelidate from 'vuelidate'
// import CoreuiVue from '@coreui/vue'
// import Vuex from 'vuex'
// import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// //Import icon
// import { iconsSet as icons, iconsSet } from './assets/icons/icons.js'

// //import Vuetify from 'vuetify/lib';
// import vSelect from "vue-select";


// import { router } from '../src/router/router';
// import store from './store'

// import '@fortawesome/fontawesome-free/css/all.css';
// import '@fortawesome/fontawesome-free/js/all.js';

// Vue.use(Vuelidate)
// Vue.use(Vuex)
// Vue.use(BootstrapVue)
// Vue.use(IconsPlugin)
// Vue.use(CoreuiVue)
// Vue.use(iconsSet)
// Vue.use(icons)

// Vue.config.productionTip = false

// Vue.prototype.$log = console.log.bind(console)
// Vue.component("v-select", vSelect);

// new Vue({
//   render: h => h(App),
//   store: store,
//   router,
//   icons
// }).$mount('#app')


// // new Vue({
// //   el: '#app',
// //   router,
// //   template: '<App/>',
// //   components: {
// //     App
// //   }
// // })





import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import CoreuiVue from '@coreui/vue'
import Vuex from 'vuex'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { iconsSet as icons } from './assets/icons/icons.js'
 
import axios from 'axios'
import VueAxios from 'vue-axios'

import { router } from '../src/router/router';
import store from './store'

import http from "./http-common";
import RefreshTokenService from '@/service/RefreshTokenService';

import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

//Below 5 line code for input icon
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { Datetime } from 'vue-datetime'

import 'vue-datetime/dist/vue-datetime.css'

import VueSimpleAlert from "vue-simple-alert";
 


library.add(faUserSecret,faSpinner)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.use(Vuelidate)
Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(CoreuiVue)
Vue.use(VueAxios, axios)

Vue.use(Datetime)

import VueApexCharts from 'vue-apexcharts'
Vue.component('apexchart', VueApexCharts)

//For add mapview
import VueGeolocation from 'vue-browser-geolocation';
Vue.use(VueGeolocation);
import * as VueGoogleMaps from 'vue2-google-maps'
 
Vue.use(VueGoogleMaps, {
  load: {
   
  key: 'AIzaSyAdWZcIlR6JQCxy3dwN83p385SMjAGsUTs',
    libraries: ['places','geometry']
    
  },
 
  
})

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: store,
  icons,
  router
}).$mount('#app')


// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: {
//     App
//   }
// })

// Add a request interceptor
http.interceptors.request.use(
  config => {
      const token = store.getters['auth/getAccessToken'];
      if (token) {
          config.headers['Authorization'] = 'Bearer ' + token;
      }
       config.headers['Content-Type'] = 'application/json';
       console.log("Come to interceptors request")
      return config;
  },
  error => {
      Promise.reject(error)
  });

//Add a response interceptor
http.interceptors.response.use( (response) => {
        // Return a successful response back to the calling service
        //console.log("status ddd")
        return response;
      }, (error) => {
        // Return any error which is not due to authentication back to the calling service
        if (error.response.status !== 401) {
          //console.log("Commming to not 401 response sritam ")
          return new Promise((resolve, reject) => {
            reject(error);
          });
        }
        /*if (error.response.status === 401) {
          
          console.log("Commming to 401 response sritam ")
         // this.$store.commit("auth/setAuthentication", false);
         // window.localStorage.clear();
          //this.$router.push({path: `/login`})
          console.log("Fully log out")
          //this.$router.push({name: 'login'})
        }*/

        console.log("Refresh Token Response Coming: ")
        console.log("Commming to 401 response sritam "+error.response.status)
        // Try request again with new token
        return RefreshTokenService.refreshToken()
        .then(res => {
          console.log("Response Comming")
          console.log(res);
          store.commit("auth/authUser", {
            acessToken: res.data.access_token,
            requestToken: res.data.refresh_token
          })
         
        
            //.then((token) => {
              console.log("Access Token coming")
              //console.log(token)
              // New request with new token
              const config = error.config;
              console.log("Res ponse:"+config.url)
              config.headers['Authorization'] = 'Bearer ' + store.getters['auth/getAccessToken'];

              return new Promise((resolve, reject) => {
                http.request(config).then(response => {
                  console.log("Thik thak")
                  resolve(response);
                }).catch((error) => {
                  console.log("coming to here djjjj")
                  reject(error);
                })
              });

           /* })
            .catch((error) => {
              console.log("coming to here")
              Promise.reject(error);
            });*/

          })
          .catch(error => {

            console.log(error.response.status)
            if (error.response.status === 401){

              console.log("Error coming in refresh token")
              console.log("Commming to 401 response sritam ")
              store.commit("auth/setAuthentication", false);
              window.localStorage.clear();
              //this.$router.push({path: `/login`})
              router.push({path: `/login`})
              console.log("Fully log out")
              //this.$router.push({name: 'login'})
            }
            console.log(error)
            
            return Promise.reject(error);
            
          });

});

//Add a response interceptor   
/*http.interceptors.response.use(null, error => {
    // if (error.response.status == 401) {
    // store.commit("logout");
    // router.push("/login");
    // }
    if (error.response.status === 401) {
          
        console.log("Commming to 401 response sritam ")
        store.commit("auth/setAuthentication", false);
         window.localStorage.clear();
        //this.$router.push({path: `/login`})
        router.push({path: `/login`})
        console.log("Fully log out")
        //this.$router.push({name: 'login'})
      }

    return Promise.reject(error);
});*/