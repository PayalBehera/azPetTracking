<template>
  <CRow>
    <CCol sm="8">
      <CCard>
        <CCardHeader class="card-header">Update Vehicle Parameters</CCardHeader>
        <CCardBody>
          <form
            id="updateMyorganization"
            @submit.prevent="submitForm"
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
                        placeholder="over speed"
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
                  <label for="validationTooltip01">Over Utilized Hours(Hr) *</label>
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
                        placeholder="overUtilizedHours"
                        v-model="form.overUtilizedHours"
                        @input="$v.form.overUtilizedHours.$touch()"
                        @blur="$v.form.overUtilizedHours.$touch()"
                        :error-messages="overUtilizedHoursError"
                      />

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
                  <label for="validationTooltip01">Over Utilized Kms(Km) *</label>
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
                        placeholder="overUtilizedKms"
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
                  <label for="validationTooltip01">Under Speed(Km) *</label>
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
                        placeholder="under speed"
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
                  <label for="validationTooltip01">Under Utilized Hours(Hr) *</label>
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
                        placeholder="underUtilizedHours"
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
                  <label for="validationTooltip01">Under Utilized Kms(Km) *</label>
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
                        placeholder="underUtilizedKms"
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
              
            </div>

            <div>
              <button class="btn btn-primary btn-submit" type="submit">
                Update
              </button>
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
import OrganizationFormService from "@/service/OrganizationFormService";
import TutorialDataService from "../../service/TutorialDataService";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  maxLength,
  minLength,
  between,
} from "vuelidate/lib/validators";
import Vuelidate from "vuelidate";

export default {
  name: "EditUserData",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  data() {
    errors: [];
    return {
      form: {
        overSpeedLimit: "",
        underSpeedLimit: "",
        underUtilizedKms: "",
        fuelLimit: "",
        overUtilizedHours: "",
        underUtilizedHours: "",
        overUtilizedKms: "",
      },
      toasterMessage: "This is from variable",
    };
  },
  created() {
    let MyorganizationDetails = JSON.parse(localStorage.getItem("orgDetails"));
    console.log("Driver no:" + MyorganizationDetails);
    this.form.orgid = MyorganizationDetails.paramId;
    this.form.overSpeedLimit = MyorganizationDetails.overSpeedLimit;
    this.form.underSpeedLimit = MyorganizationDetails.underSpeedLimit;
    this.form.underUtilizedKms = MyorganizationDetails.underUtilizedKms;
    this.form.fuelLimit = MyorganizationDetails.fuelLimit;
    this.form.overUtilizedHours = MyorganizationDetails.overUtilizedHours;
    this.form.underUtilizedHours = MyorganizationDetails.underUtilizedHours;
    this.form.overUtilizedKms = MyorganizationDetails.overUtilizedKms;
  },
  /*mounted() {
    console.log("Parameter from other component --> " + this.$route.params.id);
    this.getOrganizatioById(this.$route.params.id);
  },*/

  methods: {
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
      console.log("FOrm started");

      if (!this.$v.form.$touch()) {
        console.log("Form touched");
        console.log(this.form.overSpeedLimit);
        console.log(this.form.underSpeedLimit);

        OrganizationFormService.updateMyOrgDetails(this.form)
          .then((response) => {
            console.log("Coming response" + response.status);

            if (response.status === 226) {
              this.toasterMessage = response.message;
              this.makeToast("danger");
            }
            if (response.status === 200) {
              // this.form.driverName=""
              // this.form.drivingLicence=""
              // this.form.contactNumber=""
              // this.form.whatsappnumber=""
              // this.toasterMessage = response.data.message;
              // this.makeToast("success");
              localStorage.removeItem("orgDetails");
              this.$router.push({ path: `/base/myOrganization` });
              this.$root.$emit("orgToast", response.message);
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              this.toasterMessage = "Bad request from applicaiton";
              this.makeToast("warning");
            } else if (error.response.status === 409) {
              this.toasterMessage = error.response.message;
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
      } else {
        this.toasterMessage = "Please fill the details to submit the form";
        this.makeToast("danger");
        return;
      }
    },

    // getOrganizatioById(param) {
    //   TutorialDataService.get(param)
    //     .then(response => {
    //       let serverData = response.data;
    //       this.form = serverData.data;
    //       console.log(this.form);
    //     })
    //     .catch(function error() {
    //       console.log(error);
    //     });
    // },

    handleBlur(orgRefName) {
      if (orgRefName === "asiczen") {
        return false;
      } else {
        return true;
      }
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
    isunderUtilizedKms(inputData) {
      if (inputData >= 1) {
        return true;
      } else {
        return false;
      }
    },
    isfuelLimit(inputData) {
      if (inputData >= 5) {
        return true;
      } else {
        return false;
      }
    },
  },

  validations: {
    form: {
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
    // AddressErrors() {
    //   const errors = [];
    //   if (!this.$v.form.Address.$dirty) return errors;

    //   !this.$v.form.Address.required &&
    //     errors.push("Adderss is required.");

    //   return errors;
    // },
    // DescriptionErrors() {
    //   const errors = [];
    //   if (!this.$v.form.Description.$dirty) return errors;

    //   !this.$v.form.Description.required && errors.push("Description is required.");

    //   return errors;
    // },

    overspeedError() {
      const errors = [];
      if (!this.$v.form.overSpeedLimit.$dirty) return errors;
      !this.$v.form.overSpeedLimit.required &&
        errors.push("Over speed is a required field!");
      if (!this.haveSpecialChar(this.form.overSpeedLimit)) {
        errors.push("Please enter a valid number.");
      }
      //   if (!this.isoverspeed(this.form.overSpeedLimit)) {
      //   errors.push("Please enter a valid overspeed");
      // }
      return errors;
    },
    underspeedError() {
      const errors = [];
      if (!this.$v.form.underSpeedLimit.$dirty) return errors;
      !this.$v.form.underSpeedLimit.required &&
        errors.push("Under speed is a required field!");
      if (!this.haveSpecialChar(this.form.underSpeedLimit)) {
        errors.push("Please enter a valid number.");
      }
      //   if (!this.isunderspeed(this.form.underSpeedLimit)) {
      //   errors.push("Please enter a valid underspeed");
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
      //   if (!this.isunderUtilizedKms(this.form.underUtilizedKms)) {
      //   errors.push("Please enter a valid kilometer");
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
      //    if (!this.isfuelLimit(this.form.fuelLimit)) {
      //   errors.push("Please enter a valid fuel in percentage");
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
