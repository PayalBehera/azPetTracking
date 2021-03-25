<template>
  <CRow>
    <CCol sm="7">
      <CCard>
        <CCardHeader class="card-header">New User</CCardHeader>
        <CCardBody>
          <form
            id="neworganization"
            v-on:submit.prevent.self="onSubmit"
            class="needs-validation"
            novalidate
          >

            <div class="form-row">
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">First Name *</label>
                <div class="control" :class="{'form-group--error': $v.form.firstName.$error}">
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
                  <fa-icon class="icon" :icon="['fas','user']" style="width: 36px; height: 42px" />
                 </div>
                </div>
                <div class="error">
                  <span>{{ firstNameErrors[0] }}</span>
                </div>
              </div>

              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Last Name *</label>
                <div class="control" :class="{'form-group--error': $v.form.lastName.$error}">
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
                  <fa-icon class="icon" :icon="['fas','user']" style="width: 36px; height: 42px" />
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
                <div class="control" :class="{'form-group--error': $v.form.contactNumber.$error}">
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
                  <fa-icon class="icon" :icon="['fas','phone']" style="width: 36px; height: 42px" />
                 </div>
                </div>
                <div class="error">
                  <span>{{ contactNumberErrors[0] }}</span>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="validationTooltip01">Contact Email *</label>
                <div class="control" :class="{'form-group--error': $v.form.userName.$error}">
                  <div class="iconinput inputIconbg">
                  <input
                    id="userName"
                    class="form-control"
                    type="text"
                    placeholder="Contact Email"
                    v-model="form.userName"
                    @input="$v.form.userName.$touch()"
                    @blur="$v.form.userName.$touch()"
                    :error-messages="userNameErrors"
                  />
                  <fa-icon class="icon" :icon="['far','envelope']" style="width: 36px; height: 42px" />
                 </div>
                </div>
                <div class="error">
                  <span>{{ userNameErrors[0] }}</span>
                </div>
              </div>
            </div>
            <div>
              <button
                class="btn btn-primary btn-submit"
                type="submit"
              >Add User</button>
              <!-- v-on:click.stop.prevent="submit" -->
            </div>
          </form>
        </CCardBody>
      </CCard>
    </CCol>
    <CCol sm="5">
      
          <ResetUserPassword/>  
      </CCol>
    
  </CRow>

  <!-- </div> -->
</template>

<script>
//import { orgService } from "../_services/organization.service";

const ResetUserPassword = () =>
  import("@/views/user/ResetUserPassword");

import UserService from "@/service/UserService";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  maxLength,
  minLength,
  between
} from "vuelidate/lib/validators";
import Vuelidate from "vuelidate";
import store from '@/store';
//import OrganizationFileUpload from "./OrganizationFileUpload";
//import Toaster from "./toasters/Toaster";
export default {
  name: "Organizationform",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  components: {
    ResetUserPassword
  },
  data() {
    errors: [];
    return {
      form: {
        orgRefName: localStorage.getItem("orgId"),
        contactNumber: "",
        userName: "",
        firstName: "",
        lastName: "",
      },
      toasterMessage: "This is from variable",
      url: process.env.VUE_APP_API_URL
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
        appendToast: false
      });
    },
    onSubmit() {
      console.log("FOrm started");
       this.$v.form.$touch();
       if (this.$v.$pendding || this.$v.$error) return;
        console.log("Form touched");
        UserService.createUser(this.form)
          .then(response => {
            console.log("Coming response"+ response.status)
            
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
            if (error.response.status === 400) {
              this.toasterMessage = "Bad request from applicaiton";
              this.makeToast("warning");
            } else if (error.response.status === 409) {
              this.toasterMessage = error.response.data.message;
              this.makeToast("danger");
            } else if (error.response.status === 500) {
              this.toasterMessage = error.response.data.message;
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
         this.form.contactNumber= "";
        this.form.userName= "";
          this.form.firstName= "";
          this.form.lastName= "";
   },
    checkUniqueOrg(orgRefName) {
      //OrganizationFormService.validate(orgRefName);
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
      userName: {
        required,
        email
      },
      contactNumber: {
        required,
        maxLength: maxLength(10),
        minLength: minLength(10)
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
    orgRefNameErrors() {
      const errors = [];
      if (!this.$v.form.orgRefName.$dirty) return errors;
      !this.$v.form.orgRefName.required &&
        errors.push("orgRefName is required.");
      !this.$v.form.orgRefName.minLength &&
        errors.push("orgRefName must be at atleast 2 characters long");
      !this.$v.form.orgRefName.maxLength &&
        errors.push("orgRefName must be at most 10 characters long");
      console.log("this is invoked");
      console.log("Error" + errors.length);
      console.log("Testing testing " + this.form.orgRefName);
      if (errors.length === 0) {
        if (!this.checkUniqueOrg(this.form.orgRefName)) {
          errors.push("id is already taken!");
        }
      }
      return errors;
    },
    orgNameErrors() {
      const errors = [];
      if (!this.$v.form.orgName.$dirty) return errors;
      !this.$v.form.orgName.required && errors.push("orgName is required.");
      !this.$v.form.orgName.minLength &&
        errors.push("orgName must be at atleast 2 characters long");
      !this.$v.form.orgName.maxLength &&
        errors.push("orgName must be at most 10 characters long");
      console.log("this is invoked");
      console.log("Error" + errors.length);
      console.log("Testing testing " + this.form.orgName);
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.form.description.$dirty) return errors;
      if (!this.haveSpecialChar(this.form.description)) {
        errors.push("Special Characters such as @,#,$ not allowed.");
      }
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
    userNameErrors() {
      const errors = [];
      if (!this.$v.form.userName.$dirty) return errors;
      !this.$v.form.userName.required &&
        errors.push("Email Id is a required field!");
      !this.$v.form.userName.email &&
        errors.push("Please enter a valid email id!");
      if (errors.length === 0) {
        if (this.isEmailidUnique(this.form.userName)) {
          errors.push("Email Id already taken!");
        } else {
        }
      }
      return errors;
    }
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