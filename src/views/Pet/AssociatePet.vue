<!-- <CCol col="12" sm="8"> -->
<template>
  <CRow>
    <CCol col="12" sm="7">
      <div>
            <CRow>
                <CCol sm="12">
                    <CCard>
                        <CCardHeader>
                            Associated Vehicle With Device List
                        </CCardHeader>
                        <CCardBody>
                        
                            <template>
                        
                                <CDataTable
                                    :items="computedItems"
                                    :fields="fields"
                                    
                                    table-filter
                                    items-per-page-select
                                    :items-per-page="5"
                                    hover
                                    sorter
                                    pagination
                                    >
                                </CDataTable>
                        
                            </template>

                        </CCardBody>
                    
                    </CCard>
                </CCol>
            
            </CRow>
        </div>
    </CCol>
    <CCol col="12" sm="5">
      <CCard>
        <CCardHeader class="card-header">Associate Vehicle</CCardHeader>
        <CCardBody>
          <form id="neworganization" @submit.prevent="submitForm" class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                  <label for="validationTooltip01">Vehicle No *</label>
                  <select class="form-control btn btn-secondary" id="vehicleid" v-model="form.vehicleid">
                    <option disabled value="">Select Vehicle</option>
                    <option v-for="vehicle in vehicleList" v-bind:key="vehicle.id" v-bind:value="vehicle.vehicleId">{{vehicle.vehicleRegnNumber}}</option>
                    
                  </select>
                </div>
              
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Device IMEI *</label>
                
                <select class="form-control btn btn-secondary" id="deviceid" v-model="form.deviceid">
                  <option disabled value="">Select Device</option>
                  <option v-for="device in deviceList" v-bind:key="device.id" v-bind:value="device.deviceId">{{device.imeiNumber}}</option>
                 
                </select>
              </div>
            </div>
              

            
            

           

           
            <div>
              <button class="btn btn-primary btn-submit" type="submit">Save</button>
              <!-- v-on:click.stop.prevent="submit" -->
            </div>
          </form>
        </CCardBody>
      </CCard>
    </CCol>
    <!-- <CCol col="0" sm="4">
        <CCard>
        <CCardHeader>Payroll</CCardHeader>
        <CCardBody>
        <CButton size="lg" variant="outline" color="primary" block>Download the demo Excel</CButton>
        <br/>
        <CInputFile label="File custom input" horizontal custom />
        <br/>
        <CButton size="lg" variant="outline" color="success" block>Upload</CButton>
        </CCardBody>
        </CCard>
    </CCol> -->
  </CRow>

  <!-- </div> -->
</template>

<script>
//import { orgService } from "../_services/organization.service";
import VehicleService from "@/service/VehicleService";
import { userService } from "@/_services/index.js";

import { validationMixin } from "vuelidate";
import {
  required,
  email,
  maxLength,
  minLength,
  between
} from "vuelidate/lib/validators";
import Vuelidate from "vuelidate";

//Showing Static data in table
/*const items = [
  { vehicle_no: 'OD34B4323', device_IMEI: '2012901801'},
  { vehicle_no: 'OD33B4326', device_IMEI: '2012002501'},
  { vehicle_no: 'OD34H4993', device_IMEI: '2012602101'},
  { vehicle_no: 'OD34T4303', device_IMEI: '2012703401'},
  { vehicle_no: 'OD32A4343', device_IMEI: '2012901621'},
  { vehicle_no: 'OD04B4563', device_IMEI: '2012501801'},
  { vehicle_no: 'OD04B4323', device_IMEI: '2012102901'},
  { vehicle_no: 'OD04B4323', device_IMEI: '2012902001'},
  { vehicle_no: 'OD04B4323', device_IMEI: '2012503701'},
  { vehicle_no: 'OD04B4323', device_IMEI: '2012901821'},
  { vehicle_no: 'OD04B4323', device_IMEI: '2012501501'},
  { vehicle_no: 'OD04B4323', device_IMEI: '2012802701'},
  { vehicle_no: 'OD30B4323', device_IMEI: '2012202801'},
  { vehicle_no: 'OD30B4323', device_IMEI: '2012403901'},
  { vehicle_no: 'OD30B4323', device_IMEI: '2012501521'},
  { vehicle_no: 'OD24B4323', device_IMEI: '2012901801'},
  { vehicle_no: 'OD24B4323', device_IMEI: '2012902901'},
  { vehicle_no: 'OD14B4323', device_IMEI: '2012702901'},
  { vehicle_no: 'OD14B4323', device_IMEI: '2012903401'},
  { vehicle_no: 'OD14B4323', device_IMEI: '2012001621'},
  { vehicle_no: 'OD14B4323', device_IMEI: '2012601701'},
  { vehicle_no: 'OD33B4323', device_IMEI: '2012802801'},
  { vehicle_no: 'OD33B4323', device_IMEI: '2012402901'},
  { vehicle_no: 'OD33B4323', device_IMEI: '2012503421'},
  { vehicle_no: 'OD31B4323', device_IMEI: '2012301701'}
 
]*/

//Table fields
const fields = [
  { key: 'vehicleNumber', label: 'Vehicle Number', _style:'width:10%; height:50px;' },
  { key: 'imeiNumber', label: 'Device IMEI', _style:'width:10%;height:50px;'}, 
]

