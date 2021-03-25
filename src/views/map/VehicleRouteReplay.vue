<template>
  <div>
    <CCard>
      <CCardHeader>
        <form @submit.prevent="routeReplay">
          <div class="form-row">
            <!-- <div class="col-md-1"> -->
              <label for="validationTooltip01">From * : </label>
            <!-- </div> -->
            <div class="col-md-2">
              
              <!-- <div class="control" :class="{'form-group--error': form.startDateTime.$error}"> -->
              <!-- <div class="iconinput inputIconbg"> -->
              <datetime
                input-class="form-control"
                placeholder="Enter Date and Time"
                type="datetime"
                id="startDateTime"
                v-model="form.startDateTime"
              ></datetime>
              <!-- <input
              
                    id="startDateTime"
                    class="form-control"
                    type="datetime"
                    placeholder="OD34B4572"
                    v-model="form.startDateTime"
                    
                    
              /> -->
              <!-- <fa-icon class="icon" :icon="['fas','truck']" style="width: 36px; height: 42px" />
              </div>-->
              <!-- </div> -->
              <!-- <div class="error">
                <span>{{ vehicleRegNumberErrors[0] }}</span>
              </div>-->
            </div>
            <!-- <div class="col-md-1"> -->
              <label for="validationTooltip01">To * : </label>
            <!-- </div> -->
            <div class="col-md-2">
              <!-- <label for="validationTooltip01">To *</label> -->
              <!-- <div class="control" :class="{'form-group--error': form.startDateTime.$error}"> -->
              <!-- <div class="iconinput inputIconbg"> -->
              <datetime
                input-class="form-control"
                placeholder="Enter Date and Time"
                type="datetime"
                id="startDateTime"
                v-model="form.endDateTime"
              ></datetime>
              <!-- <fa-icon class="icon" :icon="['fas','truck']" style="width: 36px; height: 42px" />
              </div>-->
              <!-- </div> -->
              <!-- <div class="error">
                <span>{{ vehicleRegNumberErrors[0] }}</span>
              </div>-->
            </div>
            <!-- <div class="col-md-1"> -->
              <label for="validationTooltip01">Vehicle No * : </label>
            <!-- </div> -->
            <div class="col-md-2">
              <!-- <label for="validationTooltip01">Vehicle No *</label> -->
              <select
                class="form-control btn btn-secondary"
                id="vehicleNumber"
                v-model="form.vehicleNumber"
              >
                <option disabled value>Select Vehicle</option>
                <option
                v-bind:key="id"
                  v-for="(vehicle, id) in vehicleList"
                  
                  v-bind:value="vehicle.vehicleRegnNumber"
                >{{vehicle.vehicleRegnNumber}}</option>
              </select>
            </div>

            <div class="col-md-2">
              
              <button class="btn btn-primary btn-submit" type="submit" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                <span>Show History</span>
                </button>
            </div>
          </div>
        </form>
      </CCardHeader>
      <CCardBody>
        <GmapMap
          id="map"
          ref="mapRef"
          :center="center"
          :zoom="10"
          style="width:100%;  height: 600px;"
          :options="{
        zoomControl: true,
        scaleControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        
        
      }"
          @click="mapClick"
        >
          <gmap-info-window
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen=false"
          ></gmap-info-window>
          <GmapMarker
            ref="marker"
            :key="index"
            v-for="(m, index) in markers"
            :position.sync="m.position"
            :clickable="true"
            :title="m.title"
            :icon="m.icon"
            @dblclick="toggleInfoWindow(m,index)"
            @click="toggleInfoWindow(m,index)"
            @position_changed="position_changed(m)"
          />
          <gmap-polyline
            v-bind:path.sync="path"
            v-bind:options="{ 
        geodesic: true,strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 5,
        icons: [{ icon: {path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,scale: 3 ,fillOpacity:1},offset: '100%' ,fixedRotation:false,repeat:'10%'}]
          }"
            v-bind:clickable="true"
            v-on:click="infoWinOpen=true"
            ref="polyline"
          ></gmap-polyline>
        </GmapMap>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import MarkerClusterer from "marker-clusterer-plus";
//import * as VueGoogleMaps from 'vue2-google-maps'
import { gmapApi } from "vue2-google-maps";

import VehicleService from "@/service/VehicleService";

import MapService from "@/service/MapService";
import { Datetime } from "vue-datetime";

