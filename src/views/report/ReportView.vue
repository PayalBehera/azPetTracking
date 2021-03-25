<template>
  <!-- <div>
    <CRow>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon header="Employees" :text="employeeCount" color="primary" :icon-padding="false">
          <CIcon name="cil-people" width="24" />
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon
          header="Departments"
          :text="departmentCount"
          color="primary"
          :icon-padding="false"
        >
          <CIcon name="cilGrid" width="24" />
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon header="Average Salary" text="120 K" color="primary" :icon-padding="false">
          <CIcon name="cilEuro" width="24" />
        </CWidgetIcon>
      </CCol>
      <CCol col="12" sm="6" lg="3">
        <CWidgetIcon header="Avg Hour" text="No Data Yet" color="primary" :icon-padding="false">
          <CIcon name="cil-bell" width="24" />
        </CWidgetIcon>
      </CCol>
    </CRow>
    <CRow>
      <CCol sm="6">
        <CCard>
          <CCardBody>
            <CChartLineExample />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="6">
        <CCard>
          <CCardBody>
            <CChartLineExample />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="6">
        <CCard>
          <CCardBody>
            <CChartDoughnutExample />
          </CCardBody>
        </CCard>
      </CCol>

      <CCol sm="6">
        <CCard>
          <CCardBody>
            <CChartDoughnutExample />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div> -->

  <div>
    <CCard class="bg-light">
      <CCardHeader>
        <CRow>
          <CCol col="12" sm="6" lg="6">
            <CCard class="bg-white border">
              <!-- <FleetStatus /> -->
              <FleetStatusBar />
            </CCard>
          </CCol>
          <CCol col="12" sm="6" lg="6">
            <CCard class="bg-white border">
              <!-- <FleetUsage /> -->
              <FleetUsageColumnChart/>
            </CCard>
          </CCol>
          <!-- <CCol col="12" sm="6" lg="4">
            
            <CCard class="bg-white chartheight2 rowmagin2">
              <FleetIdle />
            </CCard>
           
            <CCard class="bg-white chartheight2 rowmagin">
              <FleetFuel />
            </CCard>
            
          </CCol> -->
        </CRow>
        <!-- <CRow> -->
          <ReportAllVehicles />
        <CRow>
          <CCol col="12" sm="6" lg="6">
            <CCard class="bg-white border">
              <ActiveIdelInactiveGraphTest />
              <!-- <ActiveIdleInactiveGraph /> -->
            </CCard>
          </CCol>
          <CCol col="12" sm="6" lg="6">
            <CCard class="bg-white border">
              <FleetUsageGraphTest/>
              <!-- <FleetUsageGraph /> -->
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <CCol col="12" sm="6" lg="6">
            <CCard class="bg-white border">
              <!-- <AllAvarageVsIndivisualDistance /> -->
              <AllAvarageVsIndivisualDistanceTest />
            </CCard>
          </CCol>
          <CCol col="12" sm="6" lg="6">
            <CCard class="bg-white border">
              <VehiclesVsVehiclesIdleHour />
            </CCard>
          </CCol>
        </CRow>
        <CRow>
          <!-- <CCol col="12" sm="4" lg="4">
            <CCard class="bg-white border">
              <AllAvarageVsIndivisualBar />
            </CCard>
          </CCol> -->
          <CCol col="12" sm="6" lg="6">
            <CCard class="bg-white border">
              <!-- <FleetFuelGraph1 /> -->
              <FleetFuelGraph1Test/>
            </CCard>
          </CCol>
          <!-- <CCol col="12" sm="6" lg="6">
            <CCard class="bg-white border">
              <FleetFuelGraph />
            </CCard>
          </CCol> -->
        </CRow>

        <!-- </CRow> -->
      </CCardHeader>
      <!-- <CCardBody>
        <WidgetsDropdown />
      </CCardBody> -->
    </CCard>

    <!-- <CCard>
    <CRow>
      <CCol>
        <CChartBarExample />
      </CCol>
      <CCol>
        <CChartBarExample1 />
      </CCol>
    </CRow>
    </CCard> -->
  </div>
</template>

<script>
//import { CChartBarExample } from "../charts/index.js";
//import { CChartBarExample1 } from "../charts/index.js";
//import WidgetsDropdown from "../widgets/WidgetsDropdown";
const FleetStatusBar = () => import("@/views/report/FleetStatusBar");
//const FleetStatus = () => import("@/views/report/FleetStatus");
const FleetUsage = () => import("@/views/report/FleetUsage");
const FleetIdle = () => import("@/views/report/FleetIdle");
const FleetFuel = () => import("@/views/report/FleetFuel");
const ReportAllVehicles = () => import("@/views/report/ReportAllVehicles");
// const ActiveIdleInactiveGraph = () =>
//   import("@/views/report/ActiveIdleInactiveGraph");
const ActiveIdelInactiveGraphTest = () =>
  import("@/views/report/ActiveIdelInactiveGraphTest");
  const FleetUsageGraphTest = () => import("@/views/report/FleetUsageGraphTest");
