<template>
  <!-- <div> -->
  <!-- ---**********-- -->
  <CRow>
    <CCol sm="8">
      <CCard>
        <CCardHeader class="card-header">Vehicle Parameters</CCardHeader>
        <CCardBody>
          <form
            id="updateMyorganization"
            v-on:submit.prevent.self="submitForm"
            class="needs-validation"
            novalidate
          >
            <div class="form-row">
              <CCol class="col-md-4 mb-3">
                <div>
                  <label for="validationTooltip01">Over Speed(Km/Hr) *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.overSpeedLimit.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="overspeedLimit"
                        class="form-control"
                        type="text"
                        placeholder="Over Speed"
                        v-model="form.overSpeedLimit"
                        @input="$v.form.overSpeedLimit.$touch()"
                        @blur="$v.form.overSpeedLimit.$touch()"
                        :error-messages="overspeedError"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'tachometer-alt']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ overspeedError[0] }}</span>
                  </div>
                </div>
              </CCol>
              
              <CCol class="col-md-4 mb-3">
                <div>
                  <label for="validationTooltip01"
                    >Over Utilized Hours(Hr) *</label
                  >
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.overUtilizedHours.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="overUtilizedHours"
                        class="form-control"
                        type="text"
                        placeholder="Over Utilized Hours"
                        v-model="form.overUtilizedHours"
                        @input="$v.form.overUtilizedHours.$touch()"
                        @blur="$v.form.overUtilizedHours.$touch()"
                        :error-messages="overUtilizedHoursError"
                      />
                      <!-- <fa-icon class="icon" :icon="['fas','thumbtack']" style="width: 36px; height: 42px" /> -->
                      <fa-icon
                        class="icon"
                        :icon="['fab', 'algolia']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ overUtilizedHoursError[0] }}</span>
                  </div>
                </div>
              </CCol>
              <CCol class="col-md-4 mb-3">
                <div>
                  <label for="validationTooltip01"
                    >Over Utilized Kms(Km/Hr) *</label
                  >
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.overUtilizedKms.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="overUtilizedKms"
                        class="form-control"
                        type="text"
                        placeholder="Over Utilized Kms"
                        v-model="form.overUtilizedKms"
                        @input="$v.form.overUtilizedKms.$touch()"
                        @blur="$v.form.overUtilizedKms.$touch()"
                        :error-messages="overUtilizedKmsError"
                      />
                      <!-- <fa-icon class="icon" :icon="['fas','thumbtack']" style="width: 36px; height: 42px" /> -->
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'route']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ overUtilizedKmsError[0] }}</span>
                  </div>
                </div>
              </CCol>
              
            </div>

            <div class="form-row">
              <CCol class="col-md-4 mb-3">
                <div>
                  <label for="validationTooltip01">Under Speed(Km/Hr) *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.underSpeedLimit.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="underSpeedLimit"
                        class="form-control"
                        type="text"
                        placeholder="Under Speed"
                        v-model="form.underSpeedLimit"
                        @input="$v.form.underSpeedLimit.$touch()"
                        @blur="$v.form.underSpeedLimit.$touch()"
                        :error-messages="underspeedError"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'tachometer-alt']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ underspeedError[0] }}</span>
                  </div>
                </div>
              </CCol>
              
              
              <CCol class="col-md-4 mb-3">
                <div>
                  <label for="validationTooltip01"
                    >Under Utilized Hours(Hr) *</label
                  >
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.underUtilizedHours.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="underUtilizedHours"
                        class="form-control"
                        type="text"
                        placeholder="Under Utilized Hours"
                        v-model="form.underUtilizedHours"
                        @input="$v.form.underUtilizedHours.$touch()"
                        @blur="$v.form.underUtilizedHours.$touch()"
                        :error-messages="underUtilizedHoursError"
                      />
                      <!-- <fa-icon class="icon" :icon="['fas','thumbtack']" style="width: 36px; height: 42px" /> -->
                      <fa-icon
                        class="icon"
                        :icon="['fab', 'algolia']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ underUtilizedHoursError[0] }}</span>
                  </div>
                </div>
              </CCol>
              <CCol class="col-md-4 mb-3">
                <div>
                  <label for="validationTooltip01"
                    >Under Utilized Kms(Km) *</label
                  >
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.underUtilizedKms.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="underUtilizedKms"
                        class="form-control"
                        type="text"
                        placeholder="Under Utilized Kms"
                        v-model="form.underUtilizedKms"
                        @input="$v.form.underUtilizedKms.$touch()"
                        @blur="$v.form.underUtilizedKms.$touch()"
                        :error-messages="underUtilizedKmsError"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'route']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ underUtilizedKmsError[0] }}</span>
                  </div>
                </div>
              </CCol>
            </div>
            <div class="form-row">
              <CCol class="col-md-4 mb-3">
                <div>
                  <label for="validationTooltip01">Fuel Alert(%) *</label>
                  <div
                    class="control"
                    :class="{ 'form-group--error': $v.form.fuelLimit.$error }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="fuelLimit"
                        class="form-control"
                        type="text"
                        placeholder="Fuel Alert"
                        v-model="form.fuelLimit"
                        @input="$v.form.fuelLimit.$touch()"
                        @blur="$v.form.fuelLimit.$touch()"
                        :error-messages="fuelalertError"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'gas-pump']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ fuelalertError[0] }}</span>
                  </div>
                </div>
              </CCol>
              
              <CCol class="col-md-4 mb-3">
                <label for="validationTooltip01">Organization Name *</label>
                <select
                  class="form-control btn btn-secondary"
                  id="orgId"
                  v-model="form.orgId"
                >
                  <option disabled value="">Select Organization</option>
                  <option
                    v-for="orgRefName in orgRefNameList"
                    v-bind:key="orgRefName.orgId"
                    v-bind:value="orgRefName.orgId"
                  >
                    {{ orgRefName.orgRefName }}
                  </option>
                </select>
              </CCol>
            </div>

            <div>
              <button class="btn btn-primary btn-submit" type="submit">
                Add Parameter
              </button>
              <!-- v-on:click.stop.prevent="submit" -->
            </div>
          </form>

          <!-- <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Organization Name *</label>
                <select
                  class="form-control btn btn-secondary"
                  id="orgRefName"
                  v-model="form.orgRefName"
                >
                  <option disabled value="">Select Organization</option>
                  <option
                    v-for="orgRefName in orgRefNameList"
                    v-bind:key="orgRefName.orgId"
                    v-bind:value="orgRefName.orgRefName"
                  >
                    {{ orgRefName.orgRefName }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <button class="btn btn-primary btn-submit" type="submit1">
                Submit form
              </button>
              
            </div>
          </form> -->
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <!-- ---**********-- -->
  <!-- </div> -->

  <!-- </div> -->
</template>
<script>
//import { orgService } from "../_services/organization.service";

import OrganizationFormService from "@/service/OrganizationFormService";
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
//import OrganizationFileUpload from "./OrganizationFileUpload";
//import Toaster from "./toasters/Toaster";
export default {
  name: "Organizationform",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  // components: {
  //   OrganizationFileUpload
  // },
  data() {
    errors: [];
    return {
      form: {
        orgId: "",
        overSpeedLimit: "",
        underSpeedLimit: "",
        fuelLimit: "",
        underUtilizedKms: "",
        overUtilizedKms: "",
        underUtilizedHours: "",
        overUtilizedHours: "",
      },
      toasterMessage: "This is from variable",
      url: process.env.VUE_APP_API_URL,
      orgUniqueFlag: undefined,
      orgRefNameList: [],
    };
  },
  created() {
    this.getAllOrgRefName();
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
        appendToast: false,
      });
    },
    getAllOrgRefName() {
      OrganizationFormService.getAllOrgReferenceNameList()
        .then((response) => {
          console.log("Coming response" + response.status);
          if (response.status === 200) {
            let serverData = response.data;
            this.orgRefNameList = serverData.data;
            //this.toasterMessage = response.message;
            //this.makeToast("success");
            console.log(this.items);
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
    submitForm() {
      console.log("Form started print");
      console.log(this.form.orgId);
      console.log(this.form.fuelLimit);
      console.log(this.form.overSpeedLimit);
      console.log(this.form.underSpeedLimit);
      console.log(this.form.overUtilizedKms);
      console.log(this.form.underUtilizedKms);
      console.log(this.form.underUtilizedHours);
      console.log(this.form.overUtilizedHours);
      // this.$v.form.$touch();
      // if (this.$v.$pendding || this.$v.$error) return;

      this.$v.form.$touch();
      if (this.$v.$pendding || this.$v.$error) return;
      console.log("Form touched");
      OrganizationFormService.setOrganizationParameter(this.form)
        /*this.axios.post(this.url+"api/fleet/org",this.form,{
            headers: {
                "Content-type": "application/json",
                'Authorization': 'Bearer ' + store.getters['auth/getAccessToken']
              }
           })*/
        .then((response) => {
          console.log("Coming response" + response.status);

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
      // console.log('my analytics components --> Reaading data from store ------>'+ this.$store.state.token);
      // console.log("Form submitted");
    },
    resetData() {
      this.form.orgId = "";
      this.form.fuelLimit = "";
      this.form.underUtilizedKms = "";
      this.form.overUtilizedKms = "";
      this.form.underUtilizedHours = "";
      this.form.overUtilizedHours = "";
      this.form.underSpeedLimit = "";
      this.form.overSpeedLimit = "";
    },
    checkUniqueOrg: function (orgRefName) {
      OrganizationFormService.validate(orgRefName)
        .then((response) => {
          //console.log("Coming response to check unique:" + response.status);
          if (response.status === 200) {
            this.orgUniqueFlag = true;
            return true;
          }
        })
        .catch((error) => {
          //console.log("Coming to error check unique:" + error.response.status);
          if (error.response.status === 409) {
            this.orgUniqueFlag = false;
            return false;
          }
        });
      // if (orgRefName.toLowerCase() === "asiczen") {
      //   return false;
      // } else {
      //   return true;
      // }
    },
    haveSpecialChar(inputData) {
      const regex = /^[0-9 ]+$/;
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
    isoverspeed(inputData) {
      if (inputData <= 100) {
        return true;
      } else {
        return false;
      }
    },
    isunderspeed(inputData) {
      if (inputData >= 20) {
        return true;
      } else {
        return false;
      }
    },
    isunderutilized(inputData) {
      if (inputData >= 1) {
        return true;
      } else {
        return false;
      }
    },
    isfuelLimit(inputData) {
      if (inputData >= 1) {
        return true;
      } else {
        return false;
      }
    },
    isoverUtilizedHours(inputData) {
      if (inputData <= 24) {
        return true;
      } else {
        return false;
      }
    },
    isunderUtilizedHours(inputData) {
      if (inputData >= 1) {
        return true;
      } else {
        return false;
      }
    },
    isoverUtilizedKms(inputData) {
      if (inputData >= 80) {
        return true;
      } else {
        return false;
      }
    },
  },
  validations: {
    form: {
      orgRefName: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(3),
      },
      overSpeedLimit: {
        required,
      },
      underSpeedLimit: {
        required,
      },
      underUtilizedKms: {
        required,
      },
      fuelLimit: {
        required,
      },
      overUtilizedHours: {
        required,
      },
      underUtilizedHours: {
        required,
      },
      overUtilizedKms: {
        required,
      },
    },
  },

  computed: {
    orgRefNameErrors() {
      const errors = [];
      if (!this.$v.form.orgRefName.$dirty) return errors;
      !this.$v.form.orgRefName.required &&
        errors.push("Organization Ref Name is required.");
      if (!this.haveSpecialChar(this.form.orgRefName)) {
        errors.push("Special Characters such as @,#,$ not allowed.");
      }
      !this.$v.form.orgRefName.minLength &&
        errors.push(
          "Organization Ref Name must be at atleast 3 characters long"
        );
      !this.$v.form.orgRefName.maxLength &&
        errors.push("Organization Ref Name must be at most 10 characters long");

      // console.log("this is invoked");
      // console.log("Error" + errors.length);
      // console.log("Testing testing " + this.form.orgRefName);
      if (errors.length === 0) {
        this.checkUniqueOrg(this.form.orgRefName);
        //if (!this.checkUniqueOrg(this.form.orgRefName)) {
        if (!this.orgUniqueFlag) {
          errors.push("Organization Ref Name is already taken!");
        }
      }
      return errors;
    },

    overspeedError() {
      const errors = [];
      if (!this.$v.form.overSpeedLimit.$dirty) return errors;
      !this.$v.form.overSpeedLimit.required &&
        errors.push("Overspeed is a required field!");
      if (!this.haveSpecialChar(this.form.overSpeedLimit)) {
        errors.push("Please enter a valid number.");
      }
      // if (!this.isoverspeed(this.form.overSpeedLimit)) {
      //   errors.push("Please enter a valid Overspeed");
      // }
      return errors;
    },
    underspeedError() {
      const errors = [];
      if (!this.$v.form.underSpeedLimit.$dirty) return errors;
      !this.$v.form.underSpeedLimit.required &&
        errors.push("Underspeed is a required field!");
    if (!this.haveSpecialChar(this.form.underSpeedLimit)) {
        errors.push("Please enter a valid number.");
      }
      // if (!this.isunderspeed(this.form.underSpeedLimit)) {
      //   errors.push("Underspeed should be less than 20");
      // }
      return errors;
    },
    underUtilizedKmsError() {
      const errors = [];
      if (!this.$v.form.underUtilizedKms.$dirty) return errors;
      !this.$v.form.underUtilizedKms.required &&
        errors.push("Under Utilized Kms is a required field!");
      if (!this.haveSpecialChar(this.form.underUtilizedKms)) {
        errors.push("Please enter a valid number.");
      }
      // if (!this.isunderUtilizedKms(this.form.underUtilizedKms)) {
      //   errors.push("Under Utilized Kms should be greater than 1km");
      // }
      return errors;
    },
    fuelalertError() {
      const errors = [];
      if (!this.$v.form.fuelLimit.$dirty) return errors;
      !this.$v.form.fuelLimit.required &&
        errors.push("Fuelalert is a required field!");
      if (!this.haveSpecialChar(this.form.fuelLimit)) {
        errors.push("Please enter a valid number.");
      }
      // if (!this.isfuelLimit(this.form.fuelLimit)) {
      //   errors.push("Fuel should be greater than 1%");
      // }
      return errors;
    },
    overUtilizedHoursError() {
      const errors = [];
      if (!this.$v.form.overUtilizedHours.$dirty) return errors;
      !this.$v.form.overUtilizedHours.required &&
        errors.push("Over Utilized Hours is a required field!");

      if (!this.haveSpecialChar(this.form.overUtilizedHours)) {
        errors.push("Please enter a valid number.");
      }
      // if (!this.isoverUtilizedHours(this.form.overUtilizedHours)) {
      //     errors.push("Please enter a valid Under Utilized Hours");
      //   }
      return errors;
    },
    underUtilizedHoursError() {
      const errors = [];
      if (!this.$v.form.underUtilizedHours.$dirty) return errors;
      !this.$v.form.underUtilizedHours.required &&
        errors.push("Under Utilized Hours is a required field!");
      if (!this.haveSpecialChar(this.form.underUtilizedHours)) {
        errors.push("Please enter a valid number.");
      }
      //   if (!this.isunderUtilizedHours(this.form.underUtilizedHours)) {
      //   errors.push("Please enter a valid Under Utilized Hours");
      // }
      return errors;
    },
    overUtilizedKmsError() {
      const errors = [];
      if (!this.$v.form.overUtilizedKms.$dirty) return errors;
      !this.$v.form.overUtilizedKms.required &&
        errors.push("Over Utilized Kms is a required field!");
      if (!this.haveSpecialChar(this.form.overUtilizedKms)) {
        errors.push("Please enter a valid number.");
      }
      //   if (!this.isoverUtilizedKms(this.form.overUtilizedKms)) {
      //   errors.push("Please enter a valid Over Utilized Kms");
      // }
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