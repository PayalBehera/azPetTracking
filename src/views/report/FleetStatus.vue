<template>
  <!-- <div class="charthei">
  <CChartDoughnut
    :datasets="defaultDatasets"
    :labels="['VueJs', 'EmberJs', 'ReactJs', 'AngularJs']"
  />
</div> -->
  <!-- <div id="container"></div> -->
  <!-- <div>
    <apexchart
      width="380"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div> -->
  <div id="chart">
    <apexchart
      type="donut"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
//import VueApexCharts from "vue-apexcharts";

import AnalyticsService from "@/service/AnalyticsService";

export default {
  data() {
    return {
      seriess: [],
      //series: [], //[1, 1, 1, 1],//, 15
      chartOptions: {
        chart: {
          padding: 100,
          width: 380,
          type: "donut",
          dropShadow: {
            enabled: true,
            color: "#111",
            top: -1,
            left: 3,
            blur: 3,
            opacity: 0.2,
          },
          // events: {
          //   beforeMount: function (chartContext, config) {
          //     this.fleetStatus()
          //   },
          // },
        },
        stroke: {
          width: 0,
        },
        plotOptions: {
          pie: {
            startAngle: 0,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 25,
            customScale: 1,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10,
            },
            donut: {
              size: "67%",
              background: "transparent",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: undefined,
                  offsetY: -10,
                  formatter: function (val) {
                    return val;
                  },
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (val) {
                    return val;
                  },
                },
                total: {
                  show: true,
                  showAlways: false,
                  label: "Vehicles",
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#373d3f",
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0);
                  },
                },
              },
            },
          },
        },
        labels: ["Running", "Idle", "Inactive", "No Data"], //"Stopped",
        colors: ["#09BB21", "#FFC300", "#5DADE2", "#BDC3C7"], //"#FF5733",
        dataLabels: {
          dropShadow: {
            blur: 3,
            opacity: 0.8,
          },
        },
        fill: {
          colors: ["#09BB21", "#FFC300", "#5DADE2", "#BDC3C7"], //"#FF5733",

          // type: 'pattern',
          //   opacity: 1,
          //   pattern: {
          //     enabled: true,
          //     style: ['verticalLines', 'squares', 'horizontalLines', 'circles','slantedLines'],
          //   },
        },
        states: {
          hover: {
            filter: "none",
          },
        },
        theme: {
          palette: "palette2",
        },
        title: {
          text: "Fleet Status",
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
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        legend: {
          show: true,
          showForSingleSeries: false,
          showForNullSeries: true,
          showForZeroSeries: true,
          position: "right",
          horizontalAlign: "center",
          floating: false,
          fontSize: "14px",
          fontFamily: "Helvetica, Arial",
          fontWeight: 400,
          formatter: function (label, opts) {
            return label + "-" + opts.w.globals.series[opts.seriesIndex];
          },
          inverseOrder: false,
          width: undefined,
          height: undefined,
          tooltipHoverFormatter: undefined,
          offsetX: 0,
          offsetY: 0,
          labels: {
            colors: undefined,
            useSeriesColors: false,
          },
          markers: {
            width: 6,
            height: 6,
            strokeWidth: 0,
            strokeColor: "#fff",
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
          itemMargin: {
            horizontal: 5,
            vertical: 5,
          },
          onItemClick: {
            toggleDataSeries: true,
          },
          onItemHover: {
            highlightDataSeries: true,
          },
        },
      },
      /*options: {
        plotOptions: {
          pie: {
            startAngle: 0,
            expandOnClick: true,
            offsetX: 0,
            offsetY: 0,
            customScale: 1,
            dataLabels: {
              offset: 0,
              minAngleToShowLabel: 10,
            },
            donut: {
              size: "65%",
              background: "transparent",
              labels: {
                show: true,
                name: {
                  show: true,
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: undefined,
                  offsetY: -10,
                  formatter: function (val) {
                    return val;
                  },
                },
                value: {
                  show: true,
                  fontSize: "16px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 400,
                  color: undefined,
                  offsetY: 16,
                  formatter: function (val) {
                    return val;
                  },
                },
                total: {
                  show: true,
                  showAlways: false,
                  label: "Vehicles",
                  fontSize: "22px",
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontWeight: 600,
                  color: "#373d3f",
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b;
                    }, 0);
                  },
                },
              },
            },
          },
        },
      },
      series: [44, 55, 41, 17, 15],
      chartOptions: {
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon','Djj']
      }*/
    };
  },
  computed: {
    series() {
      console.log("Computed in series")
      console.log(this.seriess)
      return this.seriess//[12, 34, 67, 89];
    }

  },
  created() {
    this.fleetStatus();
  },
  methods: {
    fleetStatus() {
      AnalyticsService.getFleetStatus()
        .then((response) => {
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;
            //this.series = [12, 34, 67, 89];
            this.seriess.push(serverData.runningVehicle)
            this.seriess.push(serverData.idle)
            this.seriess.push(serverData.inactive)
            this.seriess.push(serverData.noData)
            //this.seriess = [serverData.runningVehicle, serverData.idle, serverData.inactive, serverData.noData]
            console.log("Inside fleet staus:" + serverData.totalVehicle);
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
  },
};
// import { CChartDoughnut } from '@coreui/vue-chartjs'

// export default {
//   name: 'CChartDoughnutExample',
//   components: { CChartDoughnut },
//   computed: {
//     defaultDatasets () {
//       return [
//         {
//           backgroundColor: [
//             '#41B883',
//             '#E46651',
//             '#00D8FF',
//             '#DD1B16'
//           ],
//           data: [40, 20, 80, 10],
//           weight: 16,
//           options: {
//             cutoutPercentage: "5%"
//           },
//         }
//       ]
//     }
//   }
// }
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