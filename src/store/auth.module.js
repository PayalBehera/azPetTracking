import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export const auth = {
    namespaced: true,
    state: {
        authenticated: false,
        accessToken:'',
        requestToken:''
    },

    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        },
        authUser (state, userData) {
            state.accessToken = userData.acessToken
            state.requestToken = userData.requestToken
          }
    },

    getters: {
        getAccessToken: state => {
            return state.accessToken
          },
        getRefreshToken: state => {
            return state.requestToken
          }
    },

    plugins: [
        createPersistedState({
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })
    ]
}


/*import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
const ls = new SecureLS({ isCompression: false });

export const auth = {
    namespaced: true,
    state: {
        authenticated: false,
        accessToken:'',
        refreshToken:''
    },

    mutations: {
        setAuthentication(state, status) {
            state.authenticated = status;
        },
        authUser (state, userData) {
            state.accessToken = userData.acessToken;
            state.refreshToken = userData.refreshToken;
          }
    },

    getters: {
        getAccessToken: state => {
            return state.accessToken
          },
        getRefreshToken: state => {
            return state.refreshToken
          }
    },

    actions:{
        
    },

    plugins: [
        createPersistedState({
            storage: {
                getItem: key => ls.get(key),
                setItem: (key, value) => ls.set(key, value),
                removeItem: key => ls.remove(key)
            }
        })
    ]
}*/