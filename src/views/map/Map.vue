<template>
  <CRow>
    <CCol col="12" sm="9">
      <div>
<div>
          <gmap-map
       id="map"
       ref="mapRef"
      :center="center"
      :zoom="13"
      style="width:100%;  height: 600px;"
      :options="{
              zoomControl: true,
              //mapTypeControl: false,
              scaleControl: true,
              streetViewControl: true,
              //rotateControl: false,
              fullscreenControl: true,
              //disableDefaultUi: false
              //setMapTypeId: VueGoogleMaps.gmapApi.maps.MapTypeId.ROADMAP,
            }"
            @click="mapClick"
    >
    <gmap-info-window
                :options="infoOptions"
              :position="infoWindowPos"
              :opened="infoWinOpen"
              @closeclick="infoWinOpen = false">

                </gmap-info-window>
     <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon=icon
        @dblclick="toggleInfoWindow(m, index)"
        @click="device(m.deviceNumber)"
        @position_changed="position_changed(m)"
       
      ></gmap-marker>
          </gmap-map>
        </div>
      </div>
    </CCol>
    <CCol col="12" sm="3">
      <AllVehicleDetails />
    </CCol>
  </CRow>
</template>

<script>
//Below 3 line is cut from <GmapMarker> tag
//@dblclick="gotoZoomMap(m)"
//@mouseover="toggleInfoWindow(m,index)"
//  @mouseout="mouseOut"
// @click="center=m.position"
//@click="mapClick"//@click="mapClick"
//{url: require('@/assets/icons/markercar20.png')}
//console.log = function() {};


import { gmapApi } from "vue2-google-maps";


import { Datetime } from "vue-datetime";
import ConsumerService from "@/service/ConsumerService";


const AllVehicleDetails = () => import("@/views/map/AllVehicleDetails");

