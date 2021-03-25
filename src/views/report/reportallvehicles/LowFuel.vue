<template>
    <CWidgetProgressIcon
        style="background-color: rgb(165, 209, 205)"
        inverse="true"
      >
        <template #default>
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 13px; font-weight: bold; color: black">
              Low Fuel
              <!-- <p style="font-size: 8px; font-weight: bold; color: black;">{{lowfuelVC.timeStamp}}</p> -->
            </div>
            <div>
              <p style="font-size:8px;color:rgb(75, 74, 74);font-weight: bold;margin-bottom:35px;cursor: pointer;" @click="reportViewLowFuel">ViewReport</p>
              <!-- <CIcon
                style="color: rgb(75, 74, 74); margin-bottom: 22px"
                name="cil-settings"
              /> -->
            </div>
          </div>
          <h6 style="color: red">Min Fuel</h6>
          <h6 style="color: red">{{lowfuelVC.lowFuelPercent}} %</h6>
        </template>
        <template #progress>
          <div style="display: flex; justify-content: space-between">
            <!-- <fa-icon class="icon" :icon="['fas','gas-pump']" style="width: 40px; height: 50px; color:#F2F3F4" /> -->
            <i style="height:40px;width:40px;" class="fa fa-tint" aria-hidden="true"></i>
            <!-- <CImg
              size="custom-size"
              v-bind:src="img6"
              :height="50"
              viewBox="0 0 110 134"
              color="white"
            /> -->
            <div>
              <h3 style="color: red; font-weight: bold">{{lowfuelVC.count}}</h3>
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

      
      lowfuelVC: "",
      
      timer: '',
    };
  },
  created() {
    
    this.lowfuelVehicleCount();
    this.timer = setInterval(this.lowfuelVehicleCount, 60000)
    
  },
  methods: {
    
    
    lowfuelVehicleCount() {
      AnalyticsService.getAllLowfuelVehicle()
        .then((response) => {
          if (response.status === 200) {
            let serverData = response.data;
            this.lowfuelVC = serverData;
            

            //console.log(this.lowfuelVC);
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
    
    reportViewLowFuel(){
          this.$router.push({ path: `/base/vehicles/lowFuelVehicle` });
     },
  },
  beforeDestroy () {
      clearInterval(this.timer)
    },
};
</script>