<template>
    <CWidgetProgressIcon
        style="background-color: rgb(250, 213, 110);"
        inverse="true"
      >
        <template #default>
          <div style="display: flex; justify-content: space-between;padding-top: 2px">
            <div style="font-size: 13px; font-weight: bold; color: black">
              Under Utilized
              <!-- <p style="font-size: 8px; font-weight: bold; color: black;">{{underutilizedVC.timeStamp}}</p> -->
            </div>
            <div>
              <p style="font-size:8px;color:rgb(75, 74, 74);font-weight: bold;margin-bottom:35px;cursor: pointer;" @click="reportViewUnderutilized">ViewReport</p>
              <!-- <CIcon
                style="color: rgb(75, 74, 74); margin-bottom: 22px"
                name="cil-settings"
              /> -->
            </div>
          </div>
          <h6 style="color: red">Utilized Hour</h6>
          <h6 style="color: red">{{underutilizedVC.underUtilizedHours}}Hrs</h6>
        </template>
        <template #progress>
          <div style="display: flex; justify-content: space-between">
            <i style="height:40px;width:40px;" class="fa fa-car" aria-hidden="true"></i>
            <!-- <CImg
              size="custom-size"
              v-bind:src="img5"
              :height="50"
              viewBox="0 0 110 134"
              color="white"
            /> -->
            <div>
              <h3 style="color: red; font-weight: bold">{{underutilizedVC.count}}</h3>
              <h6 style="color: black">vehicles</h6>
            </div>
          </div>
          <!-- <fa-icon class="icon" :icon="['fas','tractor']" style="width: 40px; height: 50px; color:#F2F3F4" /> -->
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

      
      underutilizedVC: "",
      timer: '',
    };
  },
  created() {
    this.underutilizedVehicleCount();
    
    this.timer = setInterval(this.underutilizedVehicleCount, 60000)
    
  },
  methods: {
    
    underutilizedVehicleCount() {
      AnalyticsService.getAllUnderutilizedVehicle()
        .then((response) => {
          if (response.status === 200) {
            let serverData = response.data;
            this.underutilizedVC = serverData;

            //console.log(this.underutilizedVC);
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
     reportViewUnderutilized() {
       this.$router.push({ path: `/base/vehicles/underUtilizedVehicle` });
     }
  },
  beforeDestroy () {
      clearInterval(this.timer)
    },
};
</script>