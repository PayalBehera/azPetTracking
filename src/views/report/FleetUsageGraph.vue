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
          name: "No Of Active Vehicle",
          type: "column",
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16],
        },
        {
          name: "Distance Travelled In KMs",
          type: "line",
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [0, 4],
        },
        title: {
          text: "Active Vehicle & Distance Travelled",
        },
        dataLabels: {
          enabled: true,
          enabledOnSeries: [1],
        },
        labels: [
          "01 Jan 2001",
          "02 Jan 2001",
          "03 Jan 2001",
          "04 Jan 2001",
          "05 Jan 2001",
          "06 Jan 2001",
          "07 Jan 2001",
          "08 Jan 2001",
          "09 Jan 2001",
          "10 Jan 2001",
          "11 Jan 2001",
          "12 Jan 2001",
        ],
        xaxis: {
          type: "datetime",
        },
        yaxis: [
          {
            title: {
              text: "No Of Active Vehicle",
            },
          },
          {
            opposite: true,
            title: {
              text: "Distance Travelled In KMs",
            },
          },
        ],
      },
    };
  },
};
</script>