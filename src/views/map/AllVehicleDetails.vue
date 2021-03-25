<template>
  <div>
    <!-- <div class="card btndhf">
      <CButtonGroup class="row">
        <CButton color="success" class="col-md-3 cls1" @click="allVehicle">All</CButton>
        <CButton color="primary" class="col-md-3 cls2" @click="idleVehicle">Idle</CButton>
        <CButton color="warning" class="col-md-3 text-light cls3" @click="alertVehicle">Alert</CButton>
        <CButton color="dark" class="col-md-3 cls1" @click="blindVehicle">Blind</CButton>
         <CButton color="danger">Out of Range</CButton> 
      </CButtonGroup>
    </div> -->
    <div class="search">
      <input type="search" v-model="search" class="searchTerm" placeholder="Enter Device Number" />
      <button class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </div>
    <div class="scroller" style="margin:10px;">
      <div
        class="card cardhf pointer bg-light"
        style="background-color:rgba(255, 0, 0, 0.2);"
      >
        <div class="card-body cardb" style="background-color:rgba(255, 0, 0, 0.4);">
          <CRow>
            <i class="fa fa-paw" aria-hidden="true" style="width: 15px; height: 18px; color:white;margin-right:3px;" > </i>
            <div class="font-xs text-black">Pet Name :Tom </div>
          </CRow>
          
          <CRow>
            <fa-icon
              class="iconi"
              :icon="['fas','tachometer-alt']"
              style="width: 18px; height: 21px;color:white;"
            />
            <div class="font-xs">Device :35555563322 </div>
           
          </CRow>
          <CRow>
            <fa-icon class="iconi" :icon="['fas','user']" style="width: 18px; height: 21px;color:white;" />
            <div class="font-xs">Owner :Amiya /8743574764 </div>
          </CRow>
        </div>
      </div>
       <div
        class="card cardhf pointer bg-light"
        style="background-color:rgba(255, 0, 0, 0.2);"
      >
        <div class="card-body cardb" style="background-color:rgba(255, 0, 0, 0.2);">
          <CRow>
            <i class="fa fa-paw" aria-hidden="true" style="width: 15px; height: 18px; color:white; margin-right:3px;" > </i>
            <div class="font-xs text-black">Pet Name :Tom </div>
          </CRow>
          
          <CRow>
            <fa-icon
              class="iconi"
              :icon="['fas','tachometer-alt']"
              style="width: 18px; height: 21px;color:white;"
            />
            <div class="font-xs">Device :35555563322 </div>
           
          </CRow>
          <CRow>
            <fa-icon class="iconi" :icon="['fas','user']" style="width: 18px; height: 21px;color:white;" />
            <div class="font-xs">Owner :Amiya /8743574764 </div>
          </CRow>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import Stomp from "webstomp-client";

import MapService from "@/service/MapService";

import AccountService from "@/service/AccountService";

import ConvertDateToLocalDateTime from "@/service/ConvertDateToLocalDateTime"

