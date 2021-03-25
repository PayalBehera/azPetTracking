<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/dashboard">
      <CImg
        class="c-sidebar-brand-full"
        size="custom-size"
        v-bind:src="img"
        :height="50"
        viewBox="0 0 110 134"
      />
      <CImg
        class="c-sidebar-brand-minimized"
        size="custom-size"
        v-bind:src="img2"
        :height="35"
        viewBox="0 0 110 134"
      />

      <!-- <div class="img">
      <CImg
       class="image"
       size="custom-size"
       src="https://www.kindpng.com/picc/m/144-1449089_vehicle-gps-tracking-logo-hd-png-download.png"
       :height="35"
       viewBox="0 0 110 134"
   
  />
      <h2
        class="c-sidebar-brand-full"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134">Scorpious
      </h2>
      
      </div>-->
      <!-- <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />-->
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="renderFunction" />

    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
//console.log = function() {};
import navUser from "./_navUser";
import navAdmin from "./_navAdmin";
import navSuperAdmin from "./_navSuperAdmin";

export default {
  name: "TheSidebar",
  //nav,
  data() {
    //console.log("Come"+nav);
    return {
      navUser: navUser,
      navAdmin: navAdmin,
      navSuperAdmin: navSuperAdmin,
 
      img: require("@/assets/icons/WaterMeterLogo_2copy.png"),
      img2: require("@/assets/icons/WaterMeterLogocopy.png"),
 
    };
  },
  // created() {
  //   this.navBar = this.nav;
  // },
  computed: {
    show() {
      return this.$store.state.sidebarShow;
    },
    minimize() {
      //console.log("Minimize value in sidebar:"+this.$store.state.sidebarMinimize)
      return this.$store.state.sidebarMinimize;
    },
    renderFunction: function () {
      //let menu = this.nav;
      //let child_array;
      let userrole = localStorage.getItem("user_role");
      let adminrole = localStorage.getItem("admin_role");
      let superadminrole = localStorage.getItem("superadmin_role");
      // console.log("Role retrive:"+userrole)
      // console.log("Role retrive:"+adminrole)
      /* if (superadminrole == "ROLE_SUPERADMIN") {

        return this.navSuperAdmin.filter(function (item) {
          return item._children;
        });

      }else if (adminrole == "ROLE_ADMIN") {

        return this.navAdmin.filter(function (item) {
          return item._children;
        });

      }else if (userrole == "ROLE_USER") {
        return this.navUser.filter(function (item) {
          return item._children;
          
        });
      }*/

      return this.navAdmin.filter(function (item) {
          return item._children;
        });

      //return this.navBar;
    },
  },
  beforeDestroy() {
    console.log("Delete method call from side bar");
    console.log(this.nav.length);
    // this.nav.filter(function(item) {
    //     item = []
    // })
    //this.nav = []
    //console.log("After clear: "+this.nav.length)
  },
};
</script>

<style>
.img {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
}
.image {
  margin-right: 5px;
}
</style>