export default {
  name: "Organizationform",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  name: 'AssociateVehicles',
  data() {
    errors: [];
    return {
      form: {
        vehicleid: "",
        deviceid: "",
        isDisabled: true
      },
      toasterMessage: "This is from variable",
       //items: items.map((item, id) => { return {...item, id}}),
        fields,
        deviceList: [],
        vehicleList: [],
        deviceVehicleMap: [],
    };
  },
   
  created(){
    this.getAllDeviceImei();
    this.getAllVehicleNumber();
    this.getAllDeviceVehicleMap();
  },
  methods: {
    // submitForm: function(e) {
    //   console.log('FOrm started');
    //   //this.validateOrgRefId();
    //   this.service.validateOrgRefId();
    //   console.log("This method is invoked - submit form");
    //   //console.log(e.orgRefName);
      
    // },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.toasterMessage}`, {
        title: "Message",
        autoHideDelay: 5000,
        variant: variant,
        solid: true,
        appendToast: false
      });
    },
    getAllDeviceVehicleMap() {
       VehicleService.getAllDeviceVehicleMapList().then(response => {
         console.log("Coming response"+ response.status)
         if(response.status === 200){
              
              let serverData = response.data;
              this.deviceVehicleMap = serverData;
              //this.toasterMessage = response.message;
              //this.makeToast("success");
              //console.log(this.items);
            }
         
       }).catch(function error(){
         console.log(error);
       });
    },
    getAllDeviceImei() {
       VehicleService.getAllDeviceImeiList().then(response => {
         console.log("Coming response"+ response.status)
         if(response.status === 200){
              
              let serverData = response.data;
              this.deviceList = serverData.data;
              //this.toasterMessage = response.message;
              //this.makeToast("success");
              console.log(this.items);
            }
         
       }).catch(function error(){
         console.log(error);
       });
    },
    getAllVehicleNumber() {
       VehicleService.getAllVehicleNumberList().then(response => {
         console.log("Coming response"+ response.status)
         if(response.status === 200){
              
              let serverData = response.data;
              this.vehicleList = serverData.data;
              //this.toasterMessage = response.message;
              //this.makeToast("success");
              console.log("vehicle id:"+this.vehicleList[0])
              console.log(this.items);
            }
         
       }).catch(function error(){
         console.log(error);
       });
    },
    submitForm(){
      console.log('Associate vehicle with device form started');
      // this.validateOrgRefId();
      //this.userService.test();
      console.log("Form started");
      // this.toasterMessage = 'Form submitted successfully';
      // this.makeToast('primary');
      if (!this.$v.form.$touch()) {
        console.log("Form Input data print");
        
        console.log(this.form.vehicleid)
        console.log(this.form.deviceid)
        VehicleService.createDeviceVehiclemap(this.form)
          .then(response => {
            console.log("Coming response"+ response.status)
            console.log(response.data.message)
           if(response.status === 226){
              this.toasterMessage = response.data.message;
              this.makeToast("danger");
            }
            if(response.status === 201){
              this.getAllDeviceVehicleMap();
              this.toasterMessage = response.data.message;
              this.makeToast("success");
            }
          })
          .catch(error => {
            console.log("gettin some error")
            if (error.response.status === "400") {
              this.toasterMessage = "Bad request from applicaiton";
              this.makeToast("warning");
            } else if (error.response.status === "226") {
              this.toasterMessage = error.response.data.message;
              this.makeToast("danger");
            } else {
              this.toasterMessage = "There is some error please rectify";
              this.makeToast("danger");
            }
            console.log("Control came to block");
            console.log(error.response.data.status);
          });
      } else {
        this.toasterMessage = "Please fill the details to submit the form";
        this.makeToast("danger");
        return;
      }

    },

    checkUniqueOrg(orgRefName) {
    if (orgRefName === "asiczen") {
        return false;
      } else {
        return true;
      }
    },

    haveSpecialChar(inputData) {
      const regex = /^[A-Za-z0-9 ]+$/;
      var isValid = regex.test(inputData);

      if (isValid) {
        return true;
      } else {
        return false;
      }
    },

    isContactNumberValid(inputData) {
      const regex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
      var isValid = regex.test(inputData);

      if (isValid) {
        return true;
      } else {
        return false;
      }
    },

    isEmailidUnique(emailid) {
      if (emailid === "sanjeet.mohanty@db.com") {
        return true;
      } else {
        return false;
      }
    }
  },

  validations: {
    form: {
      orgRefName: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(3)
      },
      orgName: {
        required,
        maxLength: maxLength(50),
        minLength: minLength(3)
      },
      contactEmail: {
        required,
        email
      },
      description: {
        required
      },
      contactNumber: {
        required
      },
      firstName: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(1)
      },
      lastName: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(1)
      }
    }
  },
  computed: {
    computedItems () {
      return this.deviceVehicleMap.map(item => {
        if (item.imeiNumber === undefined){
          return { 
          ...item, 
          imeiNumber: "-", 
          //registeredDate: item.registered.date 
        }
        }else{
            return { 
          ...item, 
          imeiNumber: item.imeiNumber, 
          //registeredDate: item.registered.date 
        }
        }
      })
    },
    

    contactNumberErrors() {
      const errors = [];

      if (!this.$v.form.contactNumber.$dirty) return errors;

      !this.$v.form.contactNumber.required &&
        errors.push("Contact Number is required.");

      if (!this.isContactNumberValid(this.form.contactNumber)) {
        errors.push("Please enter a valid contact number");
      }

      return errors;
    },

    
  }
};
</script>