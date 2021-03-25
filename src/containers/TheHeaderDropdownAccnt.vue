<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      
      <CHeaderNavLink>
        <div @click="profilePicClick">
          <!-- <img -->
            <avatar :fullname="`${items.given_name}`" color="green" :size="40"></avatar>
            <!-- class="c-avatar-img "
            @click="profilePicClick" -->
          <!-- /> -->
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
      <!-- <h6 class="useralign">{{items.given_name}}</h6>
      <h6 class="useralign">{{items.emailid}}</h6> -->
    <CDropdownItem>
      <CIcon name="cil-user" /> {{items.given_name}}
    </CDropdownItem>
    <CDropdownDivider/>
    
    <CDropdownItem @click="logoutClick"> 
      <CIcon name="cil-account-logout" /> Logout
    </CDropdownItem>
    <!-- <center>
      <button class="btn btn-primary btn-submit" type="submit" @click="logoutClick" >Logout</button>
    </center> -->
  </CDropdown>
  
</template>

<script>
import AccountService from "@/service/AccountService";
import store from '../store';

import Avatar from 'vue-avatar-component'

//import store from '@/store'
const Account = () => import('@/views/account/Account')
export default {
  name: 'TheHeaderDropdownAccnt',
  // components: {
  //     Account
  // },
  components: { Avatar },
  data () {
    return { 
      itemsCount: 42,
      
      items: [],
      toasterMessage: "This is from variable",
      url: process.env.VUE_APP_API_URL,
    }
  },
  beforeMount() {
    //items.given_name
  },
  created() {
    this.getAccountsDetails();
  },
  methods: {
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.toasterMessage}`, {
        title: "Message",
        autoHideDelay: 5000,
        variant: variant,
        solid: true,
        appendToast: false
      });
    },
    profilePicClick() {
      console.log("Profile Click")
      this.getAccountsDetails();
      // <Account/>
    },
    getAccountsDetails() {
       AccountService.getCurrentUserInfo()
       /*this.axios.get(this.url+"api/user/currentuser",{
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + store.getters['auth/getAccessToken']
              }
        })*/
       .then(response => {
         console.log("Coming response inside accountsdetails"+ response.status)
         if(response.status === 200){
              
              let serverData = response;
              this.items = serverData.data;
              localStorage.setItem("orgId", this.items.orgRefName);
              console.log("Org Name:"+ this.items.orgRefName)
              //this.$root.$emit("orgId", this.items.orgRefName);
              
             
            }
         
       }).catch(function error(){
         console.log("Error on current:"+error);
       });
    },
    logoutClick() {
      console.log("Log Out Button Clicked")
      AccountService.logout()
      /*this.axios.get(this.url+"api/user/logout",{
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + store.getters['auth/getAccessToken']
              }
        })*/
      .then(response => {
         console.log("Coming response"+ response.status)
         
         if(response.status === 200){
              console.log("logout");
            
            localStorage.removeItem("user_role")
            localStorage.removeItem("admin_role")
            localStorage.removeItem("orgId")
            this.$store.commit("auth/setAuthentication", false);
            this.$store.commit('set', ['sidebarMinimize', true])
             window.localStorage.clear();
             
            
            //this.$store.dispatch('REST_API_FINISH');
            //this.$router.push("/login");
            this.$router.push({path: `/login`})
              this.toasterMessage = response.data;
              this.makeToast("success");
             
            }
         
       }).catch(function error(){
         console.log("Error coming:"+error.data);
       });
    },
  }
}
</script>

<style scoped>
  .c-icon {
    margin-right: 0.3rem;
  }
  .useralign {
    text-align: center;
  }
</style>