<template>
 
  <div>
    <CRow>
      <CCol col="12" sm="8">
        <CCard>
          <CCardHeader class="card-header">Add Consumer</CCardHeader>
          <CCardBody>
            <form
              id="neworganization"
              @submit.prevent="submitForm"
              class="needs-validation"
              novalidate
            >
              <div class="form-row">
                <div class="col-md-4 mb-4">
                  <label for="validationTooltip01"> Device Id *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.wmDetails.deviceEUI.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="device_id"
                        class="form-control"
                        type="text"
                        placeholder="Device Id"
                        v-model="form.wmDetails[0].deviceEUI"
                        @input="$v.form.wmDetails[0].deviceEUI.$touch()"
                        @blur="$v.form.wmDetails[0].deviceEUI.$touch()"
                        :error-messages="deviceEUIErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'laptop']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ deviceEUIErrors[0] }}</span>
                  </div>
 
                </div>
                <div class="col-md-4 mb-2">
                  <label for="validationTooltip01"> Consumer No *</label>
                  <div
                    class="control"
                    :class="{ 'form-group--error': $v.form.customerId.$error }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="consumerno"
                        class="form-control"
                        type="text"
                        placeholder="Consumer No"
                        v-model="form.customerId"
                        @input="$v.form.customerId.$touch()"
                        @blur="$v.form.customerId.$touch()"
                        :error-messages="consumer_noErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'id-badge']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ consumer_noErrors[0] }}</span>
                  </div>
                </div>
                <div class="col-md-4 mb-2">
                  <label for="validationTooltip01">Consumer Name *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.customerName.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="ConsumerName"
                        class="form-control"
                        type="text"
                        placeholder="Consumer Name"
                        v-model="form.customerName"
                        @input="$v.form.customerName.$touch()"
                        @blur="$v.form.customerName.$touch()"
                        :error-messages="consumer_nameErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'user']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ consumer_nameErrors[0] }}</span>
                  </div>
                </div>
              </div>


              <div class="form-row">
                <div class="col-md-4 mb-4">
                  <label for="validationTooltip01">Device Name *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.wmDetails.deviceName.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="device_name"
                        class="form-control"
                        type="text"
                        placeholder="Device Name"
                        v-model="form.wmDetails[0].deviceName"
                        @input="$v.form.wmDetails[0].deviceName.$touch()"
                        @blur="$v.form.wmDetails[0].deviceName.$touch()"
                        :error-messages="deviceNameErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'laptop']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ deviceNameErrors[0] }}</span>
                  </div>
 
                </div>

                <div class="col-md-4 mb-2">
                  <label for="validationTooltip01">Consumer Address *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.customerAddress.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="ConsumerAddress"
                        class="form-control"
                        type="text"
                        placeholder="Consumer Address"
                        v-model="form.customerAddress"
                        @input="$v.form.customerAddress.$touch()"
                        @blur="$v.form.customerAddress.$touch()"
                        :error-messages="consumer_addressErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'id-card']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ consumer_addressErrors[0] }}</span>
                  </div>
                </div>

                <div class="col-md-4 mb-2">
                  <label for="validationTooltip01">Contact No *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.customerPhoneNumber.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="ConsumerPhone"
                        class="form-control"
                        type="text"
                        placeholder="Contact No"
                        v-model="form.customerPhoneNumber"
                        @input="$v.form.customerPhoneNumber.$touch()"
                        @blur="$v.form.customerPhoneNumber.$touch()"
                        :error-messages="consumer_contactErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'phone']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ consumer_contactErrors[0] }}</span>
                  </div>
                </div>

                <div class="col-md-4 mb-2">
                  <label for="validationTooltip01">Device Location *</label>
                  <!-- <div class="control" :class="{'form-group--error': $v.form.customerPhoneNumber.$error}">
                  <div class="iconinput inputIconbg"> -->
 
                 <gmap-autocomplete class="form-control" 
          @place_changed="setPlace" >
       </gmap-autocomplete>

                
                  <!-- <fa-icon class="icon" :icon="['fas','phone']" style="width: 36px; height: 42px" />
                 </div> 
                </div>
                <div class="error">
                  <span>{{ consumer_contactErrors[0] }}</span>
                </div>-->
                </div>
              </div>

              <div>
                <button class="btn btn-primary btn-submit" type="submit">
                  Add
                </button>
                <!-- v-on:click.stop.prevent="submit" -->
              </div>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>

    <!-- ------------------------------------------------------------------------------------------------------------ -->

    <!-- <CRow>
    <CCol  col="12" sm="8">
        <CCard>
        <CCardHeader class="card-header">Add Device</CCardHeader>
        <CCardBody>
          <form id="neworganization" @submit.prevent="addDevice" class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-4 mb-4">
                  <label for="validationTooltip01"> Device Id *</label>
                <div class="control" :class="{'form-group--error': $v.form.wmDetails.deviceEUI.$error}">
                   <div class="iconinput inputIconbg">
                  <input
                    id="device_id1"
                    class="form-control"
                    type="text"
                    placeholder="Device Id"
                    v-model="form.wmDetails.deviceEUI"
                     @input="$v.form.wmDetails.deviceEUI.$touch()"
                    @blur="$v.form.wmDetails.deviceEUI.$touch()"
                    :error-messages="deviceEUIErrors"
             
                  />
                   <fa-icon class="icon" :icon="['fas','laptop']" style="width: 36px; height: 42px" /> 
                 </div>
                </div>
                <div class="error">
                  <span>{{ deviceEUIErrors[0] }}</span>
                </div>
              </div>
                   <div class="col-md-4 mb-4">
                <label for="validationTooltip01"> Device Name *</label>
                <div class="control" :class="{'form-group--error': $v.form.wmDetails.deviceName.$error}">
                   <div class="iconinput inputIconbg">
                  <input
                    id="device_name1"
                    class="form-control"
                    type="text"
                    placeholder="Device Id"
                    v-model="form.wmDetails.deviceName"
                    @input="$v.form.wmDetails.deviceName.$touch()"
                    @blur="$v.form.wmDetails.deviceName.$touch()"
                    :error-messages="deviceNameErrors"
                  />
                   <fa-icon class="icon" :icon="['fas','laptop']" style="width: 36px; height: 42px" /> 
                 </div>
                </div>
                <div class="error">
                  <span>{{ deviceNameErrors[0] }}</span>
                </div>
              </div>
                   <div class="col-md-4 mb-4">
                <label for="validationTooltip01"> Location *</label>
                
                   <gmap-autocomplete class="form-control"  
          @place_changed="setPlace1">
       </gmap-autocomplete>
                
              </div>
                   <div class="col-md-4 mb-4">
                <label for="validationTooltip01"> Customer No *</label>
                <div class="control" :class="{'form-group--error': $v.form.customerId.$error}">
                   <select
                class="form-control btn btn-secondary"
                id="ConsumerNumber1"
                v-model="form.customerId"
                 @input="$v.form.customerId.$touch()"
                    @blur="$v.form.customerId.$touch()"
                    :error-messages="consumer_noErrors"
              >
                <option disabled value>Select Vehicle</option>
                <option
                v-bind:key="id"
                  v-for="(consumer, id) in consumerList"
                  
                  v-bind:value="consumer.customerId"
                >{{consumer.customerId}}</option>
              </select>
                </div>
                <div class="error">
                  <span>{{ consumer_noErrors[0] }}</span>
                </div>
                   </div>
            </div>
            <div>
              <button class="btn btn-primary btn-submit" type="submit">Add</button>
            
            </div>
          </form>
        </CCardBody>
        </CCard>
    </CCol>
  </CRow> -->
  </div>
