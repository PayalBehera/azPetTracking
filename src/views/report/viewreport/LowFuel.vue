<template>
  <CCard>
    <CCardHeader> Low Fuel </CCardHeader>
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
      </CDataTable>
    </CCardBody>
  </CCard>
</template>
<script>
import AnalyticsService from "@/service/AnalyticsService";

const fields = [
  { key: "vehicleNumber", label: "Vehicle No", _style: "min-width:200px" },
  { key: "driverName", label: "Driver Name", _style: "min-width:200px" },
  { key: "fuel", label: "Fuel", _style: "min-width:200px" },
];

export default {
  name: "AdvancedTables",
  data() {
    return {
      items: [],
      fields,
      details: [],
      collapseDuration: 0,
    };
  },
  created() {
    this.lowfuel();
  },
  methods: {
    lowfuel() {
      AnalyticsService.getAllLowfuelVehicle()
        .then((response) => {
          console.log("Coming response" + response.status);
          if (response.status === 200) {
            let serverData = response.data;
            this.items = serverData.vehicleDetails;
            // this.toasterMessage = response.data.message;
            // this.makeToast("success");

            console.log(this.items);
          }
        })
        .catch(function error() {
          console.log(error);
        });
    },

    toggleDetails(item) {
      this.$set(this.items[item.id], "_toggled", !item._toggled);
      this.collapseDuration = 300;
      this.$nextTick(() => {
        this.collapseDuration = 0;
      });
    },
  },
};
</script>