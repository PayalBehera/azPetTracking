<template>
  <div id="chart">
    <apexchart
      type="line"
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
      form: {
        orgRefName: "mcs",
        fromDate: "2020-12-15T18:29:09Z",
        toDate: "2020-12-21T16:29:09Z",
      },
      series: [
        {
          name: "Engine On & Vehicle is moving",
          data: []//[28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: "Engine On & Vehicle is Idle",
          data: []//[12, 11, 14, 18, 17, 13, 13],
        },
        {
          name: "Engine Off & Vehicle is not moving",
          data: []//[15, 16, 20, 23, 19, 11, 19],
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
        colors: ["#05D205", "#FFC300", "#EA280D"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Fleet Fuel",
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
          categories: ["V1", "V2", "V3", "V4", "V5", "V6", "V7"],
          title: {
            text: "Vehicles",
          },
        },
        yaxis: {
          title: {
            text: "Hours",
          },
        //   min: 5,
        //   max: 40,
        },
        // legend: {
        //   position: "top",
        //   horizontalAlign: "right",
        //   floating: true,
        //   offsetY: -25,
        //   offsetX: -5,
        //},
      },
    };
  },
  created() {
    this.fleetStatusGraph1();
  },
  methods: {
    fleetStatusGraph1() {
      AnalyticsService.getFleetFuelGraph1(this.form)
        .then((response) => {
          if (response.status === 200) {
            let serverData = response.data;
            console.log("Inside fleet fuel vehiclevshours:" + serverData.length);
            //this.overspeedVC = serverData;
            //this.series = [12, 34, 67, 89];
             var xvalue = []
            var line1 = []
            var line2 = []
            var line3 = []
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData.length; k++) {
              
              line1.push(serverData[k].movingEngineOn)
              line2.push(serverData[k].idleHourEngineOn)
              line3.push(serverData[k].idleHourEngineOff)
              //this.chartOptions.xaxis.categories.push(serverData.matrix[k].vehicleNumber);
              xvalue.push(serverData[k].vehicleNumber);
              
            }
            this.series = [
              {
                data: line1,
              },
              {
                data: line2,
              },
              {
                data: line3,
              }
            ];
            this.chartOptions = {
              xaxis : {
                 categories: xvalue
                  }//[colors[Math.floor(Math.random() * colors.length)]],
            };
            //this.seriess = [serverData.runningVehicle, serverData.idle, serverData.inactive, serverData.noData]
            
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
  },
};
</script>
