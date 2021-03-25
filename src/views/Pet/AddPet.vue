<!-- <CCol col="12" sm="8"> -->
<template>
  <CRow>
    <CCol col="12" sm="8">
      <CCard>
        <CCardHeader class="card-header">Add Pet</CCardHeader>
        <CCardBody>
          <form id="neworganization" @submit.prevent="submitForm" class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Pet Name *</label>
                <!-- <div class="control" :class="{'form-group--error': $v.form.vehicleRegNumber.$error}"> -->
                   <div class="iconinput inputIconbg">
                  <input
                    id="PetName"
                    class="form-control"
                    type="text"
                    placeholder="Enter Pet Name"
                    v-model="form.PetName"
                   
                  />
                  <fa-icon class="icon" :icon="['fas','paw']" style="width: 36px; height: 42px" />
                 </div>
                <!-- </div>
                <div class="error">
                  <span>{{ vehicleRegNumberErrors[0] }}</span>
                </div> -->
              </div>

                  <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Pet Type *</label>
                <select v-model="selectedContinent" class="form-control btn btn-secondary" >
                    <option value="">Select a Pet Type</option>
                    <option v-for="(country_obj, country) in places" :value="country" :key="country_obj">{{country}}</option>
                </select>
            </div>
            
              
                
            </div>


            <div class="form-row">
               <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Breed Type *</label>
                <select :disabled="countries.length == 0" v-model="selectedCountry" class="form-control btn btn-secondary" >
                    <option value="">Select breed Type</option>
                    <option v-for="(city_obj, city) in countries" :key="city_obj">{{city}}</option>
                </select>
            </div>
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Color *</label>
                <!-- <div class="control" :class="{'form-group--error': $v.form.ownerName.$error}"> -->
                  <div class="iconinput inputIconbg">
                  <input
                    id="color"
                    class="form-control"
                    type="text"
                    placeholder="Enter Color"
                    v-model="form.color"
                   
                  />
                  <fa-icon class="icon" :icon="['fas','snowflake-o']" style="width: 36px; height: 42px" />
                 </div>
                <!-- </div>
                <div class="error">
                  <span>{{ ownerNameErrors[0] }}</span>
                </div> -->
              </div>

              
            </div>

            <div>
              <button class="btn btn-primary btn-submit" type="submit">Add Pet</button>
              <!-- v-on:click.stop.prevent="submit" -->
            </div>
          </form>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol col="0" sm="4">
        <CCard>
        <CCardHeader>Add Pet</CCardHeader>
        <CCardBody>
        <CButton size="lg" variant="outline" color="primary" block>Download the existing Pet list</CButton>
        <br/>
        <CInputFile label="File custom input" horizontal custom />
        <br/>
        <CButton size="lg" variant="outline" color="success" block>Upload</CButton>
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
        PetName: "",
        petType: "",
        breedType: "",
        color: "",
        
      },
        places: {
                "Asia": {
                    "China": ["Beijing", "Shanghai", "Guangzhou", "Tianjin"],
                    "India": ["New Delhi", "Mumbai", "Bangalore", "Chennai"],
                    "Japan": ["Tokyo", "Kyoto", "Nagoya", "Hiroshima"],
                    "Singapore": ["Singapore"],
                    "Malaysia": ["Kuala Lumpur", "Johor Bahru", "George Town", "Kota Kinabalu"]
                },
                "Europe": {
                    "Germany": ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart"],
                    "UK": ["London", "Birmingham", "Liverpool", "Bristol"],
                    "France": ["Paris", "Marseille", "Bordeaux", "Toulouse"]
                }
            },
            countries: [],
            cities: [],
            selectedContinent: "",
            selectedCountry: "",
            selectedCity: "",
      toasterMessage: "This is from variable",
      selected: '',
      options: ['Light Rigid Vehicle','Medium Rigid Vehicle','Heavy Rigid Vehicle']
    };
  },
 watch: {
        selectedContinent: function() {
            // Clear previously selected values
            this.countries = [];
            this.cities = [];
            this.selectedCountry = "";
            this.selectedCity = "";
            // Populate list of countries in the second dropdown
            if (this.selectedContinent.length > 0) {
                this.countries = this.places[this.selectedContinent]
            }
        }
 },
  methods: {
    // submitForm: function(e) {
    //   console.log('FOrm started');
    //   //this.validateOrgRefId();
    //   this.service.validateOrgRefId();
    //   console.log("This method is invoked - submit form");
    //   //console.log(e.vehicleRegNumber);
      
    // },
     selectedCountry: function() {
            // Clear previously selected values
            this.cities = [];
            this.selectedCity = "";
            // Now we have a continent and country. Populate list of cities in the third dropdown
            if (this.selectedCountry.length > 0) {
                this.cities = this.places[this.selectedContinent][this.selectedCountry]
            }
        },
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
      //if (!this.$v.form.$touch()) {
      this.$v.form.$touch();
       if(this.$v.$pendding || this.$v.$error)return;
        console.log("Form touched");
        VehicleService.create(this.form)
          .then(response => {
            console.log("Coming response"+ response.status)
            console.log(response.data.message)
           if(response.status === 226){
              this.toasterMessage = response.data.message;
              this.makeToast("danger");
            }
            if(response.status === 201){
              this.toasterMessage = response.data.message;
              this.makeToast("success");
              this.$v.$reset();
              this.resetData();
            }
          })
          .catch(error => {
            console.log("gettin some error")
            console.log("Response : "+error.response.status)
            console.log(error.response.data.message)
            if (error.response.status === 400) {
              this.toasterMessage = error.response.data.message;
              this.makeToast("warning");
            } else if (error.response.status === 409) {
              this.toasterMessage = error.response.data.message;
              this.makeToast("danger");
            } else if (error.response.status === 500) {
              this.toasterMessage = error.response.data.message;
              this.makeToast("danger");
            } else {
              this.toasterMessage = "There is some error please rectify";
              this.makeToast("danger");
            }
            console.log("Control came to block");
            console.log(error.response.data.status);
          });
      // } else {
      //   this.toasterMessage = "Please fill the details to submit the form";
      //   this.makeToast("danger");
      //   return;
      // }

    },
    resetData() {
      this.form.vehicleRegNumber= "";
       this.form.vehcleType= "";
       this.form.ownerName= "";
       this.form.ownerContact= "";
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
      },
       vehcleType: {
        required
     },
    }
  },
  computed: {
    vehicleRegNumberErrors() {
      const errors = [];
      if (!this.$v.form.vehicleRegNumber.$dirty) return errors;

      !this.$v.form.vehicleRegNumber.required &&
        errors.push("Vehicle Registration Number is required.");
      if (!this.haveSpecialChar(this.form.vehicleRegNumber)) {
        errors.push("Special Characters such as @,#,$ not allowed.");
      }
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
<style>
    .iconinput input[type=text]{
      padding-left:50px ;
    }
    .iconinput{
      position: relative;
    }
    .icon{
      position: absolute;
      left:0;
      top:0;
      padding: 11px 10px;
    }
    .iconinput input[type=text]:focus + .icon{
      color: blue;
    }
    .iconinput.inputIconbg .icon{
    background-color: #aaa;
    color: #fff;
    padding: 9px 4px;
    border-radius: 4px 0 0 4px;
    }
    .iconinput.inputIconbg input[type=text]:focus + .icon{
      color:#fff;
      background-color: dodgerblue;
    }
</style>
