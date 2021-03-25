<template>
  <CRow>
    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" :header='`${vehicleCount}`' text="Vehicles">
        <template #default>
          <CDropdown color="transparent p-1" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
             <CDropdownItem>Live Tracking</CDropdownItem>
            <CDropdownItem>Vehicle Usage</CDropdownItem>
            <CDropdownItem>Fuel Consumption</CDropdownItem>
            <CDropdownItem disabled>Vehicle count</CDropdownItem>
            
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            pointed
            class="mt-3 mx-3"
            style="height:60px"
            :data-points="[65, 59, 84, 84, 51, 55, 40]"
            point-hover-background-color="info"
            label="Active Vehicles"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>

     

    <CCol sm="6" lg="3">
      <CWidgetDropdown color="primary" :header='`${driverCount}`' text="Driver">
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Driver Assigned</CDropdownItem>
            <CDropdownItem>Driver Count</CDropdownItem>
            
          </CDropdown>
        </template>
        <template #footer>
          <CChartLineSimple
            class="mt-3"
            style="height:60px"
            background-color="rgba(255,255,255,.2)"
            :data-points="[78, 81, 80, 45, 34, 12, 40]"
            :options="{ elements: { line: { borderWidth: 2.5 }}}"
            point-hover-background-color="warning"
            label="Drivers"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol>
    <CCol sm="6" lg="3">
      
      <CWidgetDropdown color="primary" :header='`${deviceCount}`' text="Devices">
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Device Usage</CDropdownItem>
            <CDropdownItem>Device Count</CDropdownItem>
            
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mt-3 mx-3"
            style="height:60px"
            background-color="rgb(250, 152, 152)"
            label="Device"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol> 
    <CCol sm="6" lg="3">
      
      <CWidgetDropdown color="primary" header="25.05L" text="Fuel Consumption">
        <template #default>
          <CDropdown color="transparent p-0" placement="bottom-end">
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Daily</CDropdownItem>
            <CDropdownItem>Monthly</CDropdownItem>
            
          </CDropdown>
        </template>
        <template #footer>
          <CChartBarSimple
            class="mt-3 mx-3"
            style="height:60px"
            background-color="rgb(250, 152, 152)"
            label="Device"
            labels="months"
          />
        </template>
      </CWidgetDropdown>
    </CCol> 
  
  
  
     <!-- <CCol sm="6">

        <CCard>
          <CWidgetDropdown color="primary"  text="Monthly">
          <CDropdown color="transparent p-0" >
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Monthly</CDropdownItem>
            <CDropdownItem>Weekly</CDropdownItem>
            <CDropdownItem>Daily</CDropdownItem>
            
          </CDropdown>
          </CWidgetDropdown>
          <CCardBody>

            <CChartLineExample />
          </CCardBody>
        </CCard>
      </CCol>

       <CCol sm="6">

        <CCard>
          <CWidgetDropdown color="primary"  text="Monthly">
          <CDropdown color="transparent p-0" >
            <template #toggler-content>
              <CIcon name="cil-settings" />
            </template>
            <CDropdownItem>Monthly</CDropdownItem>
            <CDropdownItem>Weekly</CDropdownItem>
            <CDropdownItem>Daily</CDropdownItem>
            
          </CDropdown>
      </CWidgetDropdown>
          <CCardBody>

            <CChartBarExample />
          </CCardBody>
        </CCard>
      </CCol> -->
     
  </CRow>
  
</template>

<script>
import { CChartLineExample } from "../charts/index.js";
import { CChartLineSimple } from "../charts/index.js";
import { CChartBarExample } from "../charts/index.js";

import VehicleService from "@/service/VehicleService";
import DeviceService from "@/service/DeviceService";
import DriverService from "@/service/DriverService";

export default {
  name: "WidgetsDropdown",
  components: { CChartLineExample,
  CChartLineSimple,
   CChartBarExample 
   },
   data() {
     return {
       vehicleCount: 0,
       deviceCount: 0,
       driverCount: 0
     }

   },
   created() {
      this.getAllVehicleCountList()
      this.getAllDeviceCount()
      this.getAllDriverCount()
   },
   methods: {
     getAllVehicleCountList() {
      VehicleService.getAllVehicleCount()
        .then((response) => {
          console.log("Coming response from vehicle count: " + response.status);
          if (response.status === 200) {
            
            // this.toasterMessage = response.message;
            // this.makeToast("success");
            console.log("Vehicle Count:"+response.data.count);
            this.vehicleCount = response.data.count
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
    getAllDeviceCount() {
       DeviceService.getDeviceCount().then(response => {
         console.log("Coming response Device Count:"+ response.status)
         if(response.status === 200){
              
            this.deviceCount = response.data.count
              // this.toasterMessage = response.data.message;
              // this.makeToast("success");
              console.log("Device Count:"+response.data.count);
            }
         
       }).catch(function error(){
         console.log(error);
       });
    },
     getAllDriverCount() {
       DriverService.getDriverCount().then(response => {
         console.log("Coming response"+ response.status)
         if(response.status === 200){
              
              this.driverCount = response.data.count
              // this.toasterMessage = response.message;
              // this.makeToast("success");
              console.log("Driver Count:"+response.data.count);
            }
         
       }).catch(function error(){
         console.log(error);
       });
    },
   }
};
</script>