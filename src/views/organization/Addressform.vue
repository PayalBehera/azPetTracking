<template>
  <CRow>
    <CCol sm="10">
      <CCardBody>
        <form class="needs-validation" novalidate>
          <div class="form-row">
            <div class="col-md-3 mb-3"></div>
            <div class="col-md-8 mb-3">
              <label for="validationTooltip01">Address Line 1</label>
              <div class="control">
                <input
                  class="form-control"
                  :class="['input', ($v.form.addressLine1.$error) ? 'is-danger' : '']"
                  type="text"
                  placeholder="Address Line 1"
                  v-model="form.addressLine1"
                />
              </div>
              <p v-if="$v.form.addressLine1.$error" class="help is-danger">Address Line 1 is invalid</p>
            </div>
            <div class="col-md-3 mb-3"></div>
          </div>

          <div class="form-row">
            <div class="col-md-3 mb-3"></div>
            <div class="col-md-8 mb-3">
              <label for="validationTooltip01">Address Line 2</label>
              <div class="control">
                <input
                  class="form-control"
                  :class="['input', ($v.form.addressLine2.$error) ? 'is-danger' : '']"
                  type="text"
                  placeholder="Address Line 2"
                  v-model="form.addressLine2"
                />
              </div>
              <p v-if="$v.form.addressLine2.$error" class="help is-danger">Address Line 2 is invalid</p>
            </div>
            <div class="col-md-3 mb-3"></div>
          </div>

          <div class="form-row">
            <div class="col-md-3 mb-3"></div>
            <div class="col-md-8 mb-3">
              <label for="validationTooltip01">Street</label>
              <div class="control">
                <input
                  class="form-control"
                  :class="['input', ($v.form.street.$error) ? 'is-danger' : '']"
                  type="text"
                  placeholder="Street"
                  v-model="form.street"
                />
              </div>
              <p v-if="$v.form.street.$error" class="help is-danger">Street is invalid</p>
            </div>
            <div class="col-md-3 mb-3"></div>
          </div>



          <div>
              <button> Submit </button>
          </div>

          <!-- <div class="form-row">
            <div class="col-md-3 mb-3"></div>
            <div class="col-md-4 mb-3">
              <div class="dropdown">
                <button
                  type="button"
                  class="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                  :disabled="isDisabled"
                >Dropdown button</button>
                <div class="dropdown-menu">
                  <a class="dropdown-item" href="#">Link 1</a>
                  <a class="dropdown-item" href="#">Link 2</a>
                  <a class="dropdown-item" href="#">Link 3</a>
                </div>
              </div>
            </div>
          </div> -->
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
  name: "Addressform",
  mail: email,
  props: ["clickedNext", "currentStep"],
  mixins: [validationMixin],
  data() {
    return {
      form: {
        addressLine1: "",
        addressLine2: "",
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: ""
      }
    };
  },
  validations: {
    form: {
      addressLine1: {
        required
      },
      addressLine2: {
        required
      },
      street: {
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

        //console.log($v);
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
  },
  computed: {
    isDisabled() {
      alert("i am invoked");
      return false;
    }
  }
};
</script>