export default {
  components: {
    datetime: Datetime,
  },
  computed: {
    google: gmapApi,
  },
  name: "GoogleMap",
  data() {
    return {
      form: {
        vehicleNumber: "",
        startDateTime: "",
        endDateTime: "",
      },
      vehicleList: [],
      warningModal: false,
      toggle: false,
      history: [],
      path: [],

      markerMove: [],
      center: { lat: 20.3490424, lng: 85.8055421 },
      markers: [],

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

      bounds: undefined,
      loading: false,
    };
  },

  created() {
      this.getAllVehicleNumber();
      console.log("created")
  },

  mounted() {
    console.log("Mounted method call");

    this.$refs.mapRef.$mapPromise.then((map) => {
      map.setOptions({
        zoomControlOptions: { position: google.maps.ControlPosition.LEFT_TOP },
        mapTypeControlOptions: {
          style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
          position: google.maps.ControlPosition.TOP_CENTER,
          //mapTypeIds: ["roadmap", "terrain"]
        },
      });
    });
  },

  methods: {
    getAllVehicleNumber() {
       VehicleService.getAllVehicleNumberList().then(response => {
         console.log("Coming response"+ response.status)
         if(response.status === 200){
              
              let serverData = response.data;
              this.vehicleList = serverData.data;
              //this.toasterMessage = response.message;
              //this.makeToast("success");
            }
         
       }).catch(function error(){
         console.log(error);
       });
    },
    routeReplay() {
      this.loading = true
      console.log("Route Replay button click");
      console.log("Vehicle NUMber:"+this.form.vehicleNumber)
      console.log(this.form.startDateTime);
      //console.log("New Date time:"+new Date(this.form.startDateTime).iso())
      console.log(this.form.endDateTime);
      MapService.getAllVehicleCordinates(this.form)
        .then((response) => {
          this.loading = false
          console.log("Coming response" + response.status);
          console.log(response.data.message);
          if (response.status === 200) {
            this.history = response.data.data.locationlist;
            console.log(response.data);
            console.log("No of Point:" + this.history.length);
            this.path = this.history;

            this.$refs.mapRef.$mapPromise.then((map) => {
              this.markers = [];
              /*this.path = [
            { lng: 85.83669863991697, lat: 20.359342745843342 },
            { lng: 85.83412371926268, lat: 20.35572160881274 },
            { lng: 85.83618365578612, lat: 20.351054240279456 },
            { lng: 85.83455287270506, lat: 20.34630625517387 },
            { lng: 85.84897242836912, lat: 20.349766665519017 },
            { lng: 85.836339, lat: 20.363864 },
            { lng: 85.836339, lat: 20.363865 },
            ];*/
              console.log("Path Count:" + this.path.length);
              console.log("This path:" + this.path[0]);
              this.bounds = new google.maps.LatLngBounds();
              for (var i = 0; i < this.path.length; i++) {
                if(i == 0) {
                  this.markers.push({position: this.path[i],title: "Start"})
                } else if(i == this.path.length-1) {
                    this.markers.push({position: this.path[i],title: "End"})
                }
                this.bounds.extend(this.path[i]);
              }

              map.fitBounds(this.bounds);
            });
          }
        })
        .catch((error) => {
          this.loading = false
          console.log("gettin some error");
          console.log("Response : " + error.response.status);
          console.log(error.response.data.message);
          if (error.response.status === 400) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("warning");
          } else if (error.response.status === 409) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("danger");
          } else if (error.response.status === 500) {
            this.toasterMessage = error.response.data.message;
            this.makeToast("warning");
          } else {
            this.toasterMessage = "There is some error please rectify";
            this.makeToast("danger");
          }
          console.log("Control came to block");
          console.log(error.response.data.status);
        });
    },

    mapClick: function (e) {
      console.log(e.latLng.lat());
      console.log(e.latLng.lng());
    },
  },
  /* validations: {
    form: {
      vehicleNumber: {
        required,
      }
    }
  },*/
  /*computed: {
    vehicleRegNumberErrors() {
      const errors = [];
      if (!this.$v.form.vehicleNumber.$dirty) return errors;

      !this.$v.form.vehicleNumber.required &&
        errors.push("Vehicle Registration Number is required.");
      
      

      return errors;
    },
  }*/
};
</script>
<style>
</style>