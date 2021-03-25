<template>
  <div>
    <CRow>
      <CCol sm="8">
        <CCard>
          <CCardHeader class="card-header">New Organization</CCardHeader>
          <CCardBody>
            <form
              id="neworganization"
              v-on:submit.prevent.self="onSubmit"
              class="needs-validation"
              novalidate
            >
              <div class="form-row">
                <div class="col-md-5 mb-3">
                  <label for="validationTooltip01"
                    >Organization Ref Name *</label
                  >
                  <div
                    class="control"
                    :class="{ 'form-group--error': $v.form.orgRefName.$error }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="orgRefName"
                        @keypress.32.prevent
                        class="form-control"
                        type="text"
                        placeholder="Organization Ref Name"
                        v-model="form.orgRefName"
                        @input="$v.form.orgRefName.$touch()"
                        @blur="$v.form.orgRefName.$touch()"
                        :error-messages="orgRefNameErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['far', 'building']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ orgRefNameErrors[0] }}</span>
                  </div>
                </div>
                <div class="col-md-7 mb-3">
                  <label for="validationTooltip01">Organization Name *</label>
                  <div
                    class="control"
                    :class="{ 'form-group--error': $v.form.orgName.$error }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="orgName"
                        class="form-control"
                        type="text"
                        placeholder="Organization Name"
                        v-model="form.orgName"
                        @input="$v.form.orgName.$touch()"
                        @blur="$v.form.orgName.$touch()"
                        :error-messages="orgNameErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'sitemap']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ orgNameErrors[0] }}</span>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-12 mb-3">
                  <label for="validationTooltip01">Description</label>
                  <div
                    class="control"
                    :class="{ 'form-group--error': $v.form.description.$error }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="description"
                        class="form-control"
                        type="text"
                        placeholder="Description"
                        v-model="form.description"
                        @input="$v.form.description.$touch()"
                        @blur="$v.form.description.$touch()"
                        :error-messages="descriptionErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'clipboard-list']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ descriptionErrors[0] }}</span>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="validationTooltip01">First Name *</label>
                  <div
                    class="control"
                    :class="{ 'form-group--error': $v.form.firstName.$error }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="firstName"
                        class="form-control"
                        type="text"
                        placeholder="First Name"
                        v-model="form.firstName"
                        @input="$v.form.firstName.$touch()"
                        @blur="$v.form.firstName.$touch()"
                        :error-messages="firstNameErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'user']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ firstNameErrors[0] }}</span>
                  </div>
                </div>

                <div class="col-md-6 mb-3">
                  <label for="validationTooltip01">Last Name *</label>
                  <div
                    class="control"
                    :class="{ 'form-group--error': $v.form.lastName.$error }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="lastName"
                        class="form-control"
                        type="text"
                        placeholder="Last Name"
                        v-model="form.lastName"
                        @input="$v.form.lastName.$touch()"
                        @blur="$v.form.lastName.$touch()"
                        :error-messages="lastNameErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'user']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ lastNameErrors[0] }}</span>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="col-md-6 mb-3">
                  <label for="validationTooltip01">Contact Number *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.contactNumber.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="contactNumber"
                        class="form-control"
                        type="text"
                        placeholder="Contact Number"
                        v-model="form.contactNumber"
                        @input="$v.form.contactNumber.$touch()"
                        @blur="$v.form.contactNumber.$touch()"
                        :error-messages="contactNumberErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['fas', 'phone']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ contactNumberErrors[0] }}</span>
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="validationTooltip01">Contact Email *</label>
                  <div
                    class="control"
                    :class="{
                      'form-group--error': $v.form.contactEmail.$error,
                    }"
                  >
                    <div class="iconinput inputIconbg">
                      <input
                        id="contactEmail"
                        class="form-control"
                        type="text"
                        placeholder="Contact Email"
                        v-model="form.contactEmail"
                        @input="$v.form.contactEmail.$touch()"
                        @blur="$v.form.contactEmail.$touch()"
                        :error-messages="contactEmailErrors"
                      />
                      <fa-icon
                        class="icon"
                        :icon="['far', 'envelope']"
                        style="width: 36px; height: 42px"
                      />
                    </div>
                  </div>
                  <div class="error">
                    <span>{{ contactEmailErrors[0] }}</span>
                  </div>
                </div>
              </div>
              <div>
                <button class="btn btn-primary btn-submit" type="submit">
                  Add Organization
                </button>
                <!-- v-on:click.stop.prevent="submit" -->
              </div>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol col="0" sm="4">
        <CCard>
          <CCardHeader>New Organization</CCardHeader>
          <CCardBody>
            <CButton size="lg" variant="outline" color="primary" block v-on:click="downLoadFile()"
              >Download existing organization list</CButton
            >
            <br />
            <!-- <CInputFile label="File custom input" horizontal custom /> -->
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
            <CButton size="lg" variant="outline" color="success" v-on:click="submitFile()" block>Upload</CButton>
            <!-- <div class="container">
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
                <button v-on:click="submitFile()">Submit</button>
              </div>
            </div> -->
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <SetOrganizationLimit />
  </div>
  <!-- </div> -->
