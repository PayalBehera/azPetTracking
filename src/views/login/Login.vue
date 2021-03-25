<template>
  <body >
  <div class="container">
    <div class="d-flex justify-content-right h-200">
 <div class="card" >
          <div class="card-header" style="margin-top:40%;">
            <h1>Sign In</h1>
          </div>
 <div class="card-body" style="margin-top:7%;">
            <form id="form" v-on:submit.prevent="handleLogin">
              <div class="input-group form-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-user"></i>
                  </span>
                </div>
                <input
                  id="username"
                  type="text"
                  v-model="user.username"
                  placeholder="username"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && !user.username }"
                />
                <div
                  v-show="submitted && !user.username"
                  class="invalid-feedback"
                >Username is required</div>
              </div>

              <div class="input-group form-group" style="margin-top:15px;">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fas fa-key"></i>
                  </span>
                </div>
                
               <input
                  id="password"
                  :type="type"
                  v-model="user.password"
                  placeholder="password"
                  class="form-control"
                  :class="{ 'is-invalid': submitted && !user.password }"
                /><div class="input-group-append" >
      <span class="input-group-text" @click="toggleshow" >
        
        <i class="fa fa-eye" ></i>
      
      </span>
    </div> 
                <div
                  v-show="submitted && !user.password"
                  class="invalid-feedback"
                >Password is required</div>
              </div>

              <div class="form-group" style="margin-top:25px;">
                <button class="btn btn-primary btn-block login_btn" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>Login</span>
                </button>
              </div>
              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
              </div>
            </form>
          </div>
   <div class="card-footer">
            <div class="d-flex justify-content-center links">
              <h6 style="color:white;">Don't have an trial account ?</h6>
              <router-link to="/sign-up"><h6>Sign Up</h6></router-link>
            </div>
            <div class="d-flex justify-content-center" style="color:white;">
              <router-link to="/forgetpwd" style="color:white;"><h6>Forgot your password?</h6></router-link>
            </div>
          </div>

 </div></div></div>
</body>
</template>
<script>
import User from "../../models/user";
import AccountService from "@/service/AccountService";
export default {
  name: "Login",
  data() {
    return {
     icon:true,
       type:"password",
       img: require("@/assets/images/water-meters-1.jpg"),
      user: new User("", ""),
      loading: false,
      message: "",
      submitted: false,
      url: process.env.VUE_APP_API_URL
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
      //return false;
    }
  },
  // created() {
  //   if (this.loggedIn) {
  //     this.$router.push("/dashboard");
  //   }
  // },
  methods: {
    toggleshow(){
      if(this.type=="password"){
        this.type="text";
       
      }
      else{
        this.type="password";
        
      }
    },
    handleLogin() {
      this.message = ""
      this.submitted = true;
      console.log(this.user.username);
      this.$store.commit("auth/setAuthentication", false);
      window.localStorage.clear();
      localStorage.removeItem("orgId")
      
    
      if (!this.user.username) {
        return;
      }
      if (!this.user.password) {
        return;
      }
      this.loading = true;
      //call rest api of login
      this.axios.post(this.url+'api/user/login', {
      //this.axios.post('api/user/login', {  
      username: this.user.username,
      password: this.user.password,
      returnSecureToken: true,
      },
      {
          header: {
             "Access-Control-Allow-Origin": "*",
      
        }
      
    }).then(res => {
      console.log(res);
      this.$store.commit('auth/authUser', {
        acessToken: res.data.access_token,
        requestToken: res.data.refresh_token
      });
     
        this.$store.commit("auth/setAuthentication", true);
        this.getAccountsDetails()
        this.$router.replace({ name: "Dashboard" });
        //For side bar minimized
        this.$store.commit('set', ['sidebarMinimize', true])

        //console.log("Access Token: "+res.data.access_token)
        let jwtData = res.data.access_token.split('.')[1]
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)

        let isAdmin = decodedJwtData.realm_access.roles
        
        //console.log('jwtData: ' + jwtData)
        /*console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
        //console.log('decodedJwtData: ' + decodedJwtData)
        console.log('Is admin: ' + isAdmin)
        console.log("Role: "+isAdmin[2])*/
        localStorage.setItem("user_role", isAdmin[0])
        localStorage.setItem("superadmin_role", isAdmin[1])
        localStorage.setItem("admin_role", isAdmin[2])
      })
    .catch(error => {
      console.log(error)
      console.log("Error Status:"+error.response.status)
      this.message = "Invalid user name or password";
      this.loading = false
    })
      // if (this.user.username && this.user.password) {
      //   this.$store
      //     .dispatch("auth/login", this.user)
      //     .then(
      //       () => {
      //         this.$router.push("/dashboard");
      //       },
      //       error => {
      //         this.loading = false;
      //         this.message = error.response.data.error.toString();
      //       }
      //     )
      //     .catch(e => {
      //       console.log("control came here");
      //       this.loading = false;
      //       this.message = "ERR_CONNECTION_REFUSED";
      //       console.log(e.toString);
      //     });
      // }
    },
    getAccountsDetails() {
       AccountService.getCurrentUserInfo()
       .then(response => {
         console.log("Coming response inside accountsdetails"+ response.status)
         if(response.status === 200){
              
              let serverData = response;
              localStorage.setItem("orgId", serverData.data.orgRefName);
              console.log("Org Name inside map:"+ serverData.data.orgRefName)
             
            }
         
       }).catch(function error(){
         console.log("Error on current:"+error);
       });
    },
  }
};
</script>
 <style lang="scss" scoped>
 .password{
   border: none;
 }
body {
   min-height: 100vh;
  padding: 0px;
 
  background-color: #121a35;
 
  width:100%;
  font-family: "Numans", sans-serif;
  background-size: cover;
 background-position: center;
  //background-image:url("../../assets/images/water-meters-4.jpg");
}
 .container {
//   // height: 100%;
//   // align-content: center;
 margin-top: 0px;
 
//   // background-image: url("../../assets/images/background.jpeg");
//   // background-repeat: no-repeat;
//   // background-size: cover;
 }
.card {
   height: 100%;
  // margin-top: auto;
  // margin-bottom: auto;
  width: 350px;
  //background-color: #fcfcfc !important;
  background: transparent;
  border: none;
}
.card-header {
  background: transparent;
  margin-bottom: 25px;
}
.card-footer {
  background: transparent;
}
.social_icon span {
  font-size: 60px;
  margin-left: 10px;
  color: #03045e;
}
.social_icon span:hover {
  color: #90e0ef;
  cursor: pointer;
}
.card-header h1 {
  color: #f3f3f7;
  background: transparent;
}
.social_icon {
  position: absolute;
  right: 20px;
  top: -9px;
}
.input-group-prepend span {
  width: 50px;
  background-color: #03045e;
  color: white;
  border: 0 !important;
}
input:focus {
  outline: 0 0 0 0 !important;
  box-shadow: 0 0 0 0 !important;
}
.remember {
  color: #03045e;
}
.remember input {
  width: 20px;
  height: 20px;
  margin-left: 15px;
  margin-right: 5px;
}
.login_btn {
  color: white;
  background-color: #03045e;
  width: 100px;
}
.login_btn:hover {
  color: #03045e;
  background-color: #90e0ef;
}
.links {
  color: #03045e;
}
.links a {
  margin-left: 4px;
}

</style>