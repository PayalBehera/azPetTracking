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
import ConvertDateToLocalDateTime from "@/service/ConvertDateToLocalDateTime"

export default {
  data: function () {
    return {
      timeStamp: '',
      timer: '',
      series: [
        {
          name: "Distance Travelled",
          type: "column",
          data: [45, 52, 38, 45, 19, 23, 2],
          
        },
        // {
        //   name: "Distance Travelled",
        //   type: "line",
        //   data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160],
        // },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "column",
          toolbar: {
            show: false,
          },
        },
        stroke: {
          width: [0, 4],
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
    };
  },
  created() {
    this.fleetUsageAllAvarage();
    this.timer = setInterval(this.fleetUsageAllAvarage, 60000)
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
            this.timeStamp = serverData.timeStamp
            this.series = [
              {
                data: line2,
              },
            ];
            this.chartOptions = {
              xaxis: {
                categories: xvalue,
              }, //[colors[Math.floor(Math.random() * colors.length)]],
              title: {
                text: "Fleet Usage("+ ConvertDateToLocalDateTime.convertLocalDateAndTime(this.timeStamp) +")"
              }
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
  beforeDestroy () {
      clearInterval(this.timer)
    },
};
</script>