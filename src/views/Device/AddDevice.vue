<!-- <CCol col="12" sm="8"> -->
<template>
  <CRow>
    <CCol col="12" sm="8">
      <CCard>
        <CCardHeader class="card-header">New Device</CCardHeader>
        <CCardBody>
          <form
            id="neworganization"
            @submit.prevent="submitForm"
            class="needs-validation"
            novalidate
          >
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="validationTooltip01">Device IMEI *</label>
                <div
                  class="control"
                  :class="{ 'form-group--error': $v.form.imeiNumber.$error }"
                >
                  <div class="iconinput inputIconbg">
                    <input
                      id="imeiNumber"
                      class="form-control"
                      type="text"
                      placeholder="890321064547287"
                      v-model="form.imeiNumber"
                      @input="$v.form.imeiNumber.$touch()"
                      @blur="$v.form.imeiNumber.$touch()"
                      :error-messages="imeiNumberErrors"
                    />
                    <fa-icon
                      class="icon"
                      :icon="['fas', 'tools']"
                      style="width: 36px; height: 42px"
                    />
                  </div>
                </div>
                <div class="error">
                  <span>{{ imeiNumberErrors[0] }}</span>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label for="validationTooltip01">Device Model *</label>

                <div
                  class="control"
                  :class="{ 'form-group--error': $v.form.modelType.$error }"
                >
                  <div class="iconinput inputIconbg">
                    <select
                      class="form-control btn btn-secondary"
                      id="modelType"
                      v-model="form.modelType"
                    >
                      <option disabled value="">Select Model Type</option>
                      <option>3G Model</option>
                      <option>4G Model</option>
                      <option>NBIOT Model</option>
                    </select>
                    <fa-icon
                      class="icon"
                      :icon="['fas', 'tools']"
                      style="width: 36px; height: 42px"
                    />
                  </div>
                </div>
                <div class="error">
                  <span>{{ deviceTypeErrors[0] }}</span>
                </div>
              </div>

                 <div class="col-md-4 mb-3">
                <label for="validationTooltip01">Location *</label>
               
                 
<gmap-autocomplete class="form-control" style=" position:relative; bottom:-5px;" 
          @place_changed="setPlace" >
       </gmap-autocomplete>
                 
                <!-- </div>
                <div class="error">
                  <span>{{ imeiNumberErrors[0] }}</span>
                </div> -->
              </div>
            </div>

            <div>
              <button class="btn btn-primary btn-submit" type="submit">
                Add Device
              </button>
              <!-- v-on:click.stop.prevent="submit" -->
            </div>
          </form>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol col="0" sm="4">
      <CCard>
        <CCardHeader>Add Device</CCardHeader>
        <CCardBody>
          <CButton size="lg" variant="outline" color="primary" block v-on:click="downLoadFile()"
            >Download existing device list</CButton
          >
          <br />
          <div class="large-12 medium-12 small-12 cell">
            <label
              >File
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="handleFileUpload()"
              />
            </label>
          </div>
          <br />
          <CButton size="lg" variant="outline" color="success" v-on:click="submitFile()" block
            >Upload</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>

  <!-- </div> -->
</template>

<script>
//import VueSocketIO from 'vue-socket.io'
//import SocketIO from "socket.io-client"

//import { orgService } from "../_services/organization.service";
import DeviceService from "@/service/DeviceService";
import { userService } from "@/_services/index.js";

import { validationMixin } from "vuelidate";
import {
  required,
  email,
  maxLength,
  minLength,
  between,
} from "vuelidate/lib/validators";
import Vuelidate from "vuelidate";
import store from "@/store";

