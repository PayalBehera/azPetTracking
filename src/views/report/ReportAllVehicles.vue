<template>
<div>
  <CRow>
    <CCol col="12" sm="3">
      <OverSpeed/>
    </CCol>
    <CCol col="12" sm="3">
      <UnderSpeed/>
    </CCol>
    <CCol col="12" sm="3">
      <LowFuel/>
    </CCol>
    <CCol col="12" sm="3">
      <UnderUtilized/>
    </CCol>
    <!-- <CCol col="12" sm="2">
      <CWidgetProgressIcon
        style="background-color: rgb(171, 247, 136)"
        inverse="true"
      >
        <template #default>
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 13px; font-weight: bold; color: black">
              Fence Deviation Out
            </div>
            <div>
              <CIcon
                style="color: rgb(75, 74, 74); margin-bottom: 22px"
                name="cil-settings"
              />
            </div>
          </div>
          <h6 style="color: rgb(53, 12, 156)">Max Speed</h6>
          <h6 style="color: red">45km/hr</h6>
        </template>
        <template #progress>
          <div style="display: flex; justify-content: space-between">
            <CImg
              size="custom-size"
              v-bind:src="img3"
              :height="50"
              viewBox="0 0 110 134"
              color="white"
            />
            <div>
              <h3 style="color: red; font-weight: bold">76</h3>
              <h6 style="color: black">vehicles</h6>
            </div>
          </div>
        </template>
      </CWidgetProgressIcon>
    </CCol>
    <CCol col="12" sm="2">
      <CWidgetProgressIcon
        style="background-color: rgb(206, 183, 183)"
        inverse="true"
      >
        <template #default>
          <div style="display: flex; justify-content: space-between">
            <div style="font-size: 13px; font-weight: bold; color: black">
              Fence Deviation In
            </div>
            <div>
              <CIcon
                style="color: rgb(75, 74, 74); margin-bottom: 22px"
                name="cil-settings"
              />
            </div>
          </div>
          <h6 style="color: red">Max Speed</h6>
          <h6 style="color: red">45km/hr</h6>
        </template>
        <template #progress>
          <div style="display: flex; justify-content: space-between">
            <CImg
              size="custom-size"
              v-bind:src="img4"
              :height="46"
              viewBox="0 0 110 134"
              color="white"
            />
            <div>
              <h3 style="color: red; font-weight: bold">76</h3>
              <h6 style="color: black">vehicles</h6>
            </div>
          </div>
        </template>
      </CWidgetProgressIcon>
    </CCol> -->
    <!-- <CCol col="3" sm="2">
      <CWidgetProgressIcon
        color="primary" inverse=true
      >
      
      <template #default>
        <div class="text1">
          <h6>Vehicle</h6>
        <h3>15km/h</h3>
        
        </div>
      </template>
        <template #progress>
          <CIcon name="cil-speedometer" height="40"/>
        </template>
      </CWidgetProgressIcon>
    </CCol> -->
  </CRow>
</div>
</template>
<script>
const LowFuel = () =>
  import("@/views/report/reportallvehicles/LowFuel");
const OverSpeed = () =>
  import("@/views/report/reportallvehicles/OverSpeed");
const UnderSpeed = () =>
  import("@/views/report/reportallvehicles/UnderSpeed");
const UnderUtilized = () =>
  import("@/views/report/reportallvehicles/UnderUtilized");

export default {
  components: {
    LowFuel,
    OverSpeed,
    UnderSpeed,
    UnderUtilized
  },
  data() {
    return {
      img1: require("@/assets/icons/reportallvehicles/speed5.png"),
      img2: require("@/assets/icons/reportallvehicles/speed.png"),
      img3: require("@/assets/icons/reportallvehicles/deviation1.png"),
      img4: require("@/assets/icons/reportallvehicles/deviation-26.png"),
      img5: require("@/assets/icons/reportallvehicles/car-service.png"),
      img6: require("@/assets/icons/reportallvehicles/refueler.png"),

      overspeedVC: "",
      underspeedVC: "",
      lowfuelVC: "",
      underutilizedVC: "",
      timer: '',
    };
  },
  created() {
    
  },
  methods: {
    
  },
};
</script>