<template>
  <div>
    <CCard style="height: 160px" inverse="true">
      <div style="display: flex; justify-content: space-between">
        <div
          style="
        font-size: 14px; 
        font-weight: bold; 
        color: black; 
        margin-top: 2px; 
        margin-left: 7px;
        "
        >
          Fleet Idle
        </div>
        <!-- <div>
          <CIcon
            style="color: rgb(75, 74, 74); margin-bottom: 22px; top: 0"
            name="cil-settings"
          />
        </div> -->
      </div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin: 20px;
          padding: 5px;
        "
      >
        <div>
          <p style="color: rgb(129, 13, 13)">Total Fleet Idle</p>
          <div style="display: flex; justify-content: space-between">
            <CImg
              size="custom-size"
              v-bind:src="img5"
              :height="35"
              viewBox="0 0 110 134"
            />

            <h4 style="color: rgb(89, 133, 116); font-weight: bold">35hr</h4>
          </div>
        </div>
        <div style="margin-top: 20px">
          <CImg
            size="custom-size"
            v-bind:src="img3"
            :height="30"
            viewBox="0 0 110 134"
          />
        </div>
        <div>
          <p style="color: rgb(129, 13, 13)">Approx Fuel Waste</p>

          <div style="display: flex; justify-content: space-between">
            <CImg
              size="custom-size"
              v-bind:src="img6"
              :height="35"
              viewBox="0 0 110 134"
            />
            <h4 style="color: rgb(129, 13, 13); font-weight: bold">35hr</h4>
          </div>
        </div>
      </div>
      <CRow class="magrow">
      <p style="color: rgb(105, 105, 105); font-size: 10px;">
       <!-- <span style="color: rgb(105, 105, 105); font-size: 10px; margin: 2px;"> Note: Generally,an idling car uses somewhere between 1.89 to 2.64 liter
        of fuel per hour.</span> -->
      </p>
      </CRow>
    </CCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img5: require("@/assets/icons/bus.png"),
      img6: require("@/assets/icons/gas-station.png"),
      img3: require("@/assets/icons/double-right.png"),
    };
  },
};
</script>
<style scoped>
.charthei {
  width: 100%;
  height: 100%;
  margin: 0px 20px 15px 0px;
  padding: 0;
}
.magrow {
  padding-top: 2px;
  margin-bottom: 7px;
  margin-left: 2px;
  margin-right: 2px;
}
</style>