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
                v-model="form1.fromDate"
              ></datetime>
             
            </div>
            
            <div class="col-md-4">
             
              <datetime
                input-class="form-control"
                placeholder="To Date"
                type="datetime"
                id="endDateTime"
                v-model="form1.toDate"
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
      <select class="form-control"  
      style="width:20%;height:40px; position:relative;left:80%;top:-42px;"
               v-model="selected"  @change="onchange">
                  
                  <option v-for="item in items" :value="item.val" :key="item.id">{{item.val}}</option>
                 
                  
                </select>
               
  <div id="chart">
    <apexchart
      ref="realtimeChart"
      type="bar"
      height="350"
      :options="chartOptions"
      :series.sync="series"
    ></apexchart>
    
  </div>
                 
                 
  </div>
  </div></div>
</template>
<script>
import AnalyticsService from "@/service/AnalyticsService";
import { Datetime } from "vue-datetime";
export default {
  components: {
    datetime: Datetime,
  },
  data: function () {
    return {
      selected:'Daily',
    selectdate:"",  
  
      items:{
          1:{id:1,val:'Daily'},
          2:{id:2,val:'Weekly'},
          3:{id:3,val:'Monthly'},
      },
      weekly:{
        orgRefName: localStorage.getItem("orgId"),
        fromDate: "",
        toDate: "",
      },
      monthly:{
        orgRefName: localStorage.getItem("orgId"),
        fromDate: "",
        toDate: "",
      },
      form: {
        orgRefName: localStorage.getItem("orgId"),
        fromDate: "",
        toDate: "",
      },
      

      form1: {
        orgRefName: localStorage.getItem("orgId"),
        fromDate: "",
        toDate: "",
      },
      form2: {
        orgRefName: localStorage.getItem("orgId"),
        fromDate: "",
        toDate: "",
      },
      form3: {
        orgRefName: localStorage.getItem("orgId"),
        fromDate: "",
        toDate: "",
      },
      //loading: false,
      series: [
        {
          name: "All Vehicle Average Distance",
          data: [], //[28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: "Indivisual Distance",
          data: [],
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
        colors: ["#008ffb", "#545454"],
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
   
    this.getcurrenttimedate();
    this.fleetUsageAllAvarage();
    //this.getcurrenttimedatedaily()
    //this.updateSeriesLine ()
    this.updateChart();
  },
  methods: {
    onchange(){
    if (this.selected=="Daily"){
      
     this.fleetUsageAllAvarage();
     this.selectdate=this.form.fromDate
     }
    else if(this.selected=="Weekly") {
      this.fleetUsageAllAvarageweekly();
      this.selectdate=this.form1.fromDate
    }else {
      this.fleetUsageAllAvaragemonthly()
      this.selectdate=this.form2.fromDate
    }
    },
    getcurrenttimedate(){
      let dateTime = new Date();
      let timestamp1=Date.now();
      let timestamp=timestamp1-(7*(1000*60*60*24));
      let timestamp2=timestamp1-(30*(1000*60*60*24));
      this.form2.fromDate=timestamp;
      this.form2.toDate=timestamp1;
      this.form3.fromDate=timestamp2;
      this.form3.toDate=timestamp1;
      var old2time=new Date(timestamp2);
       var oldtime=new Date(timestamp);
       var nowtime=new Date(timestamp1);
       this.weekly.fromDate=oldtime;
       this.weekly.toDate=nowtime
       this.monthly.fromDate=old2time;
       this.monthly.toDate=nowtime
      //let date=oldtime.getDate();
      // // let date=dateTime.toJSON().slice(0,10).replace(/-/g,'/')
      let mydate=dateTime.getUTCDate()
      //let mydate1=dateTime.getUTCDate()
      let mymonth=dateTime.getUTCMonth()+1
      let myyear=dateTime.getFullYear()
      let myhour=dateTime.getUTCHours()
      let myminutes=dateTime.getUTCMinutes()
      
      //let mysecond=dateTime.getUTCSeconds()
      if(mydate<=9 && mymonth<=9){
      if(myminutes<=9 && myhour<=9){
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else if (myminutes>=10 && myhour<=9) {
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      } else if (myminutes<=9 && myhour>=10 ){
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else{
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      }
      }else if(mydate>=10 && mymonth<=9){
        if(myminutes<=9 && myhour<=9){
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else if (myminutes>=10 && myhour<=9) {
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      } else if (myminutes<=9 && myhour>=10 ){
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else{
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      }
      }else if(mydate<=9 && mymonth>=10){
         if(myminutes<=9 && myhour<=9){
        this.form.fromDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else if (myminutes>=10 && myhour<=9) {
        this.form.fromDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      } else if (myminutes<=9 && myhour>=10 ){
        this.form.fromDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else{
        this.form.fromDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      }
      }else{
        if(myminutes<=9 && myhour<=9){
        this.form.fromDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else if (myminutes>=10 && myhour<=9) {
        this.form.fromDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      } else if (myminutes<=9 && myhour>=10 ){
        this.form.fromDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+mymonth+"-"+mydate+"T"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else{
        this.form.fromDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z";
        this.form.toDate= myyear+"-"+mymonth+"-"+mydate+"T"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      }
      }
      console.log(mydate)
      console.log(this.form.fromDate)
      console.log(this.form.toDate)
      
      
      console.log(timestamp1)
      console.log(timestamp)
      console.log(timestamp2)
 console.log(nowtime)
 console.log(oldtime)

    },
  
    updateChart() {
      this.series[0].data = [];
    },
    Display() {
      this.loading = true
       AnalyticsService.getAllAvarageVsIndivisual(this.form1)
        .then((response) => {
          this.loading = false
          console.log(this.fromDate)
console.log(response)
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;

            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData.length; k++) {
              line1.push(serverData[k].averageDistance);
              line2.push(serverData[k].totalDistance);
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
  fleetUsageAllAvarage() {
      AnalyticsService.getAllAvarageVsIndivisual(this.form)
        .then((response) => {
          console.log("payal")
          console.log(this.form.fromDate)
          console.log(this.form.toDate)
console.log(response)
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;

            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData.length; k++) {
              line1.push(serverData[k].averageDistance);
              line2.push(serverData[k].totalDistance);
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
  fleetUsageAllAvarageweekly(){
      AnalyticsService.getAllAvarageVsIndivisual(this.weekly)
        .then((response) => {
          console.log("weekly")
          console.log(this.form2.fromDate)
 console.log(this.form2.toDate)
console.log(response)
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;

            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData.length; k++) {
              line1.push(serverData[k].averageDistance);
              line2.push(serverData[k].totalDistance);
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
  fleetUsageAllAvaragemonthly(){
      AnalyticsService.getAllAvarageVsIndivisual(this.monthly)
        .then((response) => {
          console.log("Monthly")
          console.log(this.form3.fromDate)
 console.log(this.form3.toDate)
console.log(response)
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;

            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData.length; k++) {
              line1.push(serverData[k].averageDistance);
              line2.push(serverData[k].totalDistance);
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
<style>

datetime {
 height: 35px;
 width: 25%;
 margin-top: 10px;
 float: left;
 margin-right: 5px;
}

</style>