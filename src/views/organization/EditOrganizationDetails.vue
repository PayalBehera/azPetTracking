<template>
  <CRow>
    <CCol sm="8">
      <CCard>
        <CCardHeader class="card-header">Update Organization</CCardHeader>
        <CCardBody>
          <form
            id="updateorganization"
            @submit.prevent="submitForm"
            class="needs-validation"
            novalidate
          >
            <div class="form-row">
              <div class="col-md-5 mb-3">
                <label for="validationTooltip01">Organization Ref Name *</label>
                <div class="control" :class="{'form-group--error': $v.form.orgRefName.$error}">
                  <input
                    id="orgRefName"
                    class="form-control"
                    type="text"
                    placeholder="Organization Ref Name"
                    v-model="form.orgRefName"
                    @input="$v.form.orgRefName.$touch()"
                    @blur="$v.form.orgRefName.$touch()"
                    :error-messages="orgRefNameErrors"
                  />
                </div>
                <div class="error">
                  <span>{{ orgRefNameErrors[0] }}</span>
                </div>
              </div>
              <div class="col-md-7 mb-3">
                <label for="validationTooltip01">Organization Name *</label>
                <div class="control" :class="{'form-group--error': $v.form.orgName.$error}">
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
                </div>
                <div class="error">
                  <span>{{ orgNameErrors[0] }}</span>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="col-md-12 mb-3">
                <label for="validationTooltip01">Description</label>
                <div class="control" :class="{'form-group--error': $v.form.description.$error}">
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
                </div>
                <div class="error">
                  <span>{{ descriptionErrors[0] }}</span>
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

import OrganizationFormService from "@/service/OrganizationFormService";
import TutorialDataService from "../../service/TutorialDataService";
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
  name: "User",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  data() {
    errors: [];
    return {
      form: {
        orgId: "",
        orgRefName: "",
        orgName: "",
        description: "",
        isDisabled: true
      }
    };
  },
  created(){
    let organizationDetails = JSON.parse(localStorage.getItem("orgDetails"));
    console.log("Driver no:"+ organizationDetails)
      this.form.orgId = organizationDetails.orgId;
      this.form.orgRefName = organizationDetails.orgRefName;
      this.form.orgName = organizationDetails.orgName;
      this.form.description = organizationDetails.description;
      

  },
  /*mounted() {
    console.log("Parameter from other component --> " + this.$route.params.id);
    this.getOrganizatioById(this.$route.params.id);
  },*/

  methods: {
    submitForm() {
      console.log('FOrm started');
      // this.validateOrgRefId();
      //this.userService.test();
      
      // this.toasterMessage = 'Form submitted successfully';
      // this.makeToast('primary');
      if (!this.$v.form.$touch()) {
        console.log("Form touched");
        console.log(this.form.orgId)
        console.log(this.form.orgRefName)
        console.log(this.form.orgName)
        console.log(this.form.description)
        OrganizationFormService.updateOrgDetails(this.form)
          .then(response => {
            console.log("Coming response"+ response.status)
            
           if(response.status === 226){
              this.toasterMessage = response.data.message;
              this.makeToast("danger");
            }
            if(response.status === 200){
              // this.form.driverName=""
              // this.form.drivingLicence=""
              // this.form.contactNumber=""
              // this.form.whatsappnumber=""
              // this.toasterMessage = response.data.message;
              // this.makeToast("success");
              localStorage.removeItem("orgDetails")
              this.$router.push({path: `/base/viewOrganization`})
              this.$root.$emit("orgToast", response.data.message);
              
            }
          })
          .catch(error => {
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

    getOrganizatioById(param) {
      TutorialDataService.get(param)
        .then(response => {
          let serverData = response.data;
          this.form = serverData.data;
          console.log(this.form);
        })
        .catch(function error() {
          console.log(error);
        });
    },

    handleBlur(orgRefName) {
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
      createdBy: {
        required
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
        if (!this.handleBlur(this.form.orgRefName)) {
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

      // if (!this.haveSpecialChar(this.form.description)) {
      //   errors.push("Special Characters such as @,#,$ not allowed.");
      // }

      return errors;
    },

    createdByErrors() {
      const errors = [];
      if (!this.$v.form.createdBy.$dirty) return errors;

      !this.$v.form.createdBy.required &&
        errors.push("Created By is required.");

      return errors;
    },

    lastNameErrors() {
      const errors = [];
      if (!this.$v.form.lastName.$dirty) return errors;

      !this.$v.form.lastName.required && errors.push("First Name is required.");

      if (!this.haveSpecialChar(this.form.lastName)) {
        errors.push("Special Characters such as @,#,$ not allowed.");
      }

      !this.$v.form.lastName.minLength &&
        errors.push("Last Name must be at atleast 1 character long");
      !this.$v.form.lastName.maxLength &&
        errors.push("Last Name must be at most 16 characters long");

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
        } else {
        }
      }

      return errors;
    }
  }
};
</script>