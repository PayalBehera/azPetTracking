<template>
    <CRow>
    <CCol  col="12" sm="8">
        <CCard>
        <CCardHeader class="card-header">Add Device</CCardHeader>
        <CCardBody>
          <form id="neworganization" @submit.prevent="addDevice" class="needs-validation" novalidate>
            <div class="form-row">
              <div class="col-md-4 mb-4">
                <label for="validationTooltip01"> Device Id *</label>
                <!-- <div class="control" :class="{'form-group--error': $v.form.wmDetails.deviceEUI.$error}"> -->
                   <div class="iconinput inputIconbg">
                  <input
                    id="device_id"
                    class="form-control"
                    type="text"
                    placeholder="Device Id"
                    v-model="form.wmDetails.deviceEUI"
             
                  />
                   <fa-icon class="icon" :icon="['fas','laptop']" style="width: 36px; height: 42px" /> 
                 </div>
                <!-- </div>
                <div class="error">
                  <span>{{ device_idErrors[0] }}</span>
                </div> -->
              </div>
                   <div class="col-md-4 mb-4">
                <label for="validationTooltip01"> Device Name *</label>
                <!-- <div class="control" :class="{'form-group--error': $v.form.wmDetails.deviceEUI.$error}"> -->
                   <div class="iconinput inputIconbg">
                  <input
                    id="device_id"
                    class="form-control"
                    type="text"
                    placeholder="Device Id"
                    v-model="form.wmDetails.deviceEUI"
             
                  />
                   <fa-icon class="icon" :icon="['fas','laptop']" style="width: 36px; height: 42px" /> 
                 </div>
                <!-- </div>
                <div class="error">
                  <span>{{ device_idErrors[0] }}</span>
                </div> -->
              </div>
                   <div class="col-md-4 mb-4">
                <label for="validationTooltip01"> Location *</label>
                <!-- <div class="control" :class="{'form-group--error': $v.form.wmDetails.deviceEUI.$error}"> -->
                   <gmap-autocomplete class="form-control" style=" position:relative; bottom:-5px;" 
          @place_changed="setPlace1">
       </gmap-autocomplete>
                <!-- </div>
                <div class="error">
                  <span>{{ device_idErrors[0] }}</span>
                </div> -->
              </div>
                   <div class="col-md-4 mb-4">
                <label for="validationTooltip01"> Customer No *</label>
                <div class="control" :class="{'form-group--error': $v.form.customerId.$error}">
                   <select
                class="form-control btn btn-secondary"
                id="ConsumerNumber"
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
              <!-- v-on:click.stop.prevent="submit" -->
            </div>
          </form>
        </CCardBody>
        </CCard>
    </CCol>
  </CRow>
</template>
<script>
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
    wmDetails:[
        {
            deviceName : "xyz",
            deviceEUI : "",
            lat: 0,
            lng: 0
        }
    ]
      },
      consumerList:[],
       places: [],
     places1:[],
     currentPlace1:null,
      currentPlace: null,
      
      toasterMessage: "This is from variable",
      selected: '',
     
    };
  },
 created() {
    this.getAllConsumer();
    },
    methods: {
    
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

     setPlace1(place) {
      this.currentPlace1 = place;
      
       if (this.currentPlace) {
         this.form.wmDetails.lng= this.currentPlace1.geometry.location.lng()
         this.form.wmDetails.lat= this.currentPlace1.geometry.location.lat()
         
        console.log("puja2")
        console.log(this.form.wmDetails.lng);
        console.log(this.form.wmDetails.lat);
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
    resetData() {
         this.form.customerId= "",
    this.form.customerPhoneNumber= "",
    this.form.customerName= "",
    this.form.customerAddress= "",
    
            this.form.wmDetails.deviceName = "xyz",
            this.form.wmDetails.deviceEUI = "",
            this.form.wmDetails.lat= 0,
            this.form.wmDetails.lng= 0
        
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
    }
  },

  validations: {
    form: {
      wmDetails:{
        deviceEUI= {
        required,
        maxLength: maxLength(10),
        minLength: minLength(8),
        }}
      ,
     
      customerId: {
        required,
        maxLength: maxLength(40),
        minLength: minLength(1)
      },
      customerName: {
        required,
       
      },
       consumer_address: {
        required
     },
      consumer_email: {
        required
     },
      customerPhoneNumber: {
        required
     },
    }
  },
  computed: {
    deviceEUIErrors(){
      const errors = [];

      if (!this.$v.form.wmDetails.deviceEUI.$dirty) return errors;

      !this.$v.form.wmDetails.deviceEUI.required &&
        errors.push("Device Number required");


      return errors;
    },
    deviceNameErrors(){
      const errors = [];

      if (!this.$v.form.wmDetails.deviceEUI.$dirty) return errors;

      !this.$v.form.wmDetails.deviceEUI.required &&
        errors.push("Device Number required");


      return errors;
    },
    consumer_noErrors() {
      const errors = [];

      if (!this.$v.form.customerId.$dirty) return errors;

      !this.$v.form.customerId.required &&
        errors.push("Consumer Number required");


      return errors;
    },

   
     

    
    
  }
}
</script>