//const FleetUsageGraph = () => import("@/views/report/FleetUsageGraph");
// const AllAvarageVsIndivisualDistance = () =>
//   import("@/views/report/AllAvarageVsIndivisualDistance");
const AllAvarageVsIndivisualDistanceTest = () =>
  import("@/views/report/AllAvarageVsIndivisualDistanceTest");
//const FleetFuelGraph = () => import("@/views/report/FleetFuelGraph");
//const FleetFuelGraphTest = () => import("@/views/report/FleetFuelGraphTest");
const AllAvarageVsIndivisualBar = () => import("@/views/report/AllAvarageVsIndivisualBar");
const VehiclesVsVehiclesIdleHour = () => import("@/views/report/VehiclesVsVehiclesIdleHour");
//const FleetFuelGraph1 = () => import("@/views/report/FleetFuelGraph1");
const FleetFuelGraph1Test = () => import("@/views/report/FleetFuelGraph1Test");
const FleetUsageColumnChart = () => import("@/views/report/FleetUsageColumnChart");

export default {
  name: "Dashboard",
  components: {
    //CChartBarExample,
    // CChartBarExample1,
    //WidgetsDropdown,

   // FleetStatus,
    FleetUsage,
    FleetIdle,
    ReportAllVehicles,
    FleetFuel,
    //ActiveIdleInactiveGraph,
    ActiveIdelInactiveGraphTest,
    FleetUsageGraphTest,
    //FleetUsageGraph,
    //AllAvarageVsIndivisualDistance,
    AllAvarageVsIndivisualDistanceTest,
    //FleetFuelGraph,
   // FleetFuelGraphTest,
    FleetStatusBar,
    AllAvarageVsIndivisualBar,
    VehiclesVsVehiclesIdleHour,
    //FleetFuelGraph1,
    FleetFuelGraph1Test,
    FleetUsageColumnChart
  },
  data() {
    return {
      selected: "Month",
      tableItems: [
        {
          avatar: { url: "img/avatars/1.jpg", status: "success" },
          user: {
            name: "Yiorgos Avraamu",
            new: true,
            registered: "Jan 1, 2015",
          },
          country: { name: "USA", flag: "cif-us" },
          usage: { value: 50, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Mastercard", icon: "cib-cc-mastercard" },
          activity: "10 sec ago",
        },
        {
          avatar: { url: "img/avatars/2.jpg", status: "danger" },
          user: {
            name: "Avram Tarasios",
            new: false,
            registered: "Jan 1, 2015",
          },
          country: { name: "Brazil", flag: "cif-br" },
          usage: { value: 22, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Visa", icon: "cib-cc-visa" },
          activity: "5 minutes ago",
        },
        {
          avatar: { url: "img/avatars/3.jpg", status: "warning" },
          user: { name: "Quintin Ed", new: true, registered: "Jan 1, 2015" },
          country: { name: "India", flag: "cif-in" },
          usage: { value: 74, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Stripe", icon: "cib-stripe" },
          activity: "1 hour ago",
        },
        {
          avatar: { url: "img/avatars/4.jpg", status: "" },
          user: { name: "En�as Kwadwo", new: true, registered: "Jan 1, 2015" },
          country: { name: "France", flag: "cif-fr" },
          usage: { value: 98, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "PayPal", icon: "cib-paypal" },
          activity: "Last month",
        },
        {
          avatar: { url: "img/avatars/5.jpg", status: "success" },
          user: {
            name: "Agapetus Tade�",
            new: true,
            registered: "Jan 1, 2015",
          },
          country: { name: "Spain", flag: "cif-es" },
          usage: { value: 22, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Google Wallet", icon: "cib-google-pay" },
          activity: "Last week",
        },
        {
          avatar: { url: "img/avatars/6.jpg", status: "danger" },
          user: {
            name: "Friderik D�vid",
            new: true,
            registered: "Jan 1, 2015",
          },
          country: { name: "Poland", flag: "cif-pl" },
          usage: { value: 43, period: "Jun 11, 2015 - Jul 10, 2015" },
          payment: { name: "Amex", icon: "cib-cc-amex" },
          activity: "Last week",
        },
      ],
      tableFields: [
        { key: "avatar", label: "", _classes: "text-center" },
        { key: "user" },
        { key: "country", _classes: "text-center" },
        { key: "usage" },
        { key: "payment", label: "Payment method", _classes: "text-center" },
        { key: "activity" },
      ],
    };
  },
  methods: {
    color(value) {
      let $color;
      if (value <= 25) {
        $color = "info";
      } else if (value > 25 && value <= 50) {
        $color = "success";
      } else if (value > 50 && value <= 75) {
        $color = "warning";
      } else if (value > 75 && value <= 100) {
        $color = "danger";
      }
      return $color;
    },
  },
};
</script>
<style scoped>
.chartheight {
  height: 324px;
}
.chartheight2 {
  height: 162px;
}
.rowmagin {
  /* margin-top: 2px; */
  padding-top: 2px;
}
.rowmagin2 {
  margin-bottom: 2px;
}
.cardpad {
  padding: 5px;
}
.border {
  padding: 15px;
}
</style>