export default {
  data() {
    return {
      connected: false,
      vehicleDetails: [],
      filterVehicle: [],
      search: "",
      url: process.env.VUE_APP_SOCKET_URL
    };
  },
  computed: {
    filterList: function () {
      if(this.search){
      return this.filterVehicle.filter((vehicle) => {
        return vehicle.veh.match(this.search.toUpperCase());
      });
      }else {
        return this.filterVehicle
      }
    },
  },
  created() {
     console.log("Allvehicle created method")
     this.getAccountsDetails();
     this.$root.$on("orgId",task=>{
       console.log("Coming to allvehicle details inside AllVehicleDetails")
    this.getAllInitialVehicle();
    this.$root.$off("orgId")
     })
    this.allVehicle()
    console.log("Component has been created!");

    console.log("Starting connection to websocket..");
    //this.socket = new SockJS("https://test.asiczen.com/vueendpoint");
    this.socket = new SockJS(this.url);
    //this.socket = new SockJS("https://qascorpious.asiczen.com/vueendpoint");
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect(
      {},
      (frame) => {
        console.log("connec");
        this.connected = true;
        //console.log(frame);
        //this.soceketConnection =
        // this.stompClient.subscribe("/info/values", tick => {
          var orgTopic = "/topic/"+localStorage.getItem("orgId")
        this.stompClient.subscribe(orgTopic, (tick) => {
          // console.log("Subscribe")
          //console.log(tick);
          //this.received_messages.push(JSON.parse(tick.body).content);
          console.log("Data Coming");
          console.log(JSON.parse(tick.body));

          var markerss = JSON.parse(tick.body);
          console.log(markerss)
          var setIcon = 1;

          const marker = {
            lat: markerss.lat,
            lng: markerss.lng,
          };

          //this.markers.push({ position: marker ,veh: markerss.vehicleNumber, icon: this.getSiteIcon(setIcon), timeStamp: markerss.dateTimestamp, driverName: markerss.driverName, driverContact: markerss.driverContact, deviceImei: markerss.imeiNumber});
          // this.places.push(this.currentPlace);
          if (this.vehicleDetails.length >= 1) {
            this.vehicleDetails.forEach((element) => {
              //console.log("Loop Calling")

              //console.log(markerss.vehicleNumber)
              if (element.veh == markerss.vehicleNumber) {
                this.vehicleDetails.splice(
                  this.vehicleDetails.indexOf(element),
                  1
                );
              }
            });
          }
          this.vehicleDetails.push({
            position: marker,
            veh: markerss.vehicleNumber,
            timeStamp: ConvertDateToLocalDateTime.convertLocalDateAndTime(markerss.dateTimestamp),//markerss.dateTimestamp,
            driverName: markerss.driverName,
            driverContact: markerss.driverContact,
            deviceImei: markerss.imeiNumber,
            //vehicleSpeed: markerss.speed,
            vehicleSpeed: markerss.calculatedSpeed,
            fuelStatus: markerss.fuel,
            //distanceTravel: markerss.totalDistanceDaily,
            distanceTravel: markerss.calculatedDailyDistance,
            vehicleTopSpeed: markerss.topSpeed,
            //runingStatus: markerss.current
            runingStatus: markerss.currentFlag,
            vehicleMoving: markerss.vehicleMovingFlag,
            idleEngineOn: markerss.idleEngineOn,
            idleEngineOff: markerss.idleEngineOff,
            alertFlag: markerss.alertFlag,
          });
          console.log("...."+this.vehicleDetails);
        },
          { id: "orgAsiczen" }
        );
      },
      (error) => {
        console.log(error);
        this.connected = false;
      }
    );
  },
  methods: {
    getAllInitialVehicle() {
      //DeviceService.getAll()
      console.log("getAllInitialVehicle method call");

      MapService.getAllVehicleLastlocation()
        .then((response) => {
          console.log("All Vehicle status:" + response.status);
          console.log(
            "Coming response from allvehicle " + response.data.message
          );
          if (response.status === 200) {
            this.initialVehicle = response.data.data;
            console.log("Vehicle length:"+this.initialVehicle.length)
            console.log("Vehicle :"+this.initialVehicle[0])

            for (var k = 0; k < this.initialVehicle.length; k++) {
              this.vehicleDetails.push({
                position: {
                  lat: this.initialVehicle[k].lat,
                  lng: this.initialVehicle[k].lng,
                },
                veh: this.initialVehicle[k].vehicleNumber,
                //icon: this.getSiteIcon(setIcon),

                timeStamp: ConvertDateToLocalDateTime.convertLocalDateAndTime(this.initialVehicle[k].lastTime),//this.initialVehicle[k].lastTime,
                driverName: this.initialVehicle[k].driverName,
                driverContact: this.initialVehicle[k].driverContact,
                deviceImei: this.initialVehicle[k].imeiNumber,
                vehicleSpeed: this.initialVehicle[k].speed,
                fuelStatus: this.initialVehicle[k].fuel,
                distanceTravel: this.initialVehicle[k].totalDistanceDaily,
                vehicleTopSpeed: this.initialVehicle[k].topSpeed,
                runingStatus: this.initialVehicle[k].current,
                vehicleMoving: this.initialVehicle[k].vehicleMovingFlag,
                idleEngineOn: this.initialVehicle[k].idleEngineOn,
                idleEngineOff: this.initialVehicle[k].idleEngineOff,
                alertFlag: this.initialVehicle[k].alertFlag
              });
            }

            console.log("Initial Vehicle:" + this.initialVehicle[0].veh);
          }
        })
        .catch(function error() {
          console.log("Come to catch block");
          console.log(error);
        });
    },
    emitMethod(veh) {
      console.log("Emited method call from card :" + veh.veh);
      this.$root.$emit("single", veh);
    },
    allVehicle() {
      this.filterVehicle = this.vehicleDetails
      console.log("All Vehicle method call")
    },
    //Those vehicles are not moving
    idleVehicle() {
      this.filterVehicle = this.vehicleDetails.filter(function (e) {
            //return !e.runingStatus;
            return !e.vehicleMoving&&e.runingStatus;
        });
      console.log("Idle Vehicle method call")
    },
    //Those Vehicle have alted 
    alertVehicle() {
      console.log("Alert Vehicle method call")
      //return this.vehicleDetails = []
      this.filterVehicle = this.vehicleDetails.filter(function (e) {
            return e.alertFlag;
        });
        console.log("vehicle count:"+this.filterVehicle);
     },
     //Those Vehicles have not send data more than 10 minutes
     blindVehicle() {
      console.log("Blind Vehicle method call")
      //return this.vehicleDetails = []
      this.filterVehicle = this.vehicleDetails.filter(function (e) {
            return !e.runingStatus;
        });
        
     },
     searchVehicel: function() {
       console.log("Search call")
       console.log(this.search)
       console.log(this.filterVehicle.length)
      //  this.filterVehicle = this.filterVehicle.filter(function (e) {
      //    console.log(e.veh)
      //       return e.veh.includes(this.search);
      //   });
      return this.filterVehicle.filter((vehicle) => {
        console.log(vehicle.veh)
        return vehicle.veh.match(this.search);
      });

     },
     getAccountsDetails() {
       AccountService.getCurrentUserInfo()
       .then(response => {
         console.log("Coming response inside accountsdetails"+ response.status)
         if(response.status === 200){
              
              let serverData = response;
             // this.items = serverData.data;
              localStorage.setItem("orgId", serverData.data.orgRefName);
              console.log("Org Name:"+ serverData.data.orgRefName)
              this.$root.$emit("orgId", serverData.data.orgRefName);
              
             
            }
         
       }).catch(function error(){
         console.log("Error on current:"+error);
       });
    }
  },
  beforeDestroy() {
   // if(this.connected) {

      this.stompClient.unsubscribe("orgAsiczen");
      console.log("aaaaa")
      this.stompClient.disconnect();

   // }
    console.log("Before destroyed inside all vehiceldetails")
    console.log("Connected Value :"+this.connected)
  }
};
</script>
<style>
.scroller {
  height: 430px;
  overflow-y: scroll;
  scrollbar-color: green;
  scrollbar-width: thin;
}
.iconi {
  padding-left: 2px;
  padding-right: 5px;
}
.cardb {
  padding-top: 5px;
  padding-bottom: 5px;
}
.cardhf {
  margin-top: 5px;
  margin-bottom: 5px;
}
.btndhf {
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 5px;
}
.pointer {
  cursor: pointer;
}
.pointer:hover {
  background-color: rgb(199, 19, 19);
}
.search {
  width: 100%;
  position: relative;
  display: flex;
}

.searchTerm {
  width: 100%;
  border: 1px solid rgb(4, 143, 153);
  border-right: none;
  padding: 7px;
  height: 36px;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: rgb(21, 24, 23);
  font-size: 13px;
}

.searchTerm:focus {
  color: rgb(4, 143, 153);
}

.searchButton {
  width: 40px;
  height: 36px;
  border: 1px solid rgb(4, 143, 153);
  background: rgb(4, 143, 153);
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  font-size: 13px;
}

  .cls1:focus{
      color:rgb(61, 61, 61);
      /* background-color: rgb(9, 24, 230); */
    }
    .cls2:focus{
      color:rgb(61, 61, 61);
      /* background-color: rgb(13, 206, 71); */
    }
    .cls3:focus{
      color:rgb(61, 61, 61);
      /* background-color: rgb(230, 228, 157); */
    }
</style>