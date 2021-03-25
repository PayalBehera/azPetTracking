<template>
<div class="iconinput inputIconbg">
          <div>
         <form @submit.prevent="fleetStatusGraph1">
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
                
                 </div>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
  </div>
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
      loading: false,
     
      series: [
        {
          name: "Engine On & Vehicle is moving",
          data: [],
        },
        {
          name: "Engine On & Vehicle is Idle",
          data: [],
        },
        {
          name: "Engine Off & Vehicle is not moving",
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
   // this.fleetStatusGraph1();
   this.fleetStatusGraph1Daily();
this.getcurrenttimedate();
  },
  methods: {
    onchange(){
    if (this.selected=="Daily"){
      
     this.fleetStatusGraph1Daily();
     
     }
    else if(this.selected=="Weekly") {
      this.fleetStatusGraph1weekly();
      
    }else {
      this.fleetStatusGraph1monthly()
      
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
      console.log(mydate)
      console.log(this.form.fromDate)
      console.log(this.form.toDate)
      console.log("pujatime")
      
      console.log(timestamp1)
      console.log(timestamp)
      console.log(timestamp2)
 console.log(nowtime)
 console.log(oldtime)

    },
    fleetStatusGraph1() {
      AnalyticsService.getFleetFuelGraph1(this.form1)
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
    fleetStatusGraph1Daily() {
      AnalyticsService.getFleetFuelGraph1(this.form)
        .then((response) => {
          if (response.status === 200) {
            console.log("payal2")
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


    fleetStatusGraph1weekly() {
      AnalyticsService.getFleetFuelGraph1(this.weekly)
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


    fleetStatusGraph1monthly() {
      AnalyticsService.getFleetFuelGraph1(this.monthly)
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