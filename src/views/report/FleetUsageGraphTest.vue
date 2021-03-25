<template>
<div class="iconinput inputIconbg">
          <div>
         <form @submit.prevent="Display">
          <div class="form-row">
           
            <div class="col-md-3">
              
             
              <datetime
                input-class="form-control"
                placeholder="From Date"
                type="datetime"
                id="startDateTime"
                v-model="form1.fromDate"
              ></datetime>
             
            </div>
            
            <div class="col-md-3">
             
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
                 
                  
                </select></div>
  <div id="chart">
    <apexchart
      type="line"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
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
      selected:'Weekly',
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
      loading: false,
      series: [
        {
          name: "No Of Active Vehicle",
          type: "column",
          data: [],
          
        },
        {
          name: "Distance Travelled In KMs",
          type: "line",
          data: [],
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
            text: "Date",
          },
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
  created() {
  
  this.getcurrenttimedate()  
this.ActivevsDistanceWeekly();
    this.updateChart();
  },
  methods: {
     updateChart() {
      this.series[0].data = [5, 5, 5, 5, 5, 5, 5];
    },
    onchange(){
    if (this.selected=="Daily"){
      
     this.ActivevsDistance()
     }
    else if(this.selected=="Weekly") {
      this.ActivevsDistanceWeekly()
    }else {
      this.ActivevsDistanceMonthly()
    }
    },
    getcurrenttimedate(){
      let dateTime = new Date();
      let timestamp1=Date.now();
      let timestamp=timestamp1-(7*(1000*60*60*24));
      let timestamp2=timestamp1-(30*(1000*60*60*24));
      this.form2.fromDate=timestamp,
      this.form2.toDate=timestamp1,
      this.form3.fromDate=timestamp2,
      this.form3.toDate=timestamp1
      var old2time=new Date(timestamp2);
       var oldtime=new Date(timestamp);
       var nowtime=new Date(timestamp1);
       this.weekly.fromDate=oldtime,
       this.weekly.toDate=nowtime
       this.monthly.fromDate=old2time,
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
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else if (myminutes>=10 && myhour<=9) {
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      } else if (myminutes<=9 && myhour>=10 ){
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else{
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+"0"+mydate+"T"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      }
      }else if(mydate>=10 && mymonth<=9){
        if(myminutes<=9 && myhour<=9){
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else if (myminutes>=10 && myhour<=9) {
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      } else if (myminutes<=9 && myhour>=10 ){
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else{
        this.form.fromDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+"0"+mymonth+"-"+mydate+"T"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      }
      }else if(mydate<=9 && mymonth>=10){
         if(myminutes<=9 && myhour<=9){
        this.form.fromDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else if (myminutes>=10 && myhour<=9) {
        this.form.fromDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      } else if (myminutes<=9 && myhour>=10 ){
        this.form.fromDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else{
        this.form.fromDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+mymonth+"-"+"0"+mydate+"T"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      }
      }else{
        if(myminutes<=9 && myhour<=9){
        this.form.fromDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else if (myminutes>=10 && myhour<=9) {
        this.form.fromDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      } else if (myminutes<=9 && myhour>=10 ){
        this.form.fromDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+mymonth+"-"+mydate+"T"+myhour+":"+"0"+myminutes+":"+"00"+"."+"000Z"
      }else{
        this.form.fromDate= myyear+"-"+mymonth+"-"+mydate+"T"+"0"+1+":"+"0"+0+":"+"00"+"."+"000Z",
        this.form.toDate= myyear+"-"+mymonth+"-"+mydate+"T"+myhour+":"+myminutes+":"+"00"+"."+"000Z"
      }
      }
      

    },
  
    
    Display() {
      this.loading = true
       AnalyticsService.getActiveVsDistanceTravel(this.form1)
        .then((response) => {
          this.loading = false
          
          console.log(this.fromDate)
console.log(response)
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;
let serverData1=serverData.data;
            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData1.length; k++) {
              line1.push(serverData1[k].activeVehicleCount);
              line2.push(serverData1[k].totalDistance);
              //this.chartOptions.xaxis.categories.push(serverData.matrix[k].vehicleNumber);
              xvalue.push(serverData1[k].dayOfMonth);
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
    ActivevsDistance() {
      
       AnalyticsService.getActiveVsDistanceTravel(this.form)
        .then((response) => {
         console.log("Daily")
         
console.log(response)
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;
let serverData1=serverData.data;
            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData1.length; k++) {
              line1.push(serverData1[k].activeVehicleCount);
              line2.push(serverData1[k].totalDistance);
              //this.chartOptions.xaxis.categories.push(serverData.matrix[k].vehicleNumber);
              xvalue.push(serverData1[k].dayOfMonth);
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
              }, 
            };
           
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
    ActivevsDistanceWeekly() {
      
       AnalyticsService.getActiveVsDistanceTravel(this.weekly)
        .then((response) => {
          console.log("Weekly")
console.log(response)
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;
let serverData1=serverData.data;
            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData1.length; k++) {
              line1.push(serverData1[k].activeVehicleCount);
              line2.push(serverData1[k].totalDistance);
              //this.chartOptions.xaxis.categories.push(serverData.matrix[k].vehicleNumber);
              xvalue.push(serverData1[k].dayOfMonth);
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
            
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
    ActivevsDistanceMonthly() {
      
       AnalyticsService.getActiveVsDistanceTravel(this.monthly)
        .then((response) => {
          console.log("Monthly")
console.log(response)
          if (response.status === 200) {
            let serverData = response.data;
            //this.overspeedVC = serverData;
let serverData1=serverData.data;
            var xvalue = [];
            var line1 = [];
            var line2 = [];
            //this.chartOptions.xaxis.categories = ["V", "V", "V", "V", "V", "V", "V"]
            for (var k = 0; k < serverData1.length; k++) {
              line1.push(serverData1[k].activeVehicleCount);
              line2.push(serverData1[k].totalDistance);
              //this.chartOptions.xaxis.categories.push(serverData.matrix[k].vehicleNumber);
              xvalue.push(serverData1[k].dayOfMonth);
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
            
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
   
    }
};
</script>