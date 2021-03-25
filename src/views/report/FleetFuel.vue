<template>
<div>
<CCard

    style="height: 160px"
    inverse="true"
  >
  <div
    style="
      height: 160px;

      outline: rgb(228, 224, 224) solid 5px;
      box-sizing: border-box;
    "
  >
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-left: 10px;
        margin-right: 10px;
      "
    >
      <div
        style="
          font-size: 14px;
          font-weight: bold;
          color: black;
          margin-top: 2px;
        "
      >
        Fleet Fuel
      </div>
      <!-- <div>
        <CIcon
          style="margin-bottom: 22px; margin-top: 10px"
          name="cil-settings"
        />
      </div> -->
    </div>
    <div
      style="
        display: flex;
        justify-content: space-between;
        margin-left: 30px;
        margin-right: 30px;
        padding: 3px;
      "
    >
      <div>
        <p style="color: rgb(129, 13, 13)">Total Fuel Refill</p>

        <div style="display: flex; justify-content: space-between">
          <CImg
            size="custom-size"
            v-bind:src="img6"
            :height="35"
            viewBox="0 0 110 134"
          />
          <CCol>
            <CRow>
              <h4 style="color: rgb(89, 133, 116); font-weight: bold">
                1035 ltr
              </h4>
            </CRow>

            <CRow>
              <p style="color: rgb(89, 133, 116); font-size: 10px">
                (100 times)
              </p>
            </CRow>
          </CCol>
        </div>
      </div>
      <div
        style="
          border-left: 1px solid gray;
          height: 90px;
          position: absolute;
          left: 50%;
          margin-left: -3px;
        "
      ></div>
      <div>
        <p style="color: rgb(129, 13, 13)">Total Fuel Drain</p>

        <div style="display: flex; justify-content: space-between">
          <CImg
            size="custom-size"
            v-bind:src="img4"
            :height="35"
            viewBox="0 0 110 134"
          />
          <CCol>
            <CRow>
              <h4 style="color: red; font-weight: bold; margin-left: 5px">
                35 ltr
              </h4>
            </CRow>

            <CRow>
              <p style="color: red; font-size: 10px">(10 times)</p>
            </CRow>
          </CCol>
        </div>
      </div>
    </div>
  </div>
</CCard>
</div>
</template>>
<script>
export default {
    data() {
    return {
      img6: require("@/assets/icons/reportallvehicles/gas-station.png"),
      img4: require("@/assets/icons/reportallvehicles/engine-oil-level.png"),
    }
    }
}
</script>