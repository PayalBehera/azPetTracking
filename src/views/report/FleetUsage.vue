<template>
  <div id="chart">
    <apexchart
      type="area"
      height="300"
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
      chartOptions: {
        chart: {
          height: 280,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "Fleet Usage",
          align: "left",
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: true,
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: undefined,
            color: "#263238",
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [
            "01 Jan",
            "02 Jan",
            "03 Jan",
            "04 Jan",
            "05 Jan",
            "06 Jan",
            "07 Jan",
          ],
          title: {
            text: "Vehicles",
          },
        },
        yaxis: {
          title: {
            text: "Distance Travelled In KMs",
          },
          //   min: 5,
          //   max: 40,
        },
      },
      series: [
        {
          name: "Distance Travelled",
          data: [45, 52, 38, 45, 19, 23, 2],
        },
      ],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100],
        },
      },
    };
  },
  created() {
    this.fleetUsageAllAvarage();
  },
  methods: {
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
  },
};
</script>