</template>

<script>
//import { orgService } from "../_services/organization.service";
// import VehicleService from "@/service/VehicleService";
// import { userService } from "@/_services/index.js";
import ConsumerService from "@/service/ConsumerService";
import { validationMixin } from "vuelidate";
import {
  required,
  //email,
  maxLength,
  minLength,
  //between
} from "vuelidate/lib/validators";
// import Vuelidate from "vuelidate";

export default {
  name: "Organizationform",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  data() {
    // errors: [];
    return {
      form: {
        customerId: "",
        customerPhoneNumber: "",
        customerName: "",
        customerAddress: "",
        wmDetails: [
          {
            deviceName: "",
            deviceEUI: "",
            lat: 0,
            lng: 0,
          },
        ],
      },
      consumerList: [],
      places: [],
      places1: [],
      currentPlace1: null,
      currentPlace: null,

      toasterMessage: "This is from variable",
      selected: "",
      options: [
        "Light Rigid Vehicle",
        "Medium Rigid Vehicle",
        "Heavy Rigid Vehicle",
      ],
    };
  },
  created() {
    //this.getAllConsumer();
  },
  methods: {
    // submitForm: function(e) {
    //   console.log('FOrm started');
    //   //this.validateOrgRefId();
    //   this.service.validateOrgRefId();
    //   console.log("This method is invoked - submit form");
    //   //console.log(e.vehicleRegNumber);

    // },
    getAllConsumer() {
      ConsumerService.getAll()
        .then((response) => {
          console.log("Coming response" + response.status);
          if (response.status === 200) {
            let serverData = response.data._embedded.customer;
            this.consumerList = serverData;

            console.log(serverData);
            // for(var k=0;k<this.items.length;k++){
            //   let serverdata2=response.data._embedded.customer[k].wmDetails;
            //   this.i=serverdata2;
            // console.log(serverdata2);

            // }
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
    setPlace(place) {
      this.currentPlace = place;

      if (this.currentPlace) {
        this.form.wmDetails[0].lng = this.currentPlace.geometry.location.lng();
        this.form.wmDetails[0].lat = this.currentPlace.geometry.location.lat();

        
      }
    },
    setPlace1(place) {
      this.currentPlace1 = place;

      if (this.currentPlace) {
        this.form.wmDetails[0].lng = this.currentPlace1.geometry.location.lng();
        this.form.wmDetails[0].lat = this.currentPlace1.geometry.location.lat();

      }
    },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.toasterMessage}`, {
        title: "Message",
        autoHideDelay: 5000,
        variant: variant,
        solid: true,
        appendToast: false,
      });
    },
    submitForm() {
      console.log("Form started");
      // this.$v.form.$touch();
      //  if (this.$v.$pendding || this.$v.$error) return;
      //   console.log("Form touched");

      // console.log(this.form);

      ConsumerService.create(this.form)
        .then((response) => {
          console.log("Coming response" + response.status);
          console.log(response);
          if (response.status === 226) {
            this.toasterMessage = response.data.message;
            this.makeToast("danger");
          }
          if (response.status === 201) {
            this.toasterMessage = response.data.message;
            this.makeToast("success");
            this.$v.$reset();
            this.resetData();
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.toasterMessage = "Bad request from applicaiton";
            this.makeToast("warning");
          } else if (error.response.status === 409) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("danger");
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
    resetData() {

         this.form.customerId= "",
    this.form.customerPhoneNumber= "",
    this.form.customerName= "",
    this.form.customerAddress= "",
    this.form.wmDetails[0].deviceName = "",
    this.form.wmDetails[0].deviceEUI = "",
    this.form.wmDetails[0].lat= 0,
    this.form.wmDetails[0].lng= 0
        
   },


    checkUniqueOrg(device_id) {
      if (device_id === "asiczen") {
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
    },
  },

  validations: {
    form: {
      wmDetails: {
        deviceEUI: {
          required,
          maxLength: maxLength(10),
          minLength: minLength(8),
        },
        deviceName: {
          required,
        },

      },

      customerId: {
        required,
        maxLength: maxLength(40),
        minLength: minLength(1),
      },
      customerName: {
        required,
      },
      customerAddress: {
        required,
      },

      customerPhoneNumber: {
        required,
      },
    },
  },
  computed: {
    deviceEUIErrors() {
      const errors = [];

      if (!this.$v.form.wmDetails.deviceEUI.$dirty) return errors;

      !this.$v.form.wmDetails.deviceEUI.required &&
        errors.push("Device Number required");

      return errors;
    },
    deviceNameErrors() {
      const errors = [];

      if (!this.$v.form.wmDetails.deviceName.$dirty) return errors;

      !this.$v.form.wmDetails.deviceName.required &&
        errors.push("Device Name required");

      return errors;
    },
    consumer_noErrors() {
      const errors = [];

      if (!this.$v.form.customerId.$dirty) return errors;

      !this.$v.form.customerId.required &&
        errors.push("Consumer Number required");

      return errors;
    },

    consumer_nameErrors() {
      const errors = [];
      if (!this.$v.form.customerName.$dirty) return errors;

      !this.$v.form.customerName.required &&
        errors.push("Consumer Name is required.");
      return errors;
    },
    consumer_addressErrors() {
      const errors = [];

      if (!this.$v.form.customerAddress.$dirty) return errors;

      !this.$v.form.customerAddress.required &&
        errors.push("Address is required.");

      return errors;
    },

    consumer_contactErrors() {
      const errors = [];

      if (!this.$v.form.customerPhoneNumber.$dirty) return errors;

      !this.$v.form.customerPhoneNumber.required &&
        errors.push("Contact Number is required.");

      if (!this.isContactNumberValid(this.form.customerPhoneNumber)) {
        errors.push("Please enter a valid contact number");
      }

      return errors;
    },
  },
};
</script>
<style>
.iconinput input[type="text"] {
  padding-left: 50px;
}
.iconinput {
  position: relative;
}
.icon {
  position: absolute;
  left: 0;
  top: 0;
  padding: 11px 10px;
}
.iconinput input[type="text"]:focus + .icon {
  color: blue;
}
.iconinput.inputIconbg .icon {
  background-color: #aaa;
  color: #fff;
  padding: 9px 4px;
  border-radius: 4px 0 0 4px;
}
.iconinput.inputIconbg input[type="text"]:focus + .icon {
  color: #fff;
  background-color: dodgerblue;
}
</style>
