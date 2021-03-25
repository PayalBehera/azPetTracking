<template>
  <div>
    <div class="iconinput inputIconbg">
      <div>
        <form @submit.prevent="Display">
          <div class="form-row">
            <div class="col-md-4">
              <datetime
                input-class="form-control"
                placeholder="From Date"
                type="datetime"
                id="startDateTime"
                v-model="form.fromDate"
              ></datetime>
            </div>

            <div class="col-md-4">
              <datetime
                input-class="form-control"
                placeholder="To Date"
                type="datetime"
                id="endDateTime"
                v-model="form.toDate"
              ></datetime>
            </div>

            <div class="col-md-1" style="bottom:-5px;">
              
              <button class="btn btn-primary btn-submit" type="submit" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Go</span>
                </button>
            </div>
          </div>
        </form>
        <select
          class="form-control btn btn-secondary"
          style="
            width: 20%;
            height: 35px;
            position: relative;
            left: 80%;
            top: -37px;
          "
        >
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
        </select>
      </div>
      <div id="chart">
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
<script>
import { Datetime } from "vue-datetime";
export default {
  components: {
    datetime: Datetime,
  },
  data: function () {
    return {
      form: {
        orgRefName: "mcs",
        fromDate: "",
        toDate: "",
      },
      series: [
        {
          name: "Active",
          data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: "Idle",
          data: [12, 11, 14, 18, 17, 13, 13],
        },
        {
          name: "Inactive",
          data: [15, 16, 20, 23, 19, 11, 19],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#FFC300", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Active, Idle and  Inactive Vehicles",
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          //categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          title: {
            text: "Day",
          },
        },
        yaxis: {
          title: {
            text: "No Of Vehicles",
          },
          min: 5,
          max: 40,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  },
};
</script>
