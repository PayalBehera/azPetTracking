<template>
  <!-- <CWidgetDropdown>
    <template #default>
      <CDropdown color="transparent p-0" placement="bottom-end">
        <template #toggler-content>
          <CIcon name="cil-settings" />
        </template>
        <CDropdownItem>Daily</CDropdownItem>
        <CDropdownItem>Monthly</CDropdownItem>
      </CDropdown>
    </template>

    <template #footer> -->
  <div id="chart">
    <apexchart
      ref="realtimeChart"
      type="line"
      height="350"
      :options="chartOptions"
      :series.sync="series"
    ></apexchart>
  </div>
  <!-- </template>
  </CWidgetDropdown> -->
</template>
<script>
import AnalyticsService from "@/service/AnalyticsService";

export default {
  data: function () {
    return {
      form: {
        orgRefName: "mcs",
        fromDate: "2020-10-22T08:29:09Z",
        toDate: "2020-10-28T18:29:09Z",
      },
      series: [
        {
          name: "All Vehicle Average Distance",
          data: [], //[28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: "Indivisual Distance",
          data: [12, 11, 14, 18, 17, 13, 13],
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
        colors: ["#77B6EA", "#545454"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "All Average & Indivisual",
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
          categories: [], //["V1", "V2", "V3", "V4", "V5", "V6", "V7"],
          title: {
            text: "Vehicles",
          },
        },
        yaxis: {
          title: {
            text: "Distance In KMs",
          },
          //   min: 0,
          //   max: 40,
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
  computed: {},
  created() {
    // this.series[0].data = [5, 5, 5, 5, 5, 5, 5];
    //this.chartOptions.yaxis.max = 25
    // this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
    this.fleetUsageAllAvarage();
    //this.updateSeriesLine ()
    this.updateChart();
  },
  methods: {
    updateChart() {
      this.series[0].data = [5, 5, 5, 5, 5, 5, 5];
    },
    fleetUsageAllAvarage() {
      AnalyticsService.getFleetUsage()
        .then((response) => {
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;

            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData.matrix.length; k++) {
              line1.push(serverData.average);
              line2.push(serverData.matrix[k].distance);
              //this.chartOptions.xaxis.categories.push(serverData.matrix[k].vehicleNumber);
              xvalue.push(serverData.matrix[k].vehicleNumber);
            }
            this.series = [
              {
                data: line1,
              },
              {
                data: line2,
              },
            ];
            this.chartOptions = {
              xaxis: {
                categories: xvalue,
              }, //[colors[Math.floor(Math.random() * colors.length)]],
            };
            //this.series = [serverData.runningVehicle, serverData.idle, serverData.inactive, serverData.noData]
            console.log("Inside fleet usage:" + serverData.totalDistance);
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
    updateSeriesLine() {
      this.$refs.realtimeChart.updateSeries(
        [
          {
            data: (this.series[0].data = [5, 5, 5, 5, 5, 5, 5]),
          },
        ],
        false,
        true
      );
    },
  },
};
</script>