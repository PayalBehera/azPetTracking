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
//import VueApexCharts from "vue-apexcharts";

import AnalyticsService from "@/service/AnalyticsService";
import ConvertDateToLocalDateTime from "@/service/ConvertDateToLocalDateTime"

export default {
  data() {
    return {
      timeStamp: '',
      timer: '',
      series: [
        {
            name: "Vehicles",
          data: [], //[400, 430, 448, 470],
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
            startingShape: "flat",
            endingShape: "flat",
            columnWidth: "70%",
            barHeight: "70%",
            distributed: true,
            rangeBarOverlap: true,
            rangeBarGroupRows: false,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 0,
                  color: undefined,
                },
              ],
              backgroundBarColors: [],
              backgroundBarOpacity: 1,
              backgroundBarRadius: 0,
            },
            dataLabels: {
              position: "center",
              maxItems: 100,
              hideOverflowingLabels: true,
              //orientation: horizontal,
            },
          },
        },
        colors: ["#BDC3C7","#09BB21", "#FFC300", "#5DADE2", "#EA2F0D"],
        title: {
          text: "Fleet Status",//"Fleet Status("+ this.timeStamp +")",
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
          //enabled: false,
          formatter: function (val) {
            return val !== 0 ? val : " ";
          },
        },
        xaxis: {
          categories: ["Vehicles","Running", "Idle", "Inactive", "No Data"],
          title: {
            text: "No Of Vehicle",
          },
        },
        // yaxis: {
        //   title: {
        //     text: "Temperature",
        //   },
        //   min: 5,
        //   max: 40,
        // },
      },
    };
  },
  //   computed: {
  //     series() {
  //       console.log("Computed in series");
  //       console.log(this.seriess[0].data);
  //       return this.seriess; //[12, 34, 67, 89];
  //     },
  //   },
  created() {

    this.fleetStatus();
    this.timer = setInterval(this.fleetStatus, 60000)
  },
  methods: {
    fleetStatus() {
      AnalyticsService.getFleetStatus()
        .then((response) => {
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;
            //this.series = [12, 34, 67, 89];
            var newData = [];
            // this.seriess[0].data.push(serverData.runningVehicle);
            // this.seriess[0].data.push(serverData.idle);
            // this.seriess[0].data.push(serverData.inactive);
            // this.seriess[0].data.push(serverData.noData);
            newData.push(serverData.totalVehicle)
            newData.push(serverData.runningVehicle);
            newData.push(serverData.idle);
            newData.push(serverData.inactive);
            newData.push(serverData.noData);
            this.series = [
              {
                data: newData,
              },
            ];
            this.timeStamp = serverData.timeStamp
            this.chartOptions = {title:{text:"Fleet Status("+ ConvertDateToLocalDateTime.convertLocalDateAndTime(serverData.timeStamp) +")"}}
            
            console.log("Time stamp:"+ serverData.timeStamp)
            //this.seriess = [serverData.runningVehicle, serverData.idle, serverData.inactive, serverData.noData]
            console.log("Inside fleet staus:" + serverData.totalVehicle);
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
<style scoped>
.charthei {
  width: 100%;
  height: 100%;
  margin: 0px 20px 15px 0px;
  padding: 0;
}
.legendhw {
  width: 200px;
  height: 400px;
}
</style>>