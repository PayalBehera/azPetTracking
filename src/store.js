import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './store/auth.module';
import createPersistedState from 'vuex-persistedstate';
//import Cookies from 'js-cookie';

Vue.use(Vuex)


const state = {
    sidebarShow: 'responsive',
    sidebarMinimize: true
  }
  
  const mutations = {
    toggleSidebarDesktop(state) {
      //const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      //state.sidebarShow = sidebarOpened ? false : 'responsive'
      const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarOpened ? false : 'responsive'
    },
    toggleSidebarMobile(state) {
      const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
      state.sidebarShow = sidebarClosed ? true : 'responsive'
    },
    set(state, [variable, value]) {
      state[variable] = value
    }
  }
  export default new Vuex.Store({
    state,
    mutations,
    modules: {
        auth
    },
    plugins: [createPersistedState()]
})



/*import Vue from 'vue'
import Vuex from 'vuex'
import {
  auth
} from './store/auth.module';
import createPersistedState from 'vuex-persistedstate';
import RefreshTokenService from './service/RefreshTokenService';

Vue.use(Vuex)


const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  polling: null
}

const mutations = {
  toggleSidebarDesktop(state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile(state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set(state, [variable, value]) {
    state[variable] = value
  }
}

const actions = {
  REST_API_EXAMPLE() {
    this.polling = setInterval(() => {
     // console.log('hi swastik');
     //if(auth.state.authenticated==true){
       console.log("Refresh Token Calling")
      RefreshTokenService.refreshToken();
     //}
     //840000
    }, 250000)
  },
  REST_API_FINISH() {
    clearInterval(this.polling)
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
    auth
  },
  plugins: [createPersistedState()]
})*/
