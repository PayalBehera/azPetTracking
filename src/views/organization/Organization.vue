<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-8 is-offset-2">
          <horizontal-stepper
            :steps="demoSteps"
            @completed-step="completeStep"
            @active-step="isStepActive"
            @stepper-finished="alert"
          ></horizontal-stepper>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import HorizontalStepper from "vue-stepper";
import Organizationform from "./Organizationform";
import Addressform from "./Addressform";

export default {
  name: "Organization",
  components: {
    HorizontalStepper
  },

  data() {
    return {
      demoSteps: [
        {
          icon: "home",
          name: "first",
          title: "New Organization",
          subtitle: "Please populate details",
          component: Organizationform,
          completed: false
        },
        // {
        //   icon: "report_problem",
        //   name: "second",
        //   title: "Add Moderator",
        //   subtitle: "Organization contact details",
        //   component: Addmoderatorform,
        //   completed: false
        // },
        {
          icon: "perm_contact_calendar",
          name: "third",
          title: "Update Address",
          subtitle: "Please update the address",
          component: Addressform,
          completed: false
        }
      ]
    };
  },
  methods: {
    // Executed when @completed-step event is triggered
    completeStep(payload) {
      this.demoSteps.forEach(step => {
        if (step.name === payload.name) {
          step.completed = true;
        }
      });
    },
    // Executed when @active-step event is triggered
    isStepActive(payload) {
      this.demoSteps.forEach(step => {
        if (step.name === payload.name) {
          if (step.completed === true) {
            step.completed = false;
          }
        }
      });
    },
    // Executed when @stepper-finished event is triggered
    alert(payload) {
      alert("end");
    }
  }
};
</script>