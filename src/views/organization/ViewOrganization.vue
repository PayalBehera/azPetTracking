<template>
  <CRow>
    <CCol col="12" sm="12">
      <CCard>
        <CCardHeader> Organization List </CCardHeader>
        <CCardBody>
          <CDataTable
            hover
            :sorter="{ external: false, resetable: true }"
            :items="computedItems"
            :fields="fields"
            table-filter
            items-per-page-select
            :items-per-page="5"
            
            :active-page="activePage"
            
            pagination
            @page-change="pageChange"
          >
            <template #status="data">
              <td>
                {{ data.item.status ? "Active" : "Disabled" }}
                <!-- clickable-rows
                @row-clicked="rowClicked" -->
                <!-- <CBadge :color="getBadge(data.item.status)"> -->
                <!-- {{data.item.status}} -->
                <!-- {{data.item.status ? "Active" : "Disabled"}} -->
                <!-- </CBadge> -->
                <!-- :pagination="{ doubleArrows: false, align: 'center'}" -->
              </td>
            </template>
            <template #show_details="{ item, index }">
              <td class="py-2">
                <CButton
                  color="primary"
                  variant="outline"
                  square
                  size="sm"
                  @click="toggleDetails(item, index)"
                >
                  {{ Boolean(item._toggled) ? "Hide" : "Show" }}
                </CButton>
              </td>
            </template>
            <template #details="{ item }">
              <CCollapse
                :show="Boolean(item._toggled)"
                :duration="collapseDuration"
              >
                <CCardBody>
                  <CMedia :aside-image-props="{ height: 102 }">
                    <CRow>
                      <CCol>
                        <!-- <h6>
                  Vehicle No: {{item.vehicleNumber}}
                </h6> -->

                        <p class="text-muted">
                          Description: {{ item.description }}<br />
                        </p>
                      </CCol>
                      <CCol> </CCol>
                    </CRow>

                    <CButton
                      size="sm"
                      color="info"
                      class=""
                      @click="rowClicked(item)"
                    >
                      Edit
                    </CButton>
                    <CButton
                      size="sm"
                      color="warning"
                      class="ml-1"
                      @click="activeOrDisableOrg(item)"
                    >
                      {{ item.status ? "Disabled" : "Active" }}
                    </CButton>
                  </CMedia>
                </CCardBody>
              </CCollapse>
            </template>
          </CDataTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
// import usersData from './UsersData'
import OrganizationFormService from "../../service/OrganizationFormService";
import ConvertDateToLocalDateTime from "@/service/ConvertDateToLocalDateTime"
export default {
  name: "Users",
  data() {
    return {
      toasterMessage: "This is from variable",
      items: [],
      fields: [
        { key: "orgRefName", label: "Organization-Id", _classes: "td-style" },
        { key: "orgName", label: "Name", _classes: "td-style" },
        //{ key: "description", label: "Description", _classes: "td-style" },
        // { key: 'imaeUrl',label: 'Image Url',_classes: 'td-style' },
        { key: "createdAt", label: "Created At", _classes: "td-style" },
        { key: "updatedAt", label: "Updated At", _classes: "td-style" },
        { key: "status", label: "Status", _classes: "td-style" },
        {
          key: "show_details",
          label: "",
          _style: "width:1%",
          sorter: false,
          filter: false,
        },
      ],
      activePage: 1,
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        if (route.query && route.query.page) {
          this.activePage = Number(route.query.page);
        }
      },
    },
  },
  computed: {
    computedItems() {
      return this.items.map((item,id) => {
        //if (item.vehicleOwner !== null) {
          // console.log("Date and Time:"+item.updatedAt)
          // console.log("Formating Date:"+new Date(item.updatedAt))
        return {
          ...item,id,
          createdAt: ConvertDateToLocalDateTime.convertLocalDateAndTime(item.createdAt),//(new Date(item.createdAt)).toString().slice(0,24), //item.vehicleOwner.ownerName,
          updatedAt: ConvertDateToLocalDateTime.convertLocalDateAndTime(item.updatedAt),//(new Date(item.updatedAt)).toString().slice(0,24)
          //registeredDate: item.registered.date
        };
        //}
      });
    },
  },
  created() {
    this.$root.$on("orgToast", (task) => {
      this.toasterMessage = task;
      this.makeToast("success");
      this.$root.$off("orgToast");
    });
  },
  methods: {
    toggleDetails (item) {
      this.$set(this.items[item.id], '_toggled', !item._toggled)
      this.collapseDuration = 300
      this.$nextTick(() => { this.collapseDuration = 0})
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
    getBadge(status) {
      switch (status) {
        case "Active":
          return "success";
        case "Inactive":
          return "secondary";
        case "Pending":
          return "warning";
        case "Banned":
          return "danger";
        default:
          "primary";
      }
    },
    // rowClicked (item, index) {
    //   this.$router.push({path: `users/${index + 1}`})
    // },

    rowClicked(item) {
      console.log("Org Id read ---> " + item.orgId);
      //this.$router.push({path: `users/${index + 1}`})
      localStorage.setItem("orgDetails", JSON.stringify(item));
      this.$router.push({ path: `editOrganization` });
    },
    activeOrDisableOrg(item) {
      OrganizationFormService.activeOrDisableOrg(item.orgId,item.status)
          .then(response => {
            console.log("Coming response delet:"+ response.status)
            console.log(response.data.message)
           if(response.status === 226){
              this.toasterMessage = response.data.message;
              this.makeToast("danger");
            }
            if(response.status === 200){
              this.toasterMessage = response.data.message;
              this.makeToast("success");
              // localStorage.removeItem("vehicleDetails")
             this.$router.push({path: `/base/viewOrganization`})
             this.getallOrganization();
              
            }
          })
          .catch(error => {
            console.log("gettin some error inside delete")
            if (error.response.status === 400) {
              this.toasterMessage = "Bad request from applicaiton";
              this.makeToast("warning");
            } else if (error.response.status === 500) {
              console.log("internal server")
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

    pageChange(val) {
      this.$router.push({ query: { page: val } });
    },

    getallOrganization() {
      OrganizationFormService.getAll()
        .then((response) => {
          let serverData = response.data;
          this.items = serverData.data;
          console.log(this.items);
        })
        .catch(function error() {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getallOrganization();
  },
};
</script>
