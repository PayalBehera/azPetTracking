<template>
  <CRow>
    <CCol sm="10">
      <CCardBody>
        <form class="needs-validation" novalidate>
          <div class="form-row">
            <div class="col-md-3 mb-3"></div>
            <div class="col-md-3 mb-3">
              <label for="validationTooltip01">First Name</label>
              <div class="control">
                <input
                  class="form-control"
                  :class="['input', ($v.form.firstName.$error) ? 'is-danger' : '']"
                  type="text"
                  placeholder="First Name"
                  v-model="form.firstName"
                />
              </div>
              <p v-if="$v.form.orgRefName.$error" class="help is-danger">First Name is invalid</p>
            </div>
            <div class="col-md-5 mb-3">
              <label for="validationTooltip01">Last Name</label>
              <div class="control">
                <input
                  class="form-control"
                  :class="['input', ($v.form.lastName.$error) ? 'is-danger' : '']"
                  type="text"
                  placeholder="Organization Name"
                  v-model="form.lastName"
                />
              </div>
              <p v-if="$v.form.lastName.$error" class="help is-danger">This lastName is invalid</p>
            </div>
            <div class="col-md-1 mb-3"></div>
          </div>
          <div class="form-row">
            <div class="col-md-3 mb-3"></div>

            <div class="col-md-4 mb-3">
              <label for="validationTooltip01">Email Id</label>
              <div class="control">
                <input
                  class="form-control"
                  :class="['input', ($v.form.emailId.$error) ? 'is-danger' : '']"
                  type="text"
                  placeholder="Email Id"
                  v-model="form.emailId"
                />
              </div>
              <p v-if="$v.form.emailId.$error" class="help is-danger">This Email Id is invalid</p>
            </div>

            <div class="col-md-4 mb-3">
              <label for="validationTooltip01">Employee Id</label>
              <div class="control">
                <input
                  class="form-control"
                  :class="['input', ($v.form.employeeId.$error) ? 'is-danger' : '']"
                  type="text"
                  placeholder="employeeId"
                  v-model="form.employeeId"
                />
              </div>
              <p v-if="$v.form.employeeId.$error" class="help is-danger">This employeeId is invalid</p>
            </div>
            <div class="col-md-1 mb-3"></div>
          </div>
        </form>
      </CCardBody>
    </CCol>
  </CRow>

  <!-- </div> -->
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "Addmoderatorform",
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        emailId: "",
        lastName: "",
        // phoneNo: "",
        // role: ""
      }
    };
  },
  validations: {
    form: {
      firstName: {
        required
      },
      lastName: {
        required
      },
      emailId: {
        required,
        email
      },
      description: {
        required
      },
      contactName: {
        required
      },
      contactNumber: {
        required
      }
    }
  },
  watch: {
    $v: {
      handler: function(val) {
        if (!val.$invalid) {
          this.$emit("can-continue", { value: true });
        } else {
          this.$emit("can-continue", { value: false });
        }
      },
      deep: true
    },
    clickedNext(val) {
      if (val === true) {
        this.$v.form.$touch();
      }
    }
  },
  mounted() {
    if (!this.$v.$invalid) {
      this.$emit("can-continue", { value: true });
    } else {
      this.$emit("can-continue", { value: false });
    }
  }
};
</script>