export default {
  name: "Organizationform",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  connection: null,
  // socket: null,
  // stompClient: null,
  // connected: false,
  data() {
    errors: [];
    return {
      form: {
        imeiNumber: "",
        modelType: "",
        isDisabled: true,
      },
      places: [],
    
      currentPlace: null,
      url: process.env.VUE_APP_API_URL,
      toasterMessage: "This is from variable",
    };
  },

  methods: {
        setPlace(place) {
      this.currentPlace = place;
      
    },
    // submitForm: function(e) {
    //   console.log('FOrm started');
    //   //this.validateOrgRefId();
    //   this.service.validateOrgRefId();
    //   console.log("This method is invoked - submit form");
    //   //console.log(e.imeiNumber);

    // },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.toasterMessage}`, {
        title: "Message",
        autoHideDelay: 5000,
        variant: variant,
        solid: true,
        appendToast: false,
      });
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    submitFile() {
      /*
                Initialize the form data
            */
      let formData = new FormData();

      /*
                Add the form data we need to submit
            */
      formData.append("file", this.file);

      /*
          Make the request to the POST /single-file URL
        */
      const token = store.getters["auth/getAccessToken"];
      this.axios
        .post(this.url + "api/fleet/device/upload", formData, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("SUCCESS!!");
          console.log("Coming response" + response.status);

          if (response.status === 226) {
            this.toasterMessage = response.data.message;
            this.makeToast("danger");
          }
          if (response.status === 200) {
            this.toasterMessage = response.data.message;
            this.makeToast("success");
            this.file = ''
          }
        })
        .catch((error) => {
          console.log("FAILURE!!");
          if (error.response.status === 400) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("warning");
          } else if (error.response.status === 409) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("danger");
          } else if(error.response.status === 500) {
            this.toasterMessage = "There is some internal server error";
            this.makeToast("danger");
          }else {
            this.toasterMessage = "There is some error please rectify";
            this.makeToast("danger");
          }
          console.log("Control came to block");
          console.log(error.response.data.status);
        });
        // .then(function () {
        //   console.log("SUCCESS!!");
        // })
        // .catch(function () {
        //   console.log("FAILURE!!");
        // });
    },
    downLoadFile() {

      const token = store.getters["auth/getAccessToken"];
      this.axios
        .get(this.url + "api/fleet/device/download", {
          headers: {
            Authorization: "Bearer " + token,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Coming response" + response.status);

          if (response.status === 226) {
            this.toasterMessage = response.data.message;
            this.makeToast("danger");
          }
          if (response.status === 200) {

            const blob = new Blob([response.data], {
              type: `application/csv`
            });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "devices.csv";
            link.click();

            this.toasterMessage = "File downloded successfully.";
            this.makeToast("success");
            
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("warning");
          } else if (error.response.status === 409) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("danger");
          } else if(error.response.status === 500) {
            this.toasterMessage = "There is some internal server error";
            this.makeToast("danger");
          }else {
            this.toasterMessage = "There is some error please rectify";
            this.makeToast("danger");
          }
          console.log("Control came to block");
          console.log(error.response.data.status);
        });
        // .then(function () {
        //   console.log("SUCCESS!!");
        // })
        // .catch(function () {
        //   console.log("FAILURE!!");
        // });

    },


    submitForm() {
      /*console.log('FOrm started');
      // this.validateOrgRefId();
      this.userService.test();*/

      console.log("FOrm started");
      // this.toasterMessage = 'Form submitted successfully';
      // this.makeToast('primary');
      //if (!this.$v.form.$touch()) {
      this.$v.form.$touch();
      if (this.$v.$pendding || this.$v.$error) return;
      console.log("Form touched");
      DeviceService.create(this.form)
        .then((response) => {
          console.log("Coming response" + response.status);

          if (response.status === 226) {
            this.toasterMessage = response.data.message;
            this.makeToast("danger");
          }
          if (response.status === 200) {
            //this.$router.push({path: `/base/device/addDevice`})
            // this.form.imeiNumber= ""
            // this.form.modelType= ""
            this.toasterMessage = response.data.message;
            this.makeToast("success");
            this.$v.$reset();
            this.resetData();
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("warning");
          } else if (error.response.status === 409) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("danger");
          } else if(error.response.status === 500) {
            this.toasterMessage = "There is some internal server error";
            this.makeToast("danger");
          }else {
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
      this.form.imeiNumber = "";
      this.form.modelType = "";
    },

    checkUniqueOrg(imeiNumber) {
      if (imeiNumber === "asiczen") {
        return false;
      } else {
        return true;
      }
    },

    haveSpecialChar(inputData) {
      const regex = /^[0-9]+$/;
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
      imeiNumber: {
        required,
        maxLength: maxLength(15),
        minLength: minLength(15),
      },

      modelType: {
        required,
      },
    },
  },
  computed: {
    imeiNumberErrors() {
      const errors = [];
      if (!this.$v.form.imeiNumber.$dirty) return errors;

      !this.$v.form.imeiNumber.required &&
        errors.push("Device IMEI Number is required.");
      if (!this.haveSpecialChar(this.form.imeiNumber)) {
        errors.push("Characters are not allowed.");
      }
      !this.$v.form.imeiNumber.minLength &&
        errors.push("Device IMEI Number must be at atleast 15 characters long");
      !this.$v.form.imeiNumber.maxLength &&
        errors.push("Device IMEI Number must be at most 15 characters long");

      //console.log("this is invoked");
      //console.log("Error" + errors.length);

      //console.log("Testing testing " + this.form.imeiNumber);

      if (errors.length === 0) {
        if (!this.checkUniqueOrg(this.form.imeiNumber)) {
          errors.push("id is already taken!");
        }
      }

      return errors;
    },

    deviceTypeErrors() {
      const errors = [];

      if (!this.$v.form.modelType.$dirty) return errors;

      !this.$v.form.modelType.required &&
        errors.push("Must select a model type.");

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
select {
  text-align: center;
  text-align-last: center;
}
</style>