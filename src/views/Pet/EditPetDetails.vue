<!-- <CCol col="12" sm="8"> -->
<template>
  <CRow>
    <CCol col="12" sm="8">
      <CCard>
        <CCardHeader class="card-header">Update Vehicle Details</CCardHeader>
        <CCardBody>
          <form id="neworganization" @submit.prevent="submitForm" class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Vehicle No *</label>
                <div class="control" :class="{'form-group--error': $v.form.vehicleRegNumber.$error}">
                  <input
                    id="vehicleRegNumber"
                    class="form-control"
                    type="text"
                    placeholder="OD34B4572"
                    v-model="form.vehicleRegNumber"
                    @input="$v.form.vehicleRegNumber.$touch()"
                    @blur="$v.form.vehicleRegNumber.$touch()"
                    :error-messages="vehicleRegNumberErrors"
                  />
                </div>
                <div class="error">
                  <span>{{ vehicleRegNumberErrors[0] }}</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Vehicle Type *</label>
               
                <!-- <div class="control" :class="{'form-group--error': $v.form.ownerName.$error}"> -->
                  <select class="form-control btn btn-secondary" 
                    id="vehcleType" 
                    v-model="form.vehcleType" 
                    >
                      <option disabled value="">Please Select Type</option>
                      <option>CAR</option>
                      <option>BUS</option>
                      <option>TRUCK</option>
                      <option>AMBULANCE</option>
                  
                  </select>
                  
                  <!-- <CSelect v-model="selected"
                    
                    id="vehcleType"
                    
                    :options="options"
                    :value.sync="options.id"
                    
                    placeholder="Please Select Type"
                  /> -->
                  
                <!-- </div>
                <div class="error">
                  <span>{{ ownerNameErrors[0] }}</span>
                </div> -->
              </div>
            </div>


            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Vehicle Owner Name *</label>
                <div class="control" :class="{'form-group--error': $v.form.ownerName.$error}">
                  <input
                    id="ownerName"
                    class="form-control"
                    type="text"
                    placeholder="Sritam Bal"
                    v-model="form.ownerName"
                    @input="$v.form.ownerName.$touch()"
                    @blur="$v.form.ownerName.$touch()"
                    :error-messages="ownerNameErrors"
                  />
                </div>
                <div class="error">
                  <span>{{ ownerNameErrors[0] }}</span>
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Owner Number *</label>
                <div class="control" :class="{'form-group--error': $v.form.ownerContact.$error}">
                  <input
                    id="ownerContact"
                    class="form-control"
                    type="text"
                    placeholder="+91 9658133782"
                    v-model="form.ownerContact"
                    @input="$v.form.ownerContact.$touch()"
                    @blur="$v.form.ownerContact.$touch()"
                    :error-messages="ownerContactErrors"
                  />
                </div>
                <div class="error">
                  <span>{{ ownerContactErrors[0] }}</span>
                </div>
              </div>
            </div>

            <div>
              <button class="btn btn-primary btn-submit" type="submit">Update</button>
              <!-- v-on:click.stop.prevent="submit" -->
            </div>
          </form>
        </CCardBody>
      </CCard>
    </CCol>
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

