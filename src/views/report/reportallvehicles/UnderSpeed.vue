<template>
    
      <CWidgetProgressIcon
        style="background-color: rgb(200, 186, 204)"
        inverse="true"
      >
        <template #default>
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 13px; font-weight: bold; color: black;">
              Under Speed
              <!-- <p style="font-size: 8px; font-weight: bold; color: black;">{{underspeedVC.timeStamp}}</p> -->
            </div>
            <div>
              <p style="font-size:8px;color:rgb(75, 74, 74);font-weight: bold;margin-bottom:35px;cursor: pointer;">ViewReport</p>
              <!-- <CIcon
                style="color: rgb(75, 74, 74); margin-bottom: 22px"
                name="cil-settings"
              /> -->
            </div>
          </div>
          <h6 style="color: red">Min Speed</h6>
          <h6 style="color: red">{{underspeedVC.underSpeedLimit}}km/hr</h6>
        </template>
        <template #progress>
          <div style="display: flex; justify-content: space-between">
            <i style="height:40px;width:40px;" class="fa fa-angle-double-down" aria-hidden="true"></i>
            <!-- <CImg
              size="custom-size"
              v-bind:src="img2"
              :height="50"
              viewBox="0 0 110 134"
            /> -->
            <div>
              <h3 style="color: red; font-weight: bold">{{underspeedVC.count}}</h3>
              <h6 style="color: black">vehicles</h6>
              
            </div>
          </div>
        </template>
      </CWidgetProgressIcon>
    
</template>
<script>
import AnalyticsService from "@/service/AnalyticsService";

export default {
  data() {
    return {
      img1: require("@/assets/icons/reportallvehicles/speed5.png"),
      img2: require("@/assets/icons/reportallvehicles/speed.png"),
      img3: require("@/assets/icons/reportallvehicles/deviation1.png"),
      img4: require("@/assets/icons/reportallvehicles/deviation-26.png"),
      img5: require("@/assets/icons/reportallvehicles/car-service.png"),
      img6: require("@/assets/icons/reportallvehicles/refueler.png"),

      
      underspeedVC: "",
      
      timer: '',
    };
  },
  created() {
    
    this.underSpeedVehicleCount();
    
    this.timer = setInterval(this.underSpeedVehicleCount, 60000)
    
  },
  methods: {
    underSpeedVehicleCount() {
      AnalyticsService.getAllUnderspeedVehicle()
        .then((response) => {
          if (response.status === 200) {
            let serverData = response.data;
            this.underspeedVC = serverData;
    

            //console.log(this.underspeedVC);
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
    
    // reportViewLowFuel(){
    //       this.$router.push({ path: `/base/vehicles/lowFuelVehicle` });
    //  },
    //  reportViewUnderutilized() {
    //    this.$router.push({ path: `/base/vehicles/underUtilizedVehicle` });
    //  }
  },
  beforeDestroy () {
      clearInterval(this.timer)
    },
};
</script>