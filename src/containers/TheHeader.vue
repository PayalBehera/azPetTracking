<template>
  <div>
    <CHeader fixed with-subheader light>
      <CToggler
        in-header
        class="ml-3 d-lg-none"
        @click="$store.commit('toggleSidebarMobile')"
      />
      <!-- <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
      />-->
      <CToggler
        in-header
        class="ml-3 d-md-down-none"
        @click="$store.commit('set', ['sidebarMinimize', !minimize])"
      />
      <CHeaderBrand class="mx-auto d-lg-none">
        <CIcon name="logo" height="48" alt="Logo" />
      </CHeaderBrand>
      <CHeaderNav class="d-md-down-none mr-auto">
        <CHeaderNavItem class="px-3">
          <!-- <CHeaderNavLink to="/dashboard">Live Tracking</CHeaderNavLink> -->
        </CHeaderNavItem>
        <CHeaderNavItem class="px-3">
          <!-- <CHeaderNavLink to="/base/report">Reports</CHeaderNavLink> -->
        </CHeaderNavItem>
      </CHeaderNav>
      <CHeaderNav class="mr-4" style="position:relative;left:-35%;">
       <CHeaderNavItem class="px-3">
          <CHeaderNavLink ><h3 style="color:green; font-style: oblique;font-family:Times New Roman;margin-bottom:17px; margin-top:17px;padding:5px; ">{{orgname}}</h3></CHeaderNavLink>
        </CHeaderNavItem>
       
      </CHeaderNav>
      <CHeaderNav class="mr-4">
        <CHeaderNavItem class="d-md-down-none mx-2">
          <TheNotification />
        </CHeaderNavItem>

        <TheHeaderDropdownAccnt />
      </CHeaderNav>
    </CHeader>
  </div>
</template>

<script>
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt";
import TheNotification from "./TheNotification";
import AccountService from "@/service/AccountService";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccnt,
    TheNotification,
  },
  data() {
    return {
      orgname:'',
      connected: false,
      toggle: false,
      alertMessage: [],
      url: process.env.VUE_APP_SOCKET_URL,
    };
  },
  created() {
    console.log("Component has been created inside header!");
    //this.getAccountsDetails();
  },
  computed: {
    minimize() {
      //console.log("Minimize value in Header:"+this.$store.state.sidebarMinimize)
      return this.$store.state.sidebarMinimize;
    },
  },
  methods: {

     getAccountsDetails() {
       AccountService.getCurrentUserInfo()
       .then(response => {
         console.log("Coming response inside accountsdetails"+ response.status)
         if(response.status === 200){
              
              this.orgname=response.data.orgRefName
               
             
            }
         
       }).catch(function error(){
         console.log("Error on current:"+error);
       });
    },
    /*rowclick(m,index){
          //m.mesg.pop();
            console.log("delete");
          // m.splice(index,1);
          this.alertMessage.splice(index,1);
        
    },
    clearall(){
      this.alertMessage=[]
    }*/
  },
  beforeDestroy() {
    /*if(this.connected) {

      this.stompClient.unsubscribe("orgAlert");
      this.stompClient.disconnect();

     }*/
  },
};
</script>