export default {
  components: {
    datetime: Datetime,
    AllVehicleDetails,
  },
  computed: {
    google: gmapApi,

    //   map: new google.maps.Map(document.getElementById("map"), {
    //       zoomControl: true,
    //       zoomControlOptions: {
    //           position: google.maps.ControlPosition.LEFT_CENTER
    //         },
    // })
  },
  name: "GoogleMap",
  data() {
    return {
      // default to Montreal to keep it simple
      // change this to whatever makes sense
      //center: { lat: 45.508, lng: -73.587 },
      //{position: {lat: 20.3490424, lng: 85.8055421},veh: "Marker Click",icon: this.getSiteIcon(1)}
      url: process.env.VUE_APP_SOCKET_URL,

      form: {
        vehicleNumber: "BD786700",
        startDateTime: "",
        endDateTime: "",
      },
      warningModal: false,
      toggle: false,
      history: [],
      path: [],
     bounds: undefined,
      pathValues: [
        { lng: 85.84897242836912, lat: 20.349766665519017 },
        { lng: 85.91128550820311, lat: 20.697582322285417 },
        { lng: 85.58032237343748, lat: 20.797752447801507 },
        { lng: 85.58856211953123, lat: 20.842678990894296 },
        { lng: 85.53363047890623, lat: 21.078643174284014 },
      ],
      markerMove: [],
      center: { lat: 20.3490424, lng: 85.8055421 },
      //This variable taken for push all marker data for SlidingMarker(smooth moving)
      newMarkers: [],
      markers: [],
      //newmarkers : [{position:{lat: 20.3490424,lng: 85.8055421}}],
      vehicleDetails: [],
      places: [],
      currentPlace: null,

      received_messages: [],
      connected: false,
      infoOptions: {
        content: "",
        //optional: offset infowindow so it visually sits nicely on top of our marker
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      initialVehicle: [],

      numDeltas: 100,
      delay: 20, //milliseconds
      i: 0,
      deltaLat: 0,
      deltaLng: 0,

      prevPosn: { lat: 20.3490424, lng: 85.8055421 },

     
      multiVehicle: true,
      currentVehicleData: {
        distanceTravel: "",
        vehicleSpeed: "",
        fuelStatus: "",
        vehicleTopSpeed: "",
      },
      firstTimeEnter: true,
      vehicleTopic: "",
      polyline: null,
      meterReading:0,
      backButtonClickFlag: true,
     // marker: undefined,
     // bounds: undefined,
      icon:require("@/assets/images/dogpet.png")
    };
  },
  // beforeCreate() {
  //   console.log("coming to before created")
  // },

  created() {
    console.log("Map created method");
    this.getAllConsumer();
    this.boundMarker();
    this.device();
  },

  mounted() {
    console.log("Mounted method call");
    //this.getAllInitialVehicle();
    //this.$refs.polyline.$polylineObject.setMap(null)
    this.$refs.mapRef.$mapPromise.then((map) => {
            this.map = map;
            console.log(map);
        });

     

   
    
   
  },

  methods: {
    
    getAllConsumer() {
      ConsumerService.getAll()
        .then((response) => {
          console.log("Coming response" + response.status);
          if (response.status === 200) {
            let serverData = response.data._embedded.customer;
            this.items = serverData;

            console.log(serverData);
            this.markers = [];
            for (var k = 0; k < this.items.length; k++) {
              let serverdata2 = response.data._embedded.customer[k].wmDetails;
              console.log(serverdata2)
            for (var i = 0; i < serverdata2.length; i++) {  
             const marker={
                   lat: response.data._embedded.customer[k].wmDetails[i].lat,
                  lng: response.data._embedded.customer[k].wmDetails[i].lng,
             }
               
               this.center=marker;
               this.markers.push({
                position: marker,
                deviceName: response.data._embedded.customer[k].wmDetails[i].deviceName,
                deviceNumber: response.data._embedded.customer[k].wmDetails[i].deviceEUI,
                CustomerName: response.data._embedded.customer[k].customerName,
                CustomerNumber: response.data._embedded.customer[k].customerAddress,
                
              });
           
            
            }
            }
             this.$refs.mapRef.$mapPromise.then((map) => {
              console.log("ggggggggggg")
              if (this.markers.length !== 0) {
                this.bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < this.markers.length; i++) {
                  this.bounds.extend(this.markers[i].position);
                }

                map.fitBounds(this.bounds);
              }
            });
            
           }
        })
        .catch(function error() {
          console.log(error);
        });

    },
    device(data){
         ConsumerService.device(data)
        .then((response) => {
           if (response.status === 200) {
            let serverData2 = response.data;
           
            console.log(serverData2);
            if (serverData2.deviceEUI==data){
               this.markers.push({meterReading : serverData2.meterReading})
              this.meterReading=serverData2.meterReading*10
            }
            console.log(this.meterReading)
           }
        })
    },

    boundMarker(){
      console.log("boundMarker"+this.markers)
 this.$refs.mapRef.$mapPromise.then((map) => {
              console.log("ggggggggggg")
              if (this.markers.length !== 0) {
                this.bounds = new google.maps.LatLngBounds();
                for (var i = 0; i < this.markers.length; i++) {
                  this.bounds.extend(this.markers[i].position);
                }

                map.fitBounds(this.bounds);
              }
            });
    },
    setPlace(place) {
      this.currentPlace = place;
    },
   
  
    toggleInfoWindow: function (marker, idx) {
      //this.roadApiCall();
      // this.gotoZoomMap(marker);
      //this.stompClient.unsubscribe("/info/values");
      this.device(marker.deviceNumber);
      console.log("marker come to toggle info:" +marker.deviceName);
      this.infoWindowPos = marker.position;
      //this.infoWindowPos = this.$refs.marker[0].position;
       this.infoOptions.content =
          "<p style='font-size:10px;font-family:sans-serif;color:black;margin-bottom: 2px;'><b>" +
          "Device Details: " +
          marker.deviceName +" / "+ marker.deviceNumber +
          "<br>"+ "Meter Reading : " + this.meterReading +
          "</b>" +
          "</p>";
       
     
       

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }

      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    zoom_changed() {
      console.log("Map zoom changed");
    },
    content_changed: function () {
      console.log("Content Change in toolpit");
    },
   
  
  }
  } 

</script>
<style>
icon{
  height: 10px;
  width: 10px;
}
.vl {
  border-left: 6px solid green;
  height: 500px;
}
.pad {
  padding: 5px 5px 5px 5px;
}
.hw {
  width: 46px;
  height: 44px;
}
.labeldj {
  width: 60px;
  display: inline-block;
}
.inputdj {
  padding: 6px;
  font-size: 14px;
  border-radius: 4px;
}
</style>