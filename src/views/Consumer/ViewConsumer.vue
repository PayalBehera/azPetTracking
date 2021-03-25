<template>
  <CCard>
    <CCardHeader>Consumer List</CCardHeader>
    <CCardBody>
      <CDataTable
        :items="computedItems"
        :fields="fields"
        table-filter
        items-per-page-select
        :items-per-page="5"
        hover
        sorter
        pagination
      >
        <td slot="avatar" class="text-center" slot-scope="{ item }">
          <div class="c-avatar">
            <img :src="item.avatar" class="c-avatar-img" alt />
          </div>
        </td>
        <!-- <template #status="{item}">
        <td>
          <CBadge :color="getBadge(item.status)">
            {{item.status}}
          </CBadge>
        </td>
        </template>-->
        <template #show_details="{ item, index }">
          <td class="py-2">
            <CButton
              color="primary"
              variant="outline"
              square
              size="sm"
              @click="toggleDetails(item, index)"
              >{{ Boolean(item._toggled) ? "Hide" : "Show" }}</CButton
            >
          </td>
        </template>
        <template #details="{ item }">
          <CCollapse
            :show="Boolean(item._toggled)"
            :duration="collapseDuration"
          >
            <CCardBody>
              <!-- <CMedia :aside-image-props="{ height: 102 }"> -->
              <CMedia :aside-image-props="{ height: 102 }">
 master
             
                <CRow style="margin-bottom:5px;">
                 
                  <CCol>
                    
                   <h5 style="color:blue"> {{item.wmDetails[0].deviceName}}</h5>
               
                  </CCol>   
                </CRow>
                <CRow>
                 
                  <CCol>
                    
                   <h6> {{item.wmDetails[0].deviceEUI}}</h6>
               
                  </CCol>   

 
                </CRow>
             
                <CButton
                  size="sm"
                  color="info"
                  class
                  @click="editButtonClick(item)"
                  >Edit</CButton
                >
                <CButton
                  size="sm"
                  color="danger"
                  class="ml-1"
                  @click="deleteButtonClick(item)"
                  >Delete</CButton
                >
              </CMedia>
            </CCardBody>
          </CCollapse>
        </template>
      </CDataTable>
    </CCardBody>
  </CCard>
</template>

<script>
import ConsumerService from "@/service/ConsumerService";

import ConvertDateToLocalDateTime from "@/service/ConvertDateToLocalDateTime";

const fields = [
  {
    key: "avatar",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
  { key: "customerId", label: "Customer Id", _style: "min-width:200px" },
  // { key: "ownerName", label: "Owner Name", _style: "min-width:200px" },
  { key: "customerName", label: "Customer Name", _style: "min-width:200px" },
  { key: "customerPhoneNumber", label: "Contact Number", _classes: "td-style" },

  {
    key: "show_details",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
];

export default {
  name: "AdvancedTables",
  data() {
    return {
      items: [], //.map((item, id) => { return {...item, id}}),
      //items: items.map((item, id) => { return {...item, id}}),
 
      i: [],
 
      fields,
      details: [],
      collapseDuration: 0,
      toasterMessage: "This is from variable",
      vehOwner: undefined,
      //   ambulance: require("@/assets/icons/mediaicon/icons8-ambulance-100.png"),
      //   truck: require("@/assets/icons/mediaicon/icons8-truck-48.png"),
      //   car:require("@/assets/icons/mediaicon/icons8-car-48.png"),
      //   bus:require("@/assets/icons/mediaicon/icons8-bus-64.png"),
    };
  },
  computed: {
    computedItems() {
      return this.items.map((item, id) => {
        return {
          ...item,
          id,
          createdAt: ConvertDateToLocalDateTime.convertLocalDateAndTime(
            item.createdAt
          ), //(new Date(item.createdAt)).toString().slice(0,24), //item.vehicleOwner.ownerName,
          updatedAt: ConvertDateToLocalDateTime.convertLocalDateAndTime(
            item.updatedAt
          ), //(new Date(item.updatedAt)).toString().slice(0,24)
          //registeredDate: item.registered.date
        };
      });
    },
  },
  created() {
    this.getAllConsumer();
    // this.$root.$on("vehicleToast", (task) => {
    //   this.toasterMessage = task;
    //   this.makeToast("success");
    //   this.$root.$off("vehicleToast");
    // });
  },
  methods: {
    // getBadge (status) {
    //   switch (status) {
    //     case 'Active': return 'success'
    //     case 'Inactive': return 'secondary'
    //     case 'Pending': return 'warning'
    //     case 'Banned': return 'danger'
    //     default: 'primary'
    //   }
    // },
    getAllConsumer() {
      ConsumerService.getAll()
        .then((response) => {
          console.log("Coming response" + response.status);
          if (response.status === 200) {
            let serverData = response.data._embedded.customer;
            this.items = serverData;

            console.log(serverData);
            for (var k = 0; k < this.items.length; k++) {
              let serverdata2 = response.data._embedded.customer[k].wmDetails;
              this.i = serverdata2;
              console.log(serverdata2);
            }
          }
        })
        .catch(function error() {
          console.log(error);
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
    // getAllVehicleInfo() {
    //   VehicleService.getAllVehicleInfo()
    //     .then((response) => {
    //       console.log("Coming response" + response.status);
    //       if (response.status === 200) {
    //         let serverData = response.data;
    //         this.items = serverData.data;
    //         // this.toasterMessage = response.message;
    //         // this.makeToast("success");
    //         console.log(this.items);
    //       }
    //     })
    //     .catch(function error() {
    //       console.log(error);
    //     });
    // },
    toggleDetails(item) {
      console.log("Show details");
      // this.getVehicleOwnerDetails(item.vehicleId)
      console.log(item.vehicleId);

      //console.log(this.vehOwner.ownerName);
      //console.log(this.vehOwner.ownerContact);
      //this.$set(this.items[index], "_toggled", !item._toggled);
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
    deleteButtonClick(item){
          console.log(".customer ID:" + item.customerId);
      ConsumerService.delete(item.customerId)
        .then((response) => {
          console.log("Coming response delet:" + response.status);
          console.log(response.data.message);
          if (response.status === 226) {
            this.toasterMessage = response.data.message;
            this.makeToast("danger");
          }
          if (response.status === 200) {
            this.toasterMessage = response.data;
            this.makeToast("success");
            // localStorage.removeItem("vehicleDetails")

            this.$router.push({ path: `/consumer/viewconsumer` });
            this.getAllConsumer();
          }
        })
        .catch((error) => {
          console.log("gettin some error");
          if (error.response.status === 400) {
            this.toasterMessage = "Bad request from applicaiton";
            this.makeToast("warning");
          } else if (error.response.status === 500) {
            this.toasterMessage = "Internal Server Error";
            this.makeToast("danger");
          } else {
            this.toasterMessage = "There is some error please rectify";
            this.makeToast("danger");
          }
          console.log("Control came to block");
          console.log(error.response.data.status);
        });
    }
  },
};
</script>
