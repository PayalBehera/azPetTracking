<template>
  <CCard>
    <CCardHeader>Vehicle List</CCardHeader>
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
              <CMedia :aside-image-props="{ }">
                <CImg
                  v-if="item.vehicleType == 'TRUCK'"
                  slot="aside"
                  :src="truck"
                  height="48"
                  width="48"
                />
                <CImg
                  v-if="item.vehicleType == 'CAR'"
                  slot="aside"
                  :src="car"
                  height="48"
                  width="48"
                />
                <CImg
                  v-if="item.vehicleType == 'BUS'"
                  slot="aside"
                  :src="bus"
                  height="48"
                  width="48"
                />
                <CImg
                  v-if="item.vehicleType == 'AMBULANCE'"
                  slot="aside"
                  :src="ambulance"
                  height="48"
                  width="48"
                />
                <CRow>
                  <CCol>
                    <!-- <h6>Vehicle No: {{item.vehicleRegnNumber}}</h6> -->

                    <!-- <p class="text-muted">
                      Owner Name: {{this.vehOwner.ownerName}}
                      <br />
                      Owner Number: {{this.vehOwner.ownerContact}}
                    </p> -->
                  </CCol>
                  <CCol>
                    <!-- <h6 v-if="item.imei !== null">Associated Device IMEI: {{item.imei}}</h6>
                    <h6 v-if="item.imei === null">Associated Device IMEI:</h6>
                    <p class="text-muted" v-if="item.driver !== null">
                      Driver Name: {{item.driver.driverName}}
                      <br />
                      Driver Number: {{item.driver.contactNumber}}
                    </p>
                    <p class="text-muted" v-if="item.driver === null">
                      Driver Name:
                      <br />Driver Number:
                    </p> -->
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
import VehicleService from "@/service/VehicleService";

import ConvertDateToLocalDateTime from "@/service/ConvertDateToLocalDateTime";

const fields = [
  {
    key: "avatar",
    label: "",
    _style: "width:1%",
    sorter: false,
    filter: false,
  },
  { key: "vehicleRegnNumber", label: "Vehicle No", _style: "min-width:200px" },
  // { key: "ownerName", label: "Owner Name", _style: "min-width:200px" },
  { key: "vehicleType", label: "Vehicle Type", _style: "min-width:200px" },
  { key: "createdAt", label: "Created Time", _classes: "td-style" },
  { key: "updatedAt", label: "Updated Time", _classes: "td-style" },
  //{ key: 'imeiNumber', _style:'min-width:100px;' },
  //   { key: 'status', _style:'min-width:100px;' },
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
      fields,
      details: [],
      collapseDuration: 0,
      toasterMessage: "This is from variable",
      vehOwner: undefined,
      ambulance: require("@/assets/icons/mediaicon/icons8-ambulance-100.png"),
      truck: require("@/assets/icons/mediaicon/icons8-truck-48.png"),
      car:require("@/assets/icons/mediaicon/icons8-car-48.png"),
      bus:require("@/assets/icons/mediaicon/icons8-bus-64.png"),
    };
  },
  computed: {
    computedItems() {
      return this.items.map((item,id) => {
        return {
          ...item,id,
          createdAt: ConvertDateToLocalDateTime.convertLocalDateAndTime(
            item.createdAt
          ), //(new Date(item.createdAt)).toString().slice(0,24), //item.vehicleOwner.ownerName,
          updatedAt: ConvertDateToLocalDateTime.convertLocalDateAndTime(
            item.updatedAt
          ), //(new Date(item.updatedAt)).toString().slice(0,24)
          //registeredDate: item.registered.date
        };
        // if (item.vehicleOwner !== null) {
        //   return {
        //     ...item,
        //     ownerName: item.vehicleOwner.ownerName,
        //     //registeredDate: item.registered.date
        //   };
        // } else {
        //   return {
        //     ...item,
        //     ownerName: "-",
        //     //registeredDate: item.registered.date
        //   };
        // }
      });
    },
    // dateFilteredItems() {
    //   return this.computedItems.filter(item => {
    //     return date = item.vehicleRegnNumber
    //     //return date >= this.startDate && date <= this.endDate
    //   })
    // }
  },
  created() {
    this.getAllVehicleInfo();
    this.$root.$on("vehicleToast", (task) => {
      this.toasterMessage = task;
      this.makeToast("success");
      this.$root.$off("vehicleToast");
    });
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
    makeToast(variant = null) {
      this.$bvToast.toast(`${this.toasterMessage}`, {
        title: "Message",
        autoHideDelay: 5000,
        variant: variant,
        solid: true,
        appendToast: false,
      });
    },
    getAllVehicleInfo() {
      VehicleService.getAllVehicleInfo()
        .then((response) => {
          console.log("Coming response" + response.status);
          if (response.status === 200) {
            let serverData = response.data;
            this.items = serverData.data;
            // this.toasterMessage = response.message;
            // this.makeToast("success");
            console.log(this.items);
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },
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
    editButtonClick(editData) {
      //this.$emit("inputData", this.tempMessage);
      localStorage.setItem("vehicleDetails", JSON.stringify(editData));
      this.$router.push({ path: `/base/vehicles/editVehicle` });
    },
    deleteButtonClick(item) {
      console.log("Vehicle ID:" + item.vehicleId);
      VehicleService.deleteVehicle(item.vehicleId)
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

            this.$router.push({ path: `/base/vehicles/viewVehicle` });
            this.getAllVehicleInfo();
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
    },
    getVehicleOwnerDetails(vehicid) {
      VehicleService.getVehicleOwnerDetails(vehicid)
        .then((response) => {
          console.log("Coming response delet:" + response.status);
          console.log(response.data.message);
          if (response.status === 226) {
            this.toasterMessage = response.data.message;
            this.makeToast("danger");
          }
          if (response.status === 200) {
            console.log("Vehicle Owner Details:" + response.data);
            this.vehOwner = response.data;
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
    },
  },
};
</script>