export default {
  name: "Organizationform",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  data() {
    errors: [];
    return {
      form: {
        vehicleRegNumber: "",
        vehcleType: "",
        ownerName: "",
        ownerContact: "",
        vehicleid: "",
        isDisabled: true
      },
      toasterMessage: "This is from variable",
      selected: '',
      options: ['Light Rigid Vehicle','Medium Rigid Vehicle','Heavy Rigid Vehicle']
    };
  },
  created(){
    let vehicleDetails = JSON.parse(localStorage.getItem("vehicleDetails"));
    //console.log("Driver no:"+ vehicleDetails)
    this.getVehicleOwnerDetails(vehicleDetails.vehicleId)
      this.form.vehicleRegNumber = vehicleDetails.vehicleRegnNumber;
      this.form.vehcleType = vehicleDetails.vehicleType;
      
      this.form.vehicleid = vehicleDetails.vehicleId

  },

  methods: {
    // submitForm: function(e) {
    //   console.log('FOrm started');
    //   //this.validateOrgRefId();
    //   this.service.validateOrgRefId();
    //   console.log("This method is invoked - submit form");
    //   //console.log(e.vehicleRegNumber);
      
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
    submitForm(){
      console.log('add vehicle form started');
      // this.validateOrgRefId();
      //this.userService.test();
      console.log("Form started");
      // this.toasterMessage = 'Form submitted successfully';
      // this.makeToast('primary');
      if (!this.$v.form.$touch()) {
        console.log("Form touched");
        console.log(this.form.vehicleRegNumber)
        console.log(this.form.ownerName)
        console.log(this.form.ownerContact)
        console.log(this.form.vehcleType)
        VehicleService.updateVehicleDetails(this.form)
          .then(response => {
            console.log("Coming response"+ response.status)
            console.log(response.data.message)
           if(response.status === 226){
              this.toasterMessage = response.data.message;
              this.makeToast("danger");
            }
            if(response.status === 200){
              // this.toasterMessage = response.data.message;
              // this.makeToast("success");
              localStorage.removeItem("vehicleDetails")
              this.$router.push({path: `/base/vehicles/viewVehicle`})
              this.$root.$emit("vehicleToast", response.data.message);
              
            }
          })
          .catch(error => {
            console.log("gettin some error")
            if (error.response.status === 400) {
              this.toasterMessage = "Bad request from applicaiton";
              this.makeToast("warning");
            } else if (error.response.status === 404) {
              this.toasterMessage = error.response.data.message;
              this.makeToast("danger");
            } else if (error.response.status === 500) {
              this.toasterMessage = "There is some internal server error"
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
    getVehicleOwnerDetails(vehicid) {
      VehicleService.getVehicleOwnerDetails(vehicid)
        .then((response) => {
          console.log("Coming response delet:" + response.status);
          console.log(response.data.message);
          if (response.status === 226) {
            this.toasterMessage = response.data.message;
            this.makeToast("danger");
          }
          if (response.status === 200) {
            console.log("Vehicle Owner Details:" + response.data)
            //this.vehOwner = response.data
          this.form.ownerName = response.data.ownerName;
          this.form.ownerContact = response.data.ownerContact;
            
          }
        })
        .catch((error) => {
          console.log("gettin some error");
          if (error.response.status === 400) {
            this.toasterMessage = "Bad request from applicaiton";
            this.makeToast("warning");
          } else if (error.response.status === 500) {
              this.toasterMessage = "There is some internal server error";
              this.makeToast("danger");
          } else {
            this.toasterMessage = "There is some error please rectify";
            this.makeToast("danger");
          }
          console.log("Control came to block");
          console.log(error.response.data.status);
        });
    },

    checkUniqueOrg(vehicleRegNumber) {
    if (vehicleRegNumber === "asiczen") {
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
      vehicleRegNumber: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(8)
      },
      ownerName: {
        required,
        maxLength: maxLength(40),
        minLength: minLength(1)
      },
      ownerContact: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(10)
      }
    }
  },
  computed: {
    vehicleRegNumberErrors() {
      const errors = [];
      if (!this.$v.form.vehicleRegNumber.$dirty) return errors;

      !this.$v.form.vehicleRegNumber.required &&
        errors.push("Vehicle Registration Number is required.");
      !this.$v.form.vehicleRegNumber.minLength &&
        errors.push("Vehicle Registration Number must be at atleast 8 characters long");
      !this.$v.form.vehicleRegNumber.maxLength &&
        errors.push("Vehicle Registration Number must be at most 10 characters long");

      //console.log("this is invoked");
      //console.log("Error" + errors.length);

      //console.log("Testing testing " + this.form.vehicleRegNumber);

      if (errors.length === 0) {
        if (!this.checkUniqueOrg(this.form.vehicleRegNumber)) {
          errors.push("id is already taken!");
        }
      }

      return errors;
    },
    vehcleTypeErrors() {
      const errors = [];

      if (!this.$v.form.vehcleType.$dirty) return errors;

      !this.$v.form.vehcleType.required &&
        errors.push("Must Select a vehicle type.");


      return errors;
    },

    ownerNameErrors() {
      const errors = [];
      if (!this.$v.form.ownerName.$dirty) return errors;

      !this.$v.form.ownerName.required &&
        errors.push("Owner Name is required.");

      if (!this.haveSpecialChar(this.form.ownerName)) {
        errors.push("Special Characters such as @,#,$ not allowed.");
      }

      !this.$v.form.ownerName.minLength &&
        errors.push("Owner Name must be at atleast 1 character long");
      !this.$v.form.ownerName.maxLength &&
        errors.push("Owner Name must be at most 40 characters long");

      return errors;
    },

    ownerContactErrors() {

      const errors = [];

      if (!this.$v.form.ownerContact.$dirty) return errors;

      !this.$v.form.ownerContact.required &&
        errors.push("Contact Number is required.");

      if (!this.isContactNumberValid(this.form.ownerContact)) {
        errors.push("Please enter a valid contact number");
      }

      return errors;
    },
    
  }
};
</script>
