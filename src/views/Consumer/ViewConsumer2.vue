<template>
  <CCardBody>
    <CDataTable
      :items="items"
      :fields="fields"
      table-filter
      items-per-page-select
      :items-per-page="5"
      hover
      sorter
      pagination
    >
      <template #status="{item}">
        <td>
          <CBadge :color="getBadge(item.status)">
            {{item.status}}
          </CBadge>
        </td>
      </template>
      <template #show_details="{item, index}">
        <td class="py-2">
          <CButton
            color="primary"
            variant="outline"
            square
            size="sm"
            @click="toggleDetails(item, index)"
          >
            {{Boolean(item._toggled) ? 'Hide' : 'Show'}}
          </CButton>
        </td>
      </template>
      <template #details="{item}">
        <CCollapse :show="Boolean(item._toggled)" :duration="collapseDuration">
          <CCardBody>
            <CMedia :aside-image-props="{ height: 102 }">
              <h4>
                name
              </h4>
              <!-- <p class="text-muted">User since: {{item.registered}}</p> -->
              <CButton size="sm" color="info" class="">
                Edit
              </CButton>
              <CButton size="sm" color="danger" class="ml-1">
                Delete
              </CButton>
            </CMedia>
           
           
          </CCardBody>
        </CCollapse>
      </template>
    </CDataTable>
  </CCardBody>
</template>
<script>
//import RadialProgressBar from 'vue-radial-progress'
import ConsumerService from "@/service/ConsumerService";
//const items = [
//   { Device_No: 'OD25657', Consumer_Name: 'Payal', Email: 'Active@gmail'},
//   { Device_No: 'OD25657', Consumer_Name: 'Sritam', Email: 'A@gmail'},
 
//  { Device_No: 'OD25657', Consumer_Name: 'Rajesh', Email: 'Active@gmail'},
 
//  { Device_No: 'OD25657', Consumer_Name: 'Niranjan', Email: 'Active@gmail'},
 
 
  
//]

const fields = [
  { key: 'customerId', _style:'min-width:200px' },

  { key: 'customerName', _style:'min-width:100px;' },
   { key: 'customerPhoneNumber', _style:'min-width:100px;' },
 
  { 
    key: 'show_details', 
    label: '', 
    _style: 'width:1%', 
    sorter: false, 
    filter: false
  }
]

export default {
  name: 'AdvancedTables',
  // components: {
  //   RadialProgressBar
  // },
  data () {
    return {
      // skills:[{percent:90,color:'#ec407a'}],
      items:[],
      fields,
      details: [],
      collapseDuration: 0,
       pos:[],  
      center: { lat: 20.3490424, lng: 85.8055421 },
       markers: [],
        markers1: [],
      places: [],
      places1: [],
      currentPlace: null,
      currentPlace1: null,
  value:10,
options: {
  text: {
    color: '#FFFFFF',
    shadowEnable: true,
    shadowColor: '#000000',
    fontSize: 14,
    fontFamily: 'Helvetica',
    dynamicPosition: false,
    hideText: false
  },
  progress: {
    color: '#2dbd2d',
    backgroundColor: '#B9B8B8'
  },
  layout: {
    height: 20,
    
    width: 1030,
    verticalTextAlign: 61,
    horizontalTextAlign: 43,
    zeroOffset: 0,
    strokeWidth: 30,
    progressPadding: 0,
    type: 'line'
  }
}
          
    }
    
  },
    computed: {
    computedItems() {
      return this.items.map((item,id) => {
        return {
          ...item,id
          // createdAt: ConvertDateToLocalDateTime.convertLocalDateAndTime(
          //   item.createdAt
          // ), //(new Date(item.createdAt)).toString().slice(0,24), //item.vehicleOwner.ownerName,
          // updatedAt: ConvertDateToLocalDateTime.convertLocalDateAndTime(
          //   item.updatedAt
          // ), 
        };
        
      });
    },
    
  },
  created() {
   this.getAllConsumer();
  },
    mounted() {
   // this.geolocate();
  },
  methods: {
    getBadge (status) {
      switch (status) {
        case 'Active': return 'success'
        case 'Inactive': return 'secondary'
        case 'Pending': return 'warning'
        case 'Banned': return 'danger'
        default: 'primary'
      }
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      // this.scod=new google.maps.LatLng(this.center.lat,this.center)
      this.pos=position
      console.log(this.pos)
      });
      
    },
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.toasterMessage}`, {
        title: "Message",
        autoHideDelay: 5000,
        variant: variant,
        solid: true,
        appendToast: false,
      });
    },
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
    },
        getAllConsumer() {
      ConsumerService.getAll()
        .then((response) => {
          console.log("Coming response" + response.status);
          if (response.status === 200) {
            let serverData = response.data._embedded.customer;
           
            console.log(serverData);
            for(var k=0;k<serverData.length;k++){
              let serverdata2=response.data._embedded.customer[k];
            console.log(serverdata2);
            this.items = serverdata2;
            }
            
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },

  }
}
</script>
<style>
.bar{
  width:100%;
  background: #dfdfdf;
  overflow: hidden;
  padding: 5px;
}
.progress{
float: left;
padding: 15px;

}
.percent{
  float: right;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
}
</style>