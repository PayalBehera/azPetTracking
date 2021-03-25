<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
<script>
import AnalyticsService from "@/service/AnalyticsService";

export default {
  data: function () {
    return {
      series: [
        {
            name: "All Avarage",
          data: []//[44, 55, 41, 64, 22],
        },
        {
            name: "Indivisual",
          data: []//[53, 32, 33, 52, 13],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top",
            },
          },
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: "12px",
            colors: ["#fff"],
          },
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"],
        },
        title: {
          text: "All Average & Indivisual",
          align: "left",
        },
        xaxis: {
          categories: ["OD33A7777", "OD33S3028", "OD02Sb2222", "OD33S9999", "OR02BB8732"],
          title: {
            text: "Vehicles",
          },
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
    
  },
  methods: {
  
    fleetUsageAllAvarage() {
      AnalyticsService.getFleetUsage()
        .then((response) => {
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;
            this.series[0].data = []; //push(7) //= [5, 5, 5, 5, 5, 5, 5];
            this.chartOptions.yaxis.max = 25;
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