</template>

<script>
//import { orgService } from "../_services/organization.service";

const SetOrganizationLimit = () =>
  import("@/views/organization/SetOrganizationLimit");

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
  components: {
    //OrganizationFileUpload
    SetOrganizationLimit,
  },
  data() {
    errors: [];
    return {
      form: {
        orgRefName: "",
        orgName: "",
        contactNumber: "",
        contactEmail: "",
        description: "",
        firstName: "",
        lastName: "",
        isDisabled: true,
      },
      toasterMessage: "This is from variable",
      url: process.env.VUE_APP_API_URL,
      orgUniqueFlag: undefined,
      file: "",
    };
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
        .post(this.url + "api/service/org/upload", formData, {
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
        .get(this.url + "api/service/org/download", {
          headers: {
            Authorization: "Bearer " + token,
            // "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          //console.log("Coming response" + response.headers);

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
            link.download = "organization.csv";
            link.click();
            
            this.toasterMessage = "File downloded successfully.";
            this.makeToast("success");
            //this.file = ''
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
          } else {
            this.toasterMessage = "File not downloded";
            this.makeToast("warning");
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

    onSubmit() {
      console.log("FOrm started");
      // this.toasterMessage = 'Form submitted successfully';
      // this.makeToast('primary');
      // if (!this.$v.form.$touch()) {
      this.$v.form.$touch();
      if (this.$v.$pendding || this.$v.$error) return;
      console.log("Form touched");
      OrganizationFormService.create(this.form)
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
      // console.log('my analytics components --> Reaading data from store ------>'+ this.$store.state.token);
      // console.log("Form submitted");
    },
    resetData() {
      this.form.orgRefName = "";
      this.form.orgName = "";
      this.form.contactNumber = "";
      this.form.contactEmail = "";
      this.form.description = "";
      this.form.firstName = "";
      this.form.lastName = "";
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
      const regex = /^[A-Za-z0-9 ]+$/;
      var isValid = regex.test(inputData);
      return isValid;
    },
    isContactNumberValid(inputData) {
      const regex = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
      var isValid = regex.test(inputData);
      return isValid;
    },
    isEmailidUnique(emailid) {
      
      return (emailid === "sanjeet.mohanty@db.com");
    },
  },
  validations: {
    form: {
      orgRefName: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(3),
      },
      orgName: {
        required,
        maxLength: maxLength(50),
        minLength: minLength(3),
      },
      contactEmail: {
        required,
        email,
      },
      description: {
        required,
      },
      contactNumber: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(10),
      },
      firstName: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(1),
      },
      lastName: {
        required,
        maxLength: maxLength(16),
        minLength: minLength(1),
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
    orgNameErrors() {
      const errors = [];
      if (!this.$v.form.orgName.$dirty) return errors;
      !this.$v.form.orgName.required &&
        errors.push("Organization Name is required.");
      !this.$v.form.orgName.minLength &&
        errors.push("Organization Name must be at atleast 2 characters long");
      !this.$v.form.orgName.maxLength &&
        errors.push("Organization Name must be at most 10 characters long");
      //console.log("this is invoked");
      //console.log("Error" + errors.length);
      //console.log("Testing testing " + this.form.orgName);
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.form.description.$dirty) return errors;
      // if (!this.haveSpecialChar(this.form.description)) {
      //   errors.push("Special Characters such as @,#,$ not allowed.");
      // }
      return errors;
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.form.firstName.$dirty) return errors;
      !this.$v.form.firstName.required &&
        errors.push("First Name is required.");
      if (!this.haveSpecialChar(this.form.firstName)) {
        errors.push("Special Characters such as @,#,$ not allowed.");
      }
      !this.$v.form.firstName.minLength &&
        errors.push("First Name must be at atleast 1 character long");
      !this.$v.form.firstName.maxLength &&
        errors.push("First Name must be at most 16 characters long");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;
      !this.$v.form.lastName.required && errors.push("Last Name is required.");
      if (!this.haveSpecialChar(this.form.lastName)) {
        errors.push("Special Characters such as @,#,$ not allowed.");
      }
      !this.$v.form.lastName.minLength &&
        errors.push("Last Name must be at atleast 1 character long");
      !this.$v.form.lastName.maxLength &&
        errors.push("Last Name must be at most 16 characters long");
      return errors;
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
    contactEmailErrors() {
      const errors = [];
      if (!this.$v.form.contactEmail.$dirty) return errors;
      !this.$v.form.contactEmail.required &&
        errors.push("Email Id is a required field!");
      !this.$v.form.contactEmail.email &&
        errors.push("Please enter a valid email id!");
      if (errors.length === 0) {
        if (this.isEmailidUnique(this.form.contactEmail)) {
          errors.push("Email Id already taken!");